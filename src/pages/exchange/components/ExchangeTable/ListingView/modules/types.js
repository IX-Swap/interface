export const listViewActions = {
  GET_LISTING_ITEM_REQUEST: 'GET_LISTING_ITEM_REQUEST',
  GET_LISTING_ITEM_SUCCESS: 'GET_LISTING_ITEM_SUCCESS',
  GET_LISTING_ITEM_FAILURE: 'GET_LISTING_ITEM_FAILURE',
};

export type ListItemAssetState = {
  _id: string,
  name: string, 
  type: string,
  createdAt: string,
  updatedAt: string,
}

export type ListItemState = {
  _id: string,
  name: string, 
  asset: ListItemAssetState, 
  companyName: string, 
  description: string,
  createdAt: string,
  updatedAt: string,
};

export type ListingViewState = {
  data: ListItemState,
  isLoading: boolean,
  message?: string,
  error?: string,
};
  