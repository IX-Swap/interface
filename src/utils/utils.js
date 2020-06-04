import localStore from 'services/storageHelper';
/**
 * @param {num} number or float
 * @return formated string
 */
export const numberWithCommas = (num, symbol) => {
    if (!num) return '0';

    var parseNum = Math.round(num);
    var parts    = parseNum.toString().split(".");
    parts[0]     = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
}

/**
 * @param {path} string
 * @return formated string
 */
const isVisited = path => {
    const checkStore = localStore.retrieve('visitedUrl');
    const existingPath = !!checkStore?.find(p => p === path);

    return existingPath;
}

/**
 * @param {path} string
 * @return formated array of pages
 */
const addVisitedPages = path => {
    const checkStore = localStore.retrieve('visitedUrl');
    const visitedUrl = [...checkStore];

    if(!isVisited(path)) {
        visitedUrl.push(path);
        localStore.store('visitedUrl', visitedUrl);
    }

    return visitedUrl;
}

export default {
    addVisitedPages,
    isVisited,
}

