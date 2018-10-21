let wlsjs = require("wlsjs");
let steem = require('steem');

var colors = require('colors');

// Incremental to count total
let totalvotes = 0;

steem.api.setOptions({ url: 'https://api.steemit.com' });

wlsjs.api.setOptions({ url: 'ws://188.166.99.136:8090' });
wlsjs.config.set('address_prefix', 'WLS');
wlsjs.config.set('chain_id', 'de999ada2ff7ed3d3d580381f229b40b5a0261aec48eb830e540080817b72866');

// Users array stores user names
let users = [];
// Last user, && nextlastuser will store the very last name from the previous list of 1000.
let lastuser = "";
let nextlastuser = "";

wlsjs.api.lookupAccounts('""', 1000, function(err, result) {
  // console.log(err, result);
  for (n in result){
    // console.log(result[n]);
    users.push(result[n]);
    lastuser = result[n];

  }

wlsjs.api.lookupAccounts(lastuser, 1000, function(err, result) {
  for (n in result){
    users.push(result[n]);
    nextlastuser = result[n];

  }


wlsjs.api.lookupAccounts(nextlastuser, 1000, function(err, result) {
    for (n in result){
      users.push(result[n]);

    }
    for (n in users) {
      console.log(users[n].green);
    }

    count();
    process.exit(1);

});
});
});


function count(){
  let numUsers = 0;
  for (n in users) {
    numUsers++;
  }

  console.log("Total Users: ".red.bold + numUsers.toString().green.bold);

}
