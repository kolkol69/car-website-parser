////
const fs = require('fs');
const path = require('path');
// $ cat output.json | sed 's/http.*\.jpg/https:\/\/icdn2\.digitaltrends\.com\/image\/apple-car-3-970x647-c-3-720x720.jpg/g' > report.txt
// sed to replace all image links
////

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

app.get('/cars', (req, res) => {
    url = 'http://rst.ua/oldcars/audi/2.html';

    let json = [];
    var requestOptions = {
        encoding: null,
        method: "GET",
        uri: url
    };

    request(requestOptions, (error, response, _html) => {

        const html = iconv.decode(Buffer.from(_html), "windows-1251");

        if (!error) {
            const $ = cheerio.load(html);

            const imgs = $('.rst-ocb-i-i').map((_, img) => {
                src = $(img).attr('src');
                srcArray = src.split('/');
                srcArray[srcArray.indexOf('middle')] = 'big'
                src = srcArray.join('/');
                return src;
            }).get();
            const titles = $('.rst-ocb-i-h').map((_, title) => $(title).text()).get();
            const details = $('.rst-ocb-i-d-l-i-s').map((_, detail) => $(detail).text()).get();
            const descriptions = $('.rst-ocb-i-d-d').map((_, description) => $(description).text()).get();
            const updateDates = $('.rst-ocb-i-s').map((_, updateDate) => $(updateDate).text().split(' ').slice(-1)).get();
            const mileages = $('.rst-ocb-i-d-l-i').map((_, mileage) => {
                if ($(mileage).text().slice(0, 3).toLowerCase() === 'год') {
                    return $(mileage).text().split(',').slice(1, 2)[0].replace(/[()]/g, '');
                }
            }).get();
            const links = $('.rst-ocb-i-a').map((_, img) => {
                return 'http://rst.ua' + $(img).attr('href')
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
                    link: links[i],
                    img: imgs[i],
                });
            });

        }
        fs.readFile(path.join(__dirname, 'output.json'), (err, data) => {  
            if (err) throw err;
        res.send(JSON.parse(data));
        });
        // res.send(json);
    });
});

http.listen(3003, () => {
    console.log('Serwer uruchomiony na porcie http://localhost:3003');
});