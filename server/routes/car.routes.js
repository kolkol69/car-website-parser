/* eslint-disable no-console */
const express = require('express');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('request', {
    headers: {
        'Content-Type': 'text/html; charset=UTF-8'
    }
});

const car = require('../controls/car');
const carList = require('../controls/car.list.js');

module.exports = (() => {
    'use strict';
    const router = express.Router();

    router.get('/:id', (req, res) => {
        const url = 'http://rst.ua/oldcars/audi/' + req.query.type + '/' + req.query.model + '.html';

        let json = {};
        const requestOptions = {
            encoding: null,
            method: "GET",
            uri: url
        };
        request(requestOptions, (error, response, _html) => {

            const html = iconv.decode(Buffer.from(_html), "windows-1251");

            if (!error) {
                const $ = cheerio.load(html);
                const listSelector = $('.rst-uix-list-superline');
                const tableSelector = $('.rst-uix-table-superline');

                const title = $('#rst-page-oldcars-item-header').text()
                    .substring($('#rst-page-oldcars-item-header').children().text().length);
                const imgs = $('.rst-uix-float-left', '.rst-uix-radius')
                    .map((_, img) => car.urlParser($(img).attr('href'))).get();
                const detailsSelector = listSelector.children().length > 0 ? listSelector : tableSelector;
                const details = detailsSelector.children()
                    .map((_, elem) => $(elem).text().split(':')[1]).get();
                const price = details[0].replace(/\'/g, '').split('/').join(' - ');
                const amountToRemove = details.length-7;
                const [year, engine, transmissionType, bodyType, location, views, updateDate] = details.splice(amountToRemove);
                const description = $('#rst-page-oldcars-item-option-block-container-desc').text();

                json = {
                    title,
                    imgs: [...imgs],
                    price,
                    year,
                    engine,
                    transmissionType,
                    bodyType,
                    location,
                    views,
                    updateDate,
                    url,
                    description
                };
            }

            res.send(json);
        });
    });

    router.get('/', (req, res) => {
        const url = 'http://rst.ua/oldcars/audi/1.html';

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

            res.send(json);
        });

    });

    return router;
})();
