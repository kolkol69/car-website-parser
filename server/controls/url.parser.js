exports.urlParser = (src) => {

    let link1 = src;
    let link2;
    let srcArray = link1.split('/');
    srcArray[srcArray.indexOf('middle')] = 'big';
    link1 = srcArray.join('/');

    let linkId = link1.split('-')[1].split('.')[0];
    let nextId = 1;
    // do {
    link2 = link1.split('-')[0] + `-${linkId+nextId}.jpg`;
    nextId++;
    // }
    // while (urlExists(link2, (err, exists) => exists));

    return {
        0: link1,
        1: link2
    };

};
