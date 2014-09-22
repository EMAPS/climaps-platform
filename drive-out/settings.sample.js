'use-strict'

var settings = { // normally you do not have to change these configs 
  urls: {
    yql: 'https://query.yahooapis.com/v1/public/yql',
    folderview: 'https://drive.google.com/folderview?id=',
  }
};

/*
  Modify according to your own secrets etc..
  Client ID and client secret are available at
  https://code.google.com/apis/console
*/
settings.CLIENT_ID = 'XXXXXX-xxxxxxxx.apps.googleusercontent.com';
settings.CLIENT_SECRET = 'XXXXXXXXXXXXXXX';
settings.REDIRECT_URL = 'XXXXXXXXXXXXXXX';


module.exports = settings;