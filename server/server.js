const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cheerio = require('cheerio');
const request = require('request', {
    headers: {
        'Content-Type': 'text/html; charset=UTF-8'
    }
});
const iconv = require('iconv-lite');

app.use(express.static('res'));

app.use((req, res, next) => {
    const origin = req.get('origin');
  
    // TODO Add origin validation
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  });

app.get('/', (req, res) => {
    res.send('OK');
});

const ID = () => '_' + Math.random().toString(36).substr(2, 9);

// GET method for ROUTES/WALLS to get them from database and send to front-end
app.get('/cars', (req, res) => {
    url = 'http://rst.ua/oldcars/audi/';

    var requestOptions = {
        encoding: null,
        method: "GET",
        uri: url
    };
    request(requestOptions, (error, response, _html) => {
        const html = iconv.decode(_html, "windows-1251");

        if (!error) {
            const $ = cheerio.load(html);

            const imgs = $('.rst-ocb-i-i').map((_, img) => $(img).attr('src')).get();
            const titles = $('.rst-ocb-i-h').map((_, title) => $(title).text()).get();
            const details = $('.rst-ocb-i-d-l-i-s').map((_, detail) => $(detail).text()).get();
            const descriptions = $('.rst-ocb-i-d-d').map((_, description) => $(description).text()).get();
            const updateDates = $('.rst-ocb-i-s').map((_, updateDate) => $(updateDate).text().split(' ').slice(-1)).get();
            const mileages = $('.rst-ocb-i-d-l-i').map((_, mileage) => {
                if ($(mileage).text().slice(0, 3).toLowerCase() === 'год') {
                    return $(mileage).text().split(',').slice(1, 2)[0].replace(/[()]/g, '');
                }
            }).get();

            const prices = [];
            const locations = [];
            const years = [];
            const conditions = [];
            const engines = [];
            const transmissionTypes = [];

            for (let i = 0; i <= details.length - 6; i += 6) {
                prices.push(details[i].split('\'').join());
                locations.push(details[i + 1]);
                years.push(details[i + 2]);
                conditions.push(details[i + 3]);
                engines.push(details[i + 4]);
                transmissionTypes.push(details[i + 5]);
            };

            let json = [];
            titles.forEach((title, i) => {
                json.push({
                    id: ID(),
                    number: i,
                    title,
                    price: prices[i],
                    year: years[i],
                    condition: conditions[i],
                    engine: engines[i],
                    transmissionType: transmissionTypes[i],
                    location: locations[i],
                    description: descriptions[i],
                    mileage: mileages[i],
                    updateDate: updateDates[i],
                    img: imgs[i],
                });
            });

            console.log('last json elem: ', Object.keys(json).length-1);

            fs.writeFile('./output.json', JSON.stringify(json, null, 4), () => {
                console.log('File successfully written! - Check your project directory for the output.json file');
            });

            res.send(json);
        }
    });
});

// app.get('/cars/:id', (req, res) => {
//     res.send(`car with ID: ${req.params.id}`);
// });

http.listen(3003, () => {
    console.log('Serwer uruchomiony na porcie http://localhost:3003');
});