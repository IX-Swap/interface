//
import { getRequest } from 'services/httpRequests'

async function getListItem (dispatch, listId) {
  try {
    dispatch({ type: listViewActions.GET_LISTING_ITEM_REQUEST })

    const uri = `/exchange/listings/${listId}`
    const result = await getRequest(uri)
    const response = await result.json()

    if (result.status === 200) {
      dispatch({
        type: listViewActions.GET_LISTING_ITEM_SUCCESS,
        data: response.data
      })

      return response.data
    } else {
      dispatch({ type: listViewActions.GET_LISTING_ITEM_FAILURE })
    }

    throw new Error(response.message)
  } catch (err) {
    dispatch({
      ...err,
      type: listViewActions.GET_LISTING_ITEM_FAILURE
    })
    throw new Error(err)
  }
}

export default {
  getListItem
}
