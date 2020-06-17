// @flow
import actionGenerator from 'context/base/withPagination/actions';

const { getter: getListings, ...pageMethods } = actionGenerator(
  'listingsList',
  `/exchange/listings/list`,
  {}
);

export default {
    getListings,
    ...pageMethods,
};
