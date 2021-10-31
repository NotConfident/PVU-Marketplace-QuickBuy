web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

var url_string = window.location.href
var url = new URL(url_string);

var abi = [{"inputs":[{"internalType":"address","name":"_nftAddr","type":"address"},{"internalType":"uint256","name":"_cut","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"AuctionCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startingPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endingPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"duration","type":"uint256"}],"name":"AuctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalPrice","type":"uint256"},{"indexed":false,"internalType":"address","name":"winner","type":"address"}],"name":"AuctionSuccessful","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"inputs":[],"name":"PVUToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"averageGen0SalePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"bid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"cancelAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"cancelAuctionWhenPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cut","type":"uint256"}],"name":"changeCut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_startingPrice","type":"uint256"},{"internalType":"uint256","name":"_endingPrice","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"address","name":"_seller","type":"address"}],"name":"createAuction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gen0SaleCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getAuction","outputs":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"startingPrice","type":"uint256"},{"internalType":"uint256","name":"endingPrice","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"startedAt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getCurrentPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSaleClockAuction","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastGen0SalePrices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nonFungibleContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerCut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var tokenID = url.searchParams.get("tokenID");
var price = url.searchParams.get("price");
var walletAddress = url.searchParams.get("wallet");

console.log("Token ID: ", tokenID);
console.log("Price: ", price / 1000000000000000000, " PVU");

var wallet;

(async () => {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    window.wallet = web3.utils.toChecksumAddress(accounts[0]);
    web3.eth.defaultAccount = wallet;
    // if(walletAddress == null) {
    //     window.location.assign(`http://13.250.199.131:8000/Marketplace.html?wallet=${wallet}&tokenID=${tokenID}&price=${price}`)
    //     // window.location.assign(`http://localhost:8000/Marketplace.html?wallet=${wallet}&tokenID=${tokenID}&price=${price}`)
    // }
    ethereum.on('accountsChanged', function (accounts) {
        window.location.assign(`http://13.250.199.131:8000/Marketplace.html?tokenID=${tokenID}&price=${price}`)
        // window.location.assign(`http://localhost:8000/Marketplace.html?tokenID=${tokenID}&price=${price}`)
    })
    checkTnC()
    if(tokenID != null && price != null) {
        buy()
    }
})();

var txHash;
async function buy() {
    var myContract = new web3.eth.Contract(abi,'0x926eae99527a9503eaDb4c9e927f21f84f20C977');
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // console.log(accounts[0])
    // contract_func = myContract.methods.bid(tokenID, price);
    data = web3.eth.abi.encodeFunctionCall({
        name: 'bid',
        type: 'function',
        inputs: [{
            type: 'uint256',
            name: '_tokenId'
        },{
            type: 'uint256',
            name: '_amount'
        }]
    }, [tokenID, price]);

    ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
            from: wallet,
            to: '0x926eae99527a9503eaDb4c9e927f21f84f20C977',
            gas: '79999',
            data: data,
        }],
    })
    .then(data => txHash = data)
    .then(() => sendReceipt(txHash))
}

function sendReceipt(txHash) {
    $.ajax({
        type : 'POST',              
        url : `http://13.250.199.131:5000/documentation?address=${wallet}&txHash=${txHash}`,
        crossDomain: true,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        success: function (data) { 
            console.log('Documentation Successful.', data)
        },
        error: function (e) {         
            console.log(e);
        }
    })
    console.log(txHash);
}

function checkTnC() {
    $.ajax({
        type : 'GET',              
        url : `http://13.250.199.131:5000/checkTnc?wallet=${wallet}`,
        crossDomain: true,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        success: function (data) { 
            console.log('T&C is confirmed awhile ago. Enjoy the service :)')
        },
        error: function (e) {         
            // console.log(e);
            if(confirm("Please Read. This is Important. Any attempts to bypass this popout to proceed with the service hosted here will be taken as the user has agreed to the statements listed below.\n\n" + 
                        "If you disagree with any of the statements below, close this webpage immediately and do not interact with it any longer in any form.\n\n" +
                        "There is a risk of a ban. We are not liable for any form of monetary losses via any means. You will not be able to access PVU's Front End in the event of one.\n\nDo not use your Main farming wallet for this.\nYou MIGHT still be able to sell your plants via Smart Contracts still if you get banned."+
                        "\n\nThis service DOES NOT interact with any of PVU's Server. It interacts with the Marketplace Smart Contracts directly." +
                        "\n\nYou will be redirected to our Disclaimer channel when you click cancel. Give it a read before coming back." + 
                        "\n\nBy proceeding, you will have agreed to proceed with the risks invovled, and is fully responsible for your own actions.")){
                agreeTnC()
            }
            else{
                window.location.assign("https://discord.com/channels/893340133204582440/893430277152604180");
            }
        }
    })
    console.log(txHash);
}

