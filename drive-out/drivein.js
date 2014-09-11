'use strict';
var settings = require('./settings'),
    request  = require('request'),
    requestSync  = require('request-sync'),
    colors   = require('cli-color'),
    Promise  = require('promise');



/*
  This silly function return the callback(object) of the object having the key=value.
  This is a specific function for scraping the query results retrieved by YQL
*/
var findAs = function(obj, key, value, callback) { // return the very first object, search is a couple key value
  for(var i in obj.div){
    if(typeof value === 'function' && obj.div[i][key])// looking only for the key args 
      return callback(obj.div[i]);

    if(i == key && obj.div[i] == value)
      return callback(obj.div);

    if(obj.div[i][key] && obj.div[i][key] == value){
      return callback(obj.div[i]);
    }

    if(typeof obj.div[i] === 'object'){
      var loop = findAs(obj.div[i], key, value, callback);
      if(loop !== undefined)
        return loop;
    }
  }
  return undefined; // i.e. not found
};




/*
  Return clean slug from a string
*/
var slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/[\s_]+/g, '-')           // Replace spaces and underscore with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};



/*
This is a specific function for obtain a structured json object from the json query results retrieved by YQL
*/
var struct = function(item) {
  var title = findAs(item, 'class', 'flip-entry-title', function(d){
        return {
          text: d.p.replace(/\([^\)]*\)/g, '').split(/^\d+\s/).pop(), // vcleaned text
          original: d.p // original text
        };
      }),

      type = findAs(item, 'class', 'flip-entry-thumb', function(d){
        return d.img.alt; // et oui monsieur
      }) || 'folder',

      id = item.id.substring(6), // usually google public pages shows id like 'entry-0ByZTyEnzm9qqTFlOazlfa3BSSEE'

      result = { 
        title: title.text,
        slug: slugify(title.original),
        sort: title.original,
        id: id,
        type: type
      }; // uh?
  
  if(result.type === 'folder') {
    return result;
  };
  
  result.src = findAs(item, 'class', 'flip-entry-thumb', function(d){
    return d.img.src.split(/=s\d+$/).shift();
  });
  
  return result;
};



/*
  Exemple: 
*/
exports.getHtml = function(fileId, format) {
  var f = format || 'html'; // format can either be html or txt
  
  console.log(colors.yellow('getting file contents'), 'of', fileId);
  
  return new Promise(function (resolve, reject) {
    request({
      url:'https://docs.google.com/feeds/download/documents/export/Export?id='+fileId+'&exportFormat=html'
    }, function (err, res, body) {
      if (err) {
          return reject(err);
      } else if (res.statusCode !== 200) {
          err = new Error("Unexpected status code: " + res.statusCode);
          err.res = res;
          return reject(err);
      }
      // do other magic stuff with text ...
      resolve(body);
    });
  });
};



exports.getHtmlSync = function(fileId, format) {
  var f = format || 'html'; // format can either be html or txt
  var response = requestSync({
    url:'https://docs.google.com/feeds/download/documents/export/Export?id='+fileId+'&exportFormat=' + f,
    method: 'GET'
  });
  console.log('         ',colors.cyan('get html sync'), 'of', fileId);
  return response.body;
}


exports.getFolderContentsSync = function(folderId) {
  console.log("      ",colors.cyan("get folder contents sync"), 'of', folderId);
  
  var contents = [],
      response = requestSync({
        url: settings.urls.yql,
        qs: {
          q: 'select * from html where url="' + settings.urls.folderview + folderId + '" and xpath=\'//div[@class="flip-entry"]\'',
          format:'json',
          diagnostics: true
        },
        method: 'GET' 
      });

  console.log("      ", '... statusCode', colors.green(response.statusCode));
  console.log(response.body);

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
      contents.push(struct(body.query.results.div[i]));
    };
  } else { // just one item under folder
    contents.push(struct(body.query.results.div));
  }
  console.log('      ',contents.length, colors.white("files/folders found"));
  return contents;
}



exports.getFolderContents = function(folderId) {
  console.log(colors.cyan('get folder contents'), 'of', folderId);
  return new Promise(function (resolve, reject) {
    var contents = [];

    request({
      url: settings.urls.yql,
       json:true,
      qs: {
        q: 'select * from html where url="' + settings.urls.folderview + folderId + '" and xpath=\'//div[@class="flip-entry"]\'',
            format:'json',
            diagnostics: true
          }, 
      }, function (err, res, body) {
        
        if (err) {
            return reject(err);
        } else if (res.statusCode !== 200) {
            err = new Error("Unexpected status code: " + res.statusCode);
            err.res = res;
            return reject(err);
        }
        
        if(!body.query) {
          err = new Error("Unexpected body content: " + body);
          err.res = res;
          return reject(err);
        };

        if(!body.query.results){
          err = new Error("Unexpected results content: " + body);
          err.res = res;
          return reject(err);
        }

        console.log('... statusCode', colors.green(res.statusCode));
  
        if(body.query.results.div.length) {
          for(var i in body.query.results.div) {
            contents.push(struct(body.query.results.div[i]));
          };
        } else { // just one item under folder
          contents.push(struct(body.query.results.div));
        }
        return resolve(contents);
    });
  });
};