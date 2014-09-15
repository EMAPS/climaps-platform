'use strict';

var drivein  = require('./drivein'),
    colors   = require('cli-color'),
    settings = require('./settings'),
    
    Promise  = require('promise'),

    fs = require('fs');


console.log(colors.bold('driving out'));


function fwrite(path, contents) {
  return new Promise(function (resolve, reject) {
    fs.open(path, 'w', function(err, fd){
      if(err)
        return reject(err);

      console.log(colors.white('writing file'), colors.inverse(path));
      fs.write(fd, contents);
      fs.close(fd, function(){
        return resolve();
      })
    });
  });
};

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});



/*
  crating / updating contents folder

*/
fs.existsSync('../contents') || fs.mkdirSync('../contents');
fs.existsSync('../contents/narratives') || fs.mkdirSync('../contents/narratives');
fs.existsSync('../contents/maps') || fs.mkdirSync('../contents/maps');
fs.existsSync('../contents/pages') || fs.mkdirSync('../contents/pages');

false && drivein.getFolderContents(settings.folders.pages).then(function (pages) {

  for(var i =0; i<pages.length; i++) { 
    var contents = [];
    
    console.log('   ', colors.greenBright(pages[i].type), pages[i].slug);
    
    if(pages[i].type != "Document") {
      console.log(colors.yellow('... skipping'), pages[i].type.yellow, pages[i].slug, ': not a gdoc file');
      continue;
    };
    
    var html = drivein.getHtmlSync(pages[i].id),
        body,
        sections,
        title,
        subtitle,
        page = {
          sections:[]
        };

    try{
      body = html.match(/<body[^>]*>(.*?)<\/body>/i)[1]
    } catch(e) {
      console.log(colors.red('warning'), e)
      continue;
    }

    try{
      page.title = body.match(/class="[^"]*title"[^>]*>(.*?)<\/p>/i)[1].replace(/<[^>]*>/g, "");
    } catch(e) {
      console.log(colors.red('warning *page* title'), e)
      
    }
    sections = body.split(/<h2/); // search for h2 tags...
    //if(sections.length<2)
    //  continue;
    //console.log(sections);

    for(var j=0; j<sections.length; j++) {
      if(!sections[j].length)
        continue;
      // get the title
      try{
        title = sections[j].match(/<h1[^>]*>(.*?)<\/h1>/i)[1].replace(/<[^>]*>/g, "");
      } catch(e) {
        //console.log(colors.red('warning, *section title* not found'), e, sections[j]);
        continue;
      };
      // get the subtitle
     
      page.sections.push({
        html: '<h2' + sections[j],
        title: title
      });


    }

    fwrite('../contents/pages/'+ pages[i].slug +'.json', JSON.stringify(page, null,2));
    
    
  }

});

/*
  Map request
*/
false && drivein.getFolderContents(settings.folders.maps).then(function (folders) {
  //console.log(folders);
  var maps = folders.filter(function(d){ return d.slug.indexOf('map-') != -1; });
  
    
  for(var i =0; i<maps.length; i++) { // foreach folder found,
    var files = [];
    console.log('...', colors.greenBright(maps[i].type), maps[i].slug);
    if(maps[i].type != "folder") {
      console.log(colors.yellow('... skipping'), maps[i].type.yellow, maps[i].slug, ': not a folder');
      continue;
    };
    files = drivein.getFolderContentsSync(maps[i].id);
    // get map title from inslide the document
    for(var j =0; j<files.length; j++) {
      console.log('      ', colors.greenBright(files[j].type), files[j].slug);//, files[j].type == "PNG Image",files[j].slug.indexOf("cover"));
      
      files[j].sections = [];

      if(files[j].type == "Document") {
        var html = drivein.getHtmlSync(files[j].id),
            body = html.match(/<body[^>]*>(.*?)<\/body>/i)[1],
            title,
            subtitle;

        if (files[j].slug.indexOf('-description')!= -1) { // narrative specific approach
          try{
            title = body.match(/class="[^"]*title"[^>]*>(.*?)<\/p>/i)[1].replace(/<[^>]*>/g, "");
          } catch(e) {
            console.log('   ', 'title not found', e);
          }

          try{
            subtitle = body.match(/class="[^"]*subtitle"[^>]*>(.*?)<\/p>/i)[1].replace(/<[^>]*>/g, "");
          } catch(e) {
            console.log('   ', 'subtitle not found', e);
          }

          maps[i].title = title || maps[i].title;
          maps[i].subtitle = subtitle || '';
          
          files[j].title = title || files[j].title;
          files[j].subtitle = subtitle || '';

          files[j].sections.push(body);

        } else if (files[j].type == "Document" && files[j].slug.indexOf('-metadata')!= -1) { 
          files[j].sections.push(body); // spplit in section? other stugffs?
          //console.log('metadata', body.split(/<h1(.*?)>/))
        }

      } else if (files[j].type == "PNG Image" && files[j].slug.indexOf('cover')!= -1) { 
        //console.log('daiosdiaodiaoidoasidosaidoidoaids', files[j])
        maps[i].cover = files[j].src; // spplit in section? other stugffs?
          //console.log('metadata', body.split(/<h1(.*?)>/))
      };
    }
    fwrite('../contents/maps/'+ maps[i].slug +'.json', JSON.stringify(files, null,2));
    //break; // firs 
      //console.log('writing contents of', folders[i].type.yellow, folders[i].slug);
  }
  fwrite('../contents/maps.json', JSON.stringify(maps, null,2));
});


