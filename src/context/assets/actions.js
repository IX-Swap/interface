import { postRequest } from 'services/httpRequests'

export function setAssetType (
  dispatch: Function,
  payload: {
    ref: { current: boolean, ... },
    type: string
  }
) {
  if (!payload.ref.current) return null
  dispatch({
    type: assetsActions.SET_ASSET_TYPE,
    payload: {
      type: payload.type
    }
  })
}

export async function getAssets (
  dispatch: Function,
  payload: {
    ref: { current: boolean, ... },
    skip?: number,
    limit?: number,
    ...
  }
) {
  const { ref, ...data } = payload || { ref: {} }

  try {
    dispatch({ type: assetsActions.GET_ASSETS_REQUEST })
    const uri = '/accounts/assets/list'
    const result = await postRequest(uri, {
      skip: 0,
      limit: 50,
      type: 'Currency',
      ...data
    })

    if (!ref.current) return null

    if (result.status === 200) {
      const response = await result.json()
      const { limit, count, skip, documents } = response.data.length
        ? response.data[0]
        : {}
      if (!ref.current) return null
      dispatch({
        type: assetsActions.GET_ASSETS_SUCCESS,
        payload: {
          page: Math.floor(skip / limit) + 1,
          total: count,
          assets: documents || []
        }
      })
    } else {
      dispatch({
        type: assetsActions.GET_ASSETS_FAILURE,
        payload: result.message
      })
    }
  } catch (err) {
    console.log(err)
    dispatch({ type: assetsActions.GET_ASSETS_FAILURE })
  }
}
