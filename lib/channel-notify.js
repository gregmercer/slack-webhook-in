var request = require('request');
var _       = require('lodash');
var util    = require('util');

module.exports = channelNotify;

function channelNotify (incomingUrl, options) {
  this.incomingUrl = incomingUrl;
  this.options = options;
}

channelNotify.prototype.doPost = function(options, callback) {

  var result =
  request.post(this.incomingUrl, {
    body: JSON.stringify(options)
  }, function(err, resp, body) {
    if (callback != null) {
      if (body === 'ok') {
        return callback(null, body);
      } else {
        return callback(err || body);
      }
    }
  });

  return result;
};

channelNotify.prototype.send = function (message, callback) {

  console.log('in channelNotify send');

  if ((message == null) || (_.isObject(message && ((message != null ? message.text : void 0) == null)))) {
    throw new Error('Message required');
  }
  options = {};
  options.text = typeof message === 'string' ? message : message.text;
  options.channel = message.channel == null ? '#general' : message.channel;
  options = _.extend(options, this.options);
  options = _.extend(options, message);

  if (_.isArray(options.channel)) {

    total = options.channel.length;
    count = 0;
    _ref = options.channel;

    _results = [];

    for (_i = 0, _len = _ref.length; _i < _len; _i++) {

      chn = _ref[_i];
      options.channel = chn;

      var result = this.doPost(options, callback);

      _results.push(result);

    }

    return _results;

  } else {

    var result = this.doPost(options, callback);

    return result;

  }

}