/*
  start narratives
*/
drivein.getFolderContents(settings.folders.narratives).then(function (folders) {
  
  //console.log(folders);
  var narratives = folders.filter(function(d){ return d.slug.indexOf('narrative') != -1; });
  
    
  for(var i =0; i<narratives.length; i++) { // foreach folder found,
    var files = [];
    console.log('...', colors.greenBright(narratives[i].type), narratives[i].slug);
    if(narratives[i].type != "folder") {
      console.log(colors.yellow('... skipping'), narratives[i].type.yellow, narratives[i].slug, ': not a folder');
      continue;
    };
    files = drivein.getFolderContentsSync(narratives[i].id);
    // get map title from inslide the document
    for(var j =0; j<files.length; j++) {
      console.log('      ', colors.greenBright(files[j].type), files[j].slug);
      
      files[j].sections = [];

      if(files[j].type == "Document") {
        var html = drivein.getHtmlSync(files[j].id),
            body = html.match(/<body[^>]*>(.*?)<\/body>/i)[1],
            title,
            subtitle,
            sections;

        if (files[j].slug.indexOf('narrative-')!= -1) { // narrative specific approach
          //console.log(body);
          try{
            title = body.match(/class="[^"]*title"[^>]*>(.*?)<\/p>/i)[1].replace(/<[^>]*>/g, "");
          } catch(e) {
            console.log('   narrative *title* not found', e);
          };

          try{
            subtitle = body.match(/class="[^"]*subtitle"[^>]*>(.*?)<\/p>/i)[1].replace(/<[^>]*>/g, "");
          } catch(e) {
            console.log(e);
          };

          narratives[i].title = title || narratives[i].title;
          narratives[i].subtitle = subtitle || '';
          
          files[j].title = title || files[j].title;
          files[j].subtitle = subtitle || '';
          // split narratives into sections based on h1s, extract the links and so on

          console.log('         ','title: ', colors.inverse(files[j].title))
          sections = body.split(/<h1/); // search for h2 tags...
          
          if(sections.length<2) // no section on doument
            continue;
          
          // cycle H! gdoc sections
          for(var k=0; k<sections.length; k++) {
            if(!sections[k].length)
              continue;

            var section = {
                  type: 'text',
                  html: '<h1' + sections[k]
                },
                
                section_img_match,
                section_directive_match;

            // get the title
            try{
              section.title = section.html.match(/(.*?)<\/h1>/i)[1].replace(/<[^>]*>/g, "");
            } catch(e) { // no section title
              //console.log(colors.red('warning, *section title* not found'), e, sections[k]);
              section.title = ''; // aka untitled
            };

            // check if section does contain image
            console.log('           ','section:', colors.underline(section.title));
            

            var section_img_match = section.html.match(/<img(.*?)src="([^"]+)"(.*?)>/)
            if(section_img_match) {
                section.type = 'image';
                section.src = section_img_match[2];
                
              // get caption
              try{
                section.caption = section.html.match(/<h5(.*?)>(.*?)<\/h5>/)[2].replace(/<[^>]*>/g, "");
                console.log('           ','.caption:', section.caption.substring(0, 25),'...');
              } catch(e) {
                // caption not found
              }

              // get directive
              try{
                section_directive_match = section.html.match(/<h6(.*?)>(.*?)<\/h6>/);
                console.log('           ','.directive:', section_directive_match[2].replace(/<[^>]*>/g, ""));

                section.directive = section_directive_match[2].replace(/<[^>]*>/g, "");
                section.type = 'interactive';
                
                // parse directives here, block if errors

              } catch(e) {/* directive not found */ };
            }
            console.log('           ','.type:',section.type);
            
            
            /*page.sections.push({
              html: '<h2' + sections[k],
              title: title
            });
            */
            files[j].sections.push(section);
          }

          
          
          

        } else if (files[j].type == "Document" && files[j].slug.indexOf('-metadata')!= -1) { 
          files[j].sections.push(body); // spplit in section? other stugffs?
          //console.log('metadata', body.split(/<h1(.*?)>/))
        }

      } else if (files[j].type == "PNG Image" && files[j].slug.indexOf('cover')!= -1) { 
        narratives[i].cover = files[j].src; // spplit in section? other stugffs?
          //console.log('metadata', body.split(/<h1(.*?)>/))
      };
    }
    fwrite('../contents/narratives/'+ narratives[i].slug +'.json', JSON.stringify(files,null,2));
    //break; // firs 
    // break
      //console.log('writing contents of', folders[i].type.yellow, folders[i].slug);
  }
  console.log(colors.blink('narratives completed'));
  fwrite('../contents/narratives.json', JSON.stringify(narratives,null,2));
});

