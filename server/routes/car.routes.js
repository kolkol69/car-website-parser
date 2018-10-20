/* eslint-disable no-console */
const express = require('express');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');
const request = require('request', {
    headers: {
        'Content-Type': 'text/html; charset=UTF-8'
    }
});

const car = require('../controls/car'); //urlParser
const carList = require('../controls/car.list.js');



module.exports = (() => {
    'use strict';
    const router = express.Router();

    router.get('/:id', (req, res) => {
        const url = 'http://rst.ua/oldcars/audi/' + req.query.type + '/' + req.query.model + '.html';

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
                const title = $('#rst-page-oldcars-item-header').text().substring($('#rst-page-oldcars-item-header').children().text().length);
                const imgs = $('.rst-uix-float-left .rst-uix-radius').map((_, img) => {
                    if ($(img).get(0).tagName == 'a') {
                        return car.urlParser($(img).attr('href'));
                    }
                }).get();
                const _imgs = $('.rst-uix-float-left','.rst-uix-radius').map((_, img) => {
                    return $(img).attr('href');
                }).get();
                console.log('IMGIMGIMGIMG====',_imgs);

                // [ '133200 грн ', ' $4750' ]
                const price = $('.rst-uix-price-param').text().replace(/\'/g, '').split('/');

                json = {
                    title,
                    imgs: [..._imgs],
                    price
                };
            }

            fs.writeFile('./output_car.json', JSON.stringify(json, null, 4), () => {
                console.log('CAR file successfully written!');
            });
            res.send(json);
        });
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

                const imgs = $('.rst-ocb-i-i').map((_, img) => carList.urlParser($(img).attr('src'))).get();
                const titles = $('.rst-ocb-i-h').map((_, title) => $(title).text()).get();
                const carDetails = $('.rst-ocb-i-d-l-i-s').map((_, detail) => $(detail).text()).get();
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

                const carMainDetails = {
                    titles,
                    descriptions,
                    mileages,
                    updateDates,
                    links,
                    imgs
                };
                const unpackedCarDetails = {
                    ...carList.getDetailsObj(carDetails)
                };

                json = carList.getJson({ ...carMainDetails,
                    ...unpackedCarDetails
                });
            }

            // fs.writeFile('./output.json', JSON.stringify(json, null, 4), () => {
            // console.log('File successfully written! - Check your project directory for the output.json file');
            // });
            res.send(json);
        });

    });

    return router;
})();
