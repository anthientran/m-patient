/**
 * Implements and stores Bayeasian Network.
 * Compares Symptoms of two patients.
 * @Author: Nhut Hai Huynh
 */

/**
 * Convert array of objects to array of JSON objects.
 * @return {array} - converted JSON objects array.
 * @param {array} arr - Array of Objects.
 * and Disease.
 */
function serialize(arr) {
    var text = '{';
    for (i = 0; i < arr.length; i ++) {
        if (i == 0) {
            text += '"q' + (i+1) + '" : ' + arr[i].toString();
        } else {
            text += ',"q' + (i+1) + '" : ' + arr[i].toString();
        }
    }
    text += '}';
    var jsonObj = JSON.parse(text);
    return [jsonObj];
}

module.exports = { serialize };