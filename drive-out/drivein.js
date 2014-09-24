var folder   = {}, // exposed pseudo drive api
    file     = {}, // 
    utils    = {},
    out      = {
      folder: {},
      file:  {},
      yahoo: {} // yesss... reading google with yahoo yql. 
    }, // the zero auth pseudo-google-drive api. It contai
    
    fs       = require('fs'), 
    colors   = require('cli-color'),
    google   = require('googleapis'),

    Promise  = require('promise'),
    request  = require('request'),
    reqSync  = require('request-sync'),

    settings = require('./settings.js'),
    secrets  = '', //destination in tokens

    drive;





/*
  @return the uglified version of text
*/
utils.slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/[\s_]+/g, '-')           // Replace spaces and underscore with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};




/*
  fs write a file in sync
*/
utils.write = function(filepath, contents) {
  console.log(colors.white('writing file'), colors.inverse(filepath));    
  var fd = fs.openSync(filepath, 'w');
  fs.writeSync(fd, contents);
  fs.closeSync(fd);
};




/*
  Download the url specified to filepath. Use only with downloadUrl fields.
  @param driver - magic iterator, a function or undefined
  @return Promise
*/
file.downloadAsync = function(downloadUrl, filepath) {
  console.log('downloading to', filepath);
  var ws = fs.createWriteStream(filepath);
  ws.on('error', function(err) { console.log(err); throw 'aaaaa'});
  
    request({
      url: downloadUrl,
      headers: {
        'Authorization' : 'Bearer ' + secrets.access_token
      }
    }).pipe(ws) // save image
  
  console.log('sent', filepath);
};



file.get = function(options){
  if(!options || !options.fileId)
    throw 'please specify a fileId field ...';
  var res = reqSync({
      url: 'https://www.googleapis.com/drive/v2/files/'+options.fileId,
      headers: {
        'Authorization' : 'Bearer ' + secrets.access_token
      }
    });
  return JSON.parse(res.body);
};



file.download = function(downloadUrl, filepath, options) {
  var options = options || {},
      res = reqSync({
        url: downloadUrl,
        headers: {
          'Authorization' : 'Bearer ' + secrets.access_token
        },
        encoding: options.encoding || null
      });
  console.log('downloading ... ', res.statusCode, filepath, res);
  res.statusCode == 200 && utils.write(filepath, res.body);
  
  return res.statusCode;
};






/*
This silly function return the callback(object) of the object having the key=value.
This is a specific function for scraping the query results retrieved by YQL
*/
out.yahoo.findAs = function(obj, key, value, callback) { // return the very first object, search is a couple key value
  for(var i in obj.div){
    if(typeof value === 'function' && obj.div[i][key])// looking only for the key args 
      return callback(obj.div[i]);

    if(i == key && obj.div[i] == value)
      return callback(obj.div);

    if(obj.div[i][key] && obj.div[i][key] == value){
      return callback(obj.div[i]);
    }

    if(typeof obj.div[i] === 'object'){
      var loop = out.yahoo.findAs(obj.div[i], key, value, callback);
      if(loop !== undefined)
        return loop;
    }
  }
  return undefined; // i.e. not found
};



/*
  warning: EXPERIMENTAL
  This is a specific function to obtain a structured json object from the json query results retrieved by YQL
  xpath query. 
*/
out.yahoo.struct = function(item) {
  var title = out.yahoo.findAs(item, 'class', 'flip-entry-title', function(d){
        return {
          text: d.p.replace(/\([^\)]*\)/g, '').split(/^\d+\s/).pop(), // vcleaned text
          original: d.p // original text
        };
      }),

      type = out.yahoo.findAs(item, 'class', 'flip-entry-thumb', function(d){
        return d.img.alt; // et oui monsieur
      }) || 'folder',

      id = item.id.substring(6), // usually google public pages shows id like 'entry-0ByZTyEnzm9qqTFlOazlfa3BSSEE'

      result = { 
        title: title.text,
        slug: utils.slugify(title.original),
        sort: title.original,
        id: id,
        type: type
      }; // uh?
  
  if(result.type === 'folder') {
    return result;
  };
  
  result.src = out.yahoo.findAs(item, 'class', 'flip-entry-thumb', function(d){
    return d.img.src.split(/=s\d+$/).shift();
  });
  
  return result;
};


out.file.getHtml = function(fileId, format) {
  var f = format || 'html'; // format can either be html or txt
  console.log('         ',colors.cyan('get html'), 'of', fileId);
  var response = reqSync({
    url:'https://docs.google.com/feeds/download/documents/export/Export?id='+fileId+'&exportFormat=' + f,
    method: 'GET'
  });
  return response.body;
};

