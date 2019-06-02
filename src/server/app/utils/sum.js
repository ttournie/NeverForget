const sum = function () {
    const args = Object.values(arguments);

    if(!args.every(Number.isFinite)) {
        throw new TypeError('sum() expects only numbers.');
    }

    return args.reduce((a, b) => a + b, 0);
}

module.exports = sum;
