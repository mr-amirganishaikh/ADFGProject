/**
 * Converts num to a decimal string (if it isn't one already) and then rounds it
 * to at most dp decimal places.
 *
 * For explanation of why you'd want to perform rounding operations on a String
 * rather than a Number, see http://stackoverflow.com/a/38676273/1709587
 *
 * @param {(number|string)} num
 * @param {number} dp
 * @return {string}
 */
function roundNumber (num, dp) {
    if (arguments.length != 2) throw new Error("2 arguments required");

    num = String(num);
    if (num.indexOf('e+') != -1) {
        // Can't round numbers this large because their string representation
        // contains an exponent, like 9.99e+37
        throw new Error("num too large");
    }
    if (num.indexOf('.') == -1) {
        // Nothing to do
        return num;
    }

    var parts = num.split('.'),
        beforePoint = parts[0],
        afterPoint = parts[1],
        shouldRoundUp = afterPoint[dp] >= 5,
        finalNumber;

    afterPoint = afterPoint.slice(0, dp);
    if (!shouldRoundUp) {
        finalNumber = beforePoint + '.' + afterPoint;
    } else if (/^9+$/.test(afterPoint)) {
        // If we need to round up a number like 1.9999, increment the integer
        // before the decimal point and discard the fractional part.
        finalNumber = Number(beforePoint)+1;
    } else {
        // Starting from the last digit, increment digits until we find one
        // that is not 9, then stop
        var i = dp-1;
        while (true) {
            if (afterPoint[i] == '9') {
                afterPoint = afterPoint.substr(0, i) +
                             '0' +
                             afterPoint.substr(i+1);
                i--;
            } else {
                afterPoint = afterPoint.substr(0, i) +
                             (Number(afterPoint[i]) + 1) +
                             afterPoint.substr(i+1);
                break;
            }
        }

        finalNumber = beforePoint + '.' + afterPoint;
    }

    // Remove trailing zeroes from fractional part before returning
    return finalNumber.replace(/0+$/, '')
}