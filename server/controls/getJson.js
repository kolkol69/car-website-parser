const IdGenerator = require('./id.generator');

exports.getJson = (carDetails) => {
    let json = [];

    // const ? let ? ???
    ({
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
    } = carDetails);

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
    return json;
}
