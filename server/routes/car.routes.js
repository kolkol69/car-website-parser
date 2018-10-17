/* eslint-disable no-console */
const express = require('express');
const cheerio = require('cheerio');
const request = require('request', {
    headers: {
        'Content-Type': 'text/html; charset=UTF-8'
    }
});
const iconv = require('iconv-lite');
const IdGenerator = require('../controls/id.generator.js');
////
const link = require('../controls/url.parser');
const fs = require('fs');
const path = require('path');
const urlExists = require('url-exists');
////

module.exports = (function () {
    'use strict';
    const router = express.Router();

    router.get('/:id', (req, res) => {
        res.send('cos');
        // console.log('id:', req.params.id);
    });

    router.get('/', (req, res) => {
        const url = 'http://rst.ua/oldcars/audi/2.html';

        let json = [];
        const requestOptions = {
            encoding: null,
            method: "GET",
            uri: url
        };

        request(requestOptions, (error, response, _html) => {

            const html = iconv.decode(Buffer.from(_html), "windows-1251");

            if (!error) {
                const $ = cheerio.load(html);

                const imgs = $('.rst-ocb-i-i').map((_, img) => {
                    const imgParsedUrl = link.urlParser($(img).attr('src'));
                    return imgParsedUrl;
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
                    return 'http://rst.ua' + $(img).attr('href');
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
                }

                titles.forEach((title, i) => {
                    json.push({
                        id: IdGenerator.ID(),
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
                        img: imgs[i]
                    });
                });
            }

            fs.writeFile('./output.json', JSON.stringify(json, null, 4), () => {
                console.log('File successfully written! - Check your project directory for the output.json file');
            });
            res.send(json);
        });

    });

    return router;
})();
