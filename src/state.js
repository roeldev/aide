module.exports = (document.documentElement.classList ?
                  require('./state/api-classlist.js') :
                  require('./state/api-regexp.js'));