/*
  Probably nessuno in pieno possesso delle sue facolta dovrebbe leggere questa funzione.
  Sync function.
*/
out.folder.list = function(folderId, iterator) {
  console.log("      ",colors.cyan("folder.list sync"), 'of', folderId);
  
  var contents = [],
      response = reqSync({
        url: settings.urls.yql,
        qs: {
          q: 'select * from html where url="' + settings.urls.folderview + folderId + '" and xpath=\'//div[@class="flip-entry"]\'',
          format:'json',
          diagnostics: true
        },
        method: 'GET' 
      });

  console.log("      ", '... statusCode', colors.green(response.statusCode));
  //console.log(response.body);

  try{
    var body = JSON.parse(response.body);
  } catch (e) {
    console.error("Parsing error:", e);
  }
  
  if(!body.query) {
    console.log("Unexpected body content");
  };

  if(!body.query.results){
    throw "Unexpected results content";
  };
  
  if(body.query.results.div.length) {
    for(var i in body.query.results.div) {
      contents.push(out.yahoo.struct(body.query.results.div[i]));
    };
  } else { // just one item under folder
    contents.push(out.yahoo.struct(body.query.results.div));
  }
  console.log('      ',contents.length, colors.white("files/folders found"));
  
  if(iterator)
    contents = contents.map(iterator);
  return contents;
};



/*
  Nice handler for drive.files.list, e.g transforms stuffs.
  check handlers for more info. If success, you will find a nice results array of google drive simplified items
  @param folderId - the google folderId
  @param driver - magic iterator, a function or undefined
  @return Promise
*/
folder.list = function(folderId, driver) {
  var results = [];
  return new Promise(function (resolve, reject) {
    drive.files.list({
      q: '"'+folderId + '" in parents' // 'parents in' + folderId: id
    }, function(err, res) {
      if(err)
        return reject(err);
      
      console.log('items ', res.items.length);
      for(var i in res.items) {
        console.log('\n',colors.greenBright(res.items[i].mimeType), res.items[i].title);
        var r = {};

        if(typeof driver == 'function') {
          r = driver(res.items[i]); // with a promise maybe ...? @todo
        } else {
          r = {
            title: res.items[i].title,
            id: res.items[i].id,
            mimeType: res.items[i].mimeType
          };
        };

        results.push(r);
      };
      return resolve(results);
      // write somewhere
    });

  });
};


folder.listAsync = function(options){
  if(!options || !options.fileId)
    throw 'folder.listAsync interrupted: please specify a "fileId" field ...';
  var res = reqSync({
      url: 'https://www.googleapis.com/drive/v2/files',
      qs:{
        q:  '"'+options.fileId + '" in parents'
      },
      headers: {
        'Authorization' : 'Bearer ' + secrets.access_token
      }
    });
  console.log('folder.listAsync', options.fileId, '-->',res.statusCode);
  if(res.statusCode!= 200)
    console.log(res.body)
  return JSON.parse(res.body);
};



exports.utils = utils;
exports.folder = folder;
exports.file = file;
exports.out = out;


/*
  The init function. 
*/
exports.tooManySecrets = function() {
  return new Promise(function (resolve, reject) {
    var oauth2Client = new google.auth.OAuth2(settings.CLIENT_ID, settings.CLIENT_SECRET, settings.REDIRECT_URL);

    var flush = function() {
      secrets = require('./secrets.json');
      oauth2Client.setCredentials(secrets);
      drive = google.drive({ version: 'v2', auth: oauth2Client });
      exports.drive = drive; // the original drive api;
        // test dummy drive if everything works
        // check for expiry
      return resolve();
    }

    if(fs.existsSync('./secrets.json'))
      return flush();
    

    var readline = require('readline'),
        

        rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        }),

        url = oauth2Client.generateAuthUrl({
          access_type: 'offline', // will return a refresh token
          scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly' // can be a space-delimited string or an array of scopes
        });

    console.log('Please visit the', colors.bold('following ur'), 'and authenticate with your', colors.cyan('google drive'),'credentials: ');
    console.log(colors.inverse.underline(url));

    rl.question('Enter the code here:', function(code) {
      console.log('code entered',colors.green(code));
      oauth2Client.getToken(code, function(err, tokens) {
        if(err)
          return reject(err)
        rl.close()

        console.log('get token from code', tokens);
        secrets = tokens;
        utils.write('./secrets.json', JSON.stringify(tokens));
        drive = google.drive({ version: 'v2', auth: oauth2Client });
        return flush();
      });
    });
  });
};