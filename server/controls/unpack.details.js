exports.getDetailsObj = (details) => {
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
