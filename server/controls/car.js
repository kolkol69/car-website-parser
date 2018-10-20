module.exports.urlParser = (src) => {
    let srcArray = src.split('/');
    srcArray[srcArray.length-2] += '/big';
    return srcArray.join('/');
};