
module.exports.getJson = (carDetails) => {
    const ID = () => '_' + Math.random().toString(36).substr(2, 9);
    const json = [];
    const {
        titles,
        descriptions,
        mileages,
        updateDates,
        links,
        imgs,
        prices,
        locations,
        years,
        conditions,
        engines,
        transmissionTypes
    } = carDetails;

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
            img: imgs[i]
        });
    });
    return json;
};

module.exports.getDetailsObj = (details) => {
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

    return {
        prices,
        locations,
        years,
        conditions,
        engines,
        transmissionTypes
    }
};

module.exports.urlParser = (src) => {
    const srcArray = src.split('/');
    srcArray[srcArray.indexOf('middle')] = 'big';
    return srcArray.join('/');
};