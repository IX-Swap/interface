/**
 * @param {num} number or float
 * @return formated string
 */
export function numberWithCommas(num, symbol) {
    if (!num) return '0';

    var parseNum = Math.round(num);
    var parts    = parseNum.toString().split(".");
    parts[0]     = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
}