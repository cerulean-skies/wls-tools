let wlsjs = require("wlsjs");

let clear = require('clear');
let steem = require('steem');

var colors = require('colors');

let args = process.argv.slice(2);
let witnessAccount = args[0];

let witnesses = [];

let totalSupport = [];

let totalvotes = 0;

let boo1 = false;

let matchingUser = "";
let spacedNumber = "";
steem.api.setOptions({ url: 'https://api.steemit.com' });


wlsjs.api.setOptions({ url: 'ws://188.166.99.136:8090' });
wlsjs.config.set('address_prefix', 'WLS');
wlsjs.config.set('chain_id', 'de999ada2ff7ed3d3d580381f229b40b5a0261aec48eb830e540080817b72866');


let blockStart = 0;
let loopnum = 0;

for (loopnum; loopnum < 50; loopnum++) {
  let supporters = [];

  incBlock();

numberWithSpaces(blockStart)

console.log("Looping through the next: ".grey+ spacedNumber.toString().green + " blocks.".grey);

matchingUser = "";

  wlsjs.api.getAccountHistory(witnessAccount, blockStart, 10000, function(err, result) {

    console.log(blockStart);
    let count = 0;
    let supportcount = 0;

    for (n in result){

      let obj = result[n];
      let op = obj[1].op;

      if (op[0] === "account_witness_vote") {

        let witnessVote = op[1];

        let account = witnessVote.account;
        let witness = witnessVote.witness;
        let approve = witnessVote.approve;
        let approved = "";
        matchingUser = account;

        if (account !== witnessAccount && witness === witnessAccount ) {
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
    bool = totalSupport.includes(matchingUser);

    if (bool === true) {
      let supportcount2 = 0;

      for (n in totalSupport){
        supportcount2++;
        let supporterX = totalSupport[n];
        let indexX = totalSupport.indexOf(supporterX);
        let actualnumX = indexX + 1;
        console.log("Index of ".grey + supporterX.blue.bold + " is: ".grey + actualnumX.toString().green.bold );
        console.log("Supporter #".red.bold + supportcount2.toString().red.bold + " -- "+"@".blue.bold + supporterX.blue.bold);
      }
      console.log("ERROR: " + "END OF BLOCKCHAIN... BREAKING OUT OF PROCESS NOW.");
      process.exit(1);

    }

  totalSupport = totalSupport.concat(supporters)
  console.log('\n');


  for (n in totalSupport){
    let supporter = totalSupport[n];
    let index = totalSupport.indexOf(supporter);
    let actualnum = index + 1;

    console.log("index of ".grey + supporter.grey + " is: ".grey + actualnum.toString().grey );

    if (index > -1) {
      supportcount++;
      console.log("Supporter #".red.bold + supportcount.toString().red.bold + " -- "+"@".blue.bold + supporter.blue.bold);

    }
  }

  });


}

function incBlock(){
  blockStart = blockStart + 10000;
  // console.log("incing to "+ blockStart);

}

function numberWithSpaces(x) {
    spacedNumber = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function merge_array() {
  for (n in totalSupport){
    var index = totalSupport.indexOf(totalSupport[n]);
    if (index > -1) {
       totalSupport.splice(index, 1);
       console.log("removed duplicate user: "+ totalSupport[n]);
  }
  }



}
