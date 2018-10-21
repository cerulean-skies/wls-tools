let wlsjs = require("wlsjs");
let steem = require('steem');

var colors = require('colors');

steem.api.setOptions({ url: 'https://api.steemit.com' });

wlsjs.api.setOptions({ url: 'ws://188.166.99.136:8090' });
wlsjs.config.set('address_prefix', 'WLS');
wlsjs.config.set('chain_id', 'de999ada2ff7ed3d3d580381f229b40b5a0261aec48eb830e540080817b72866');

// Leave incrementals as they are.

let x = 0;
let y = 0;
let z = 0;

// The User that you would like to score.
const user = "haejin";
let created = "";


wlsjs.api.getAccounts([user], function(err, result) {
created = result[0].created.substring(0,10);
});

wlsjs.api.getAccountVotes(user, function(err, result) {

  for (n in result){
    x++
    let perm = result[n]
    let split = perm.authorperm.split('/')
    // console.log(split[0]);
    if (split[0] === user){ y++ }
    else {
      z++
    }
  }
  console.log("The User ".yellow+ "@".bold.blue +user.bold.blue + "'s Account was created: ".yellow +created.green);
  console.log("Total votes made by User: ".yellow + x.toString().green);
  console.log("Total votes 4 Self: ".yellow + y.toString().green);
  console.log("Total votes 4 Others: ".yellow + z.toString().green);

  let sum1 = y/x;
  let sum2 = z/x;
  console.log("User's Self Voting Percentage: ".yellow + sum1.toString().substring(0,5).green + "%".green);
  console.log("User's Selfless Voting Percentage: ".yellow + sum2.toString().substring(0,5).green + "%".green);
});
