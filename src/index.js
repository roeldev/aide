module.exports = (document.documentElement.classList ?
                  require('./api-classlist.js') :
                  require('./api-regexp.js'));