function ShowTnC(){
    alert("Please Read. This is Important. Any attempts to bypass this popout to proceed with the service hosted here will be taken as the user has agreed to the statements listed below.\n\n" + 
                        "If you disagree with any of the statements below, close this webpage immediately and do not interact with it any longer in any form.\n\n" +
                        "There is a risk of a ban. We are not liable for any form of monetary losses via any means. You will not be able to access PVU's Front End in the event of one.\n\nDo not use your Main farming wallet for this.\nYou MIGHT still be able to sell your plants via Smart Contracts still if you get banned."+
                        "\n\nThis service DOES NOT interact with any of PVU's Server. It interacts with the Marketplace Smart Contracts directly." +
                        "\n\nYou will be redirected to our Disclaimer channel when you click cancel. Give it a read before coming back." + 
                        "\n\nBy proceeding, you will have agreed to proceed with the risks invovled, and is fully responsible for your own actions.")
                
            
    // else{
    //     window.location.assign("https://discord.com/channels/893340133204582440/893430277152604180");
    // }
}

function agreeTnC() {
    $.ajax({
        type : 'POST',              
        url : `http://13.250.199.131:5000/agreeTnC?wallet=${wallet}`,
        crossDomain: true,
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        success: function (data) { 
            console.log('T&C Agreed. Enjoy the service :)')
        },
        error: function (e) {         
            console.log(e);
        }
    })
    console.log(txHash);
}

// setTimeout($(document).ready(function() {
//     console.log("Timed, 600ms Passed")
//     $.ajax({
//         type : 'GET',              
//         url : 'http://13.250.199.131:5000/readAddress?wallet=' + walletAddress,
//         crossDomain: true,
//         headers: {
//             "accept": "application/json",
//             "Access-Control-Allow-Origin":"*"
//         },
//         success: function (data, textStatus, xhr) { 
//             if(xhr.status == 200) {
//                 document.getElementById('status').innerHTML = "Address is whitelisted! <br> Thank you for your support 😊 <br><br> By continuing with this transaction, you agree to the terms of <a href='https://discord.com/channels/893340133204582440/893430277152604180'>#Disclaimer</a> and <a href='https://discord.com/channels/893340133204582440/894953208668106752'>#quickbuy-faq</a> Channel.";
//                 document.getElementById('howTo').innerHTML = "For more information on how to use this feature, head to <a href='https://discord.com/channels/893340133204582440/896961534822088715'>#how-to-quickbuy</a> Channel";
//                 if(tokenID != null && price != null) {
//                     buy()
//                 }
//             }
//         },
//         error: function (e) {         
//             // document.getElementById('status').innerHTML = "Address not whitelisted! <br> Contact PixieDixie#7914 via Discord if you would like to use this feature.";          
//             // console.log(e);
//             document.getElementById('status').innerHTML = "Address is whitelisted! <br> Thank you for your support 😊 <br><br> By continuing with this transaction, you agree to the terms of <a href='https://discord.com/channels/893340133204582440/893430277152604180'>#Disclaimer</a> and <a href='https://discord.com/channels/893340133204582440/894953208668106752'>#quickbuy-faq</a> Channel.";
//             document.getElementById('howTo').innerHTML = "For more information on how to use this feature, head to <a href='https://discord.com/channels/893340133204582440/896961534822088715'>#how-to-quickbuy</a> Channel";
//             if(tokenID != null && price != null) {
//                 buy()
//             }
//         }
//     });
// }),600)