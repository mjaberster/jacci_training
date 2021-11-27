//convert from USD to ILS

const request = require('request');

const options = {
  method: 'GET',
  url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
  qs: {format: 'json', from: 'USD', to: 'ILS', amount: '1'},
  headers: {
    'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
    'x-rapidapi-key': '7e96c81625msh4476496a5805e96p16a530jsn5e2f29723e04',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(JSON.parse(body).rates.ILS.rate);
});

console.log("Stopping")