exports.urlParser = (src) => {
    let link1 = src;
    let srcArray = link1.split('/');
    srcArray[srcArray.indexOf('middle')] = 'big';
    link1 = srcArray.join('/');
    return {
        0: link1,
        1: link1
    };
};