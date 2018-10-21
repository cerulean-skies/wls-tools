let wlsjs = require("wlsjs");
let steem = require('steem');

// ARRAY TO CONTAIN WITNESS USERNAMES
let witnesses = [];
let totalvotes = 0;

steem.api.setOptions({ url: 'https://api.steemit.com' });


wlsjs.api.setOptions({ url: 'ws://188.166.99.136:8090' });
wlsjs.config.set('address_prefix', 'WLS');
wlsjs.config.set('chain_id', 'de999ada2ff7ed3d3d580381f229b40b5a0261aec48eb830e540080817b72866');

// NAME OF THE TOP WITNESS IN LIST
getWitnessData("powerpicswitness");

function getWitnessData(topWitness){


  wlsjs.api.getWitnessesByVote(topWitness, 50, function(err, result) {

    let inccount = 0;
    let inc = -1;
    for (n in result) {
      inc++
      inccount++
      let obj = result[inc];
      console.log("Witness #"+inccount +": "+obj.owner);
      witnesses.push(obj.owner);
      // console.log(witnesses);

    }

    for (n in witnesses){

      let witnessName = witnesses[n];

      wlsjs.api.getAccountHistory(witnessName, 10000, 10000, function(err, result) {
        let supportcount = 0;

        let count = 0;
        let supporters = [];

        for (n in result){
          let obj = result[n]
          let op = obj[1].op;

          if (op[0] === "account_witness_vote") {

            let witnessVote = op[1]

            let account = witnessVote.account;
            let witness = witnessVote.witness;
            let approve = witnessVote.approve;
            let approved = "";

            if (account !== witnessName && witness === witnessName ) {
              switch (approve) {
                case true:
                count--

                  supporters.push(account);

                  break;
                case false:
                  count++

                  for( n in supporters){
                     if ( supporters[n] === account) {
                       supporters.splice(n, 1);

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

      }
      console.log("Witness: @"+witnessName + " has " + supportcount +"supporters.");
      totalvotes = totalvotes + supportcount;
      console.log("Total Votes Made: " + totalvotes);

      });

    }

    });

}
