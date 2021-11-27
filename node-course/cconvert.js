let args = process.argv.slice(2)
let command = args[0]
var from 
var to
var amount

switch(command) {
    case "convert":
        let fromarg = args.find((x) => x.startsWith("--from"))
        from = fromarg.split("=")[1]
        var toarg = args.find((x) => x.startsWith("--to"))
        to = toarg.split("=")[1]
        var amountarg = args.find((x) => x.startsWith("--amount"))
        amount  = amountarg.split("=")[1]
        convert(from, to, amount)
        break;
    case "get":
        getAllCurrecncies()
        break;
    default:
        console.log(`command '${command} is not supported'`)
}

function convert(from, to, amount) {
 
    const request = require('request');

    const options = {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    qs: {format: 'json', from: from, to: to, amount: amount},
    headers: {
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
        'x-rapidapi-key': '7e96c81625msh4476496a5805e96p16a530jsn5e2f29723e04',
        useQueryString: true
    }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let result = JSON.parse(body)
        console.log(`The conversion rate is: '${result.rates[to].rate_for_amount}'`)
    });
}

function getAllCurrecncies(){
    const request = require('request');

    const options = {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/list',
    headers: {
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
        'x-rapidapi-key': '7e96c81625msh4476496a5805e96p16a530jsn5e2f29723e04',
        useQueryString: true
    }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body.currencies);
    });
}