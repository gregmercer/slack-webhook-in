var channelNotify = require('./lib/channel-notify');
var nconf = require('nconf');

/* NCONF SETTINGS */
// Parse environment variables
nconf.env();

function testChannelNotify() {

  var incomingUrl = 'https://hooks.slack.com/services/' + nconf.get('CHANNEL_NOTIFY_TOKEN');

  var ch_notify = new channelNotify(incomingUrl, {
    //channel: [ '#general', '#ping' ],
    //channel: [ '#ping' ],
    channel: [ '@username' ],
  });

  ch_notify.send('Hello World', function(err, result) {
    console.log(err, result);
  });

}

testChannelNotify();
