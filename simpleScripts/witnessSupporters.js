let wlsjs = require("wlsjs");

let clear = require('clear');
let steem = require('steem');

var colors = require('colors');

// NAME OF THE TOP WITNESS IN LIST
let witnessAccount = "powerpicswitness";




steem.api.setOptions({ url: 'https://api.steemit.com' });


wlsjs.api.setOptions({ url: 'ws://188.166.99.136:8090' });
wlsjs.config.set('address_prefix', 'WLS');
wlsjs.config.set('chain_id', 'de999ada2ff7ed3d3d580381f229b40b5a0261aec48eb830e540080817b72866');


wlsjs.api.getAccountHistory(witnessAccount, 10000, 10000, function(err, result) {
  // incrementals
  let supportcount = 0;
  let count = 0;
  // ARRAY TO CONTAIN SUPPORTERS USERNAMES
  let supporters = [];

  // console.log(err, result);
  for (n in result){
    let obj = result[n]
    let op = obj[1].op;

    if (op[0] === "account_witness_vote") {

      let witnessVote = op[1]

      let account = witnessVote.account;
      let witness = witnessVote.witness;
      let approve = witnessVote.approve;
      let approved = "";

      if (account !== witnessAccount && witness === witnessAccount ) {
        switch (approve) {
          case true:
          count--

            console.log("Witness Vote: Operation #" + count );
            console.log("User @" + account + " has voted for " + witness + " " + approve);
            console.log("\n");
            supporters.push(account);
            console.log("Pushing User to Supporters: " + account);
            console.log(supporters);

            break;
          case false:
            count++
            console.log("Witness Vote: Operation #" +count );
            console.log("User @" + account + " has removed their vote for " + witness + " " + approve);
            console.log("\n");
            for( n in supporters){
               if ( supporters[n] === account) {
                 console.log(supporters[n]);
                 supporters.splice(n, 1);
                 console.log("Removing User from Supporters: " + account);
                 console.log(supporters);

               }
            }
          default:
        }
      }
    }
  }
for (n in supporters) {
  supportcount++
  let supporter = supporters[n];
  console.log("Supporter #" + supportcount + " -- @" + supporter);

}
});
