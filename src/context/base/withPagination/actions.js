//
import { postRequest } from 'services/httpRequests'

export default (name, uri, additionalPayload) => {
  const sName = name.charAt(0).toUpperCase() + name.slice(1)
  const { actionTypes } = generateTypes(sName)

  async function getter (dispatch, payload) {
    const { ref, ...data } = payload || { ref: {} }

    try {
      dispatch({ type: actionTypes.GET_REQUEST })
      const result = await postRequest(uri, {
        skip: 0,
        limit: 50,
        ...additionalPayload,
        ...data
      })

      const response = await result.json()
      if (!ref.current) return null
      if (result.status === 200) {
        const { limit, count, skip, documents } = response.data.length
          ? response.data[0]
          : {}

        dispatch({
          type: actionTypes.GET_SUCCESS,
          payload: {
            page: Math.floor(skip / limit) + 1,
            total: count,
            items: documents || [],
            statusCode: result.status
          }
        })
      } else {
        const pld = {
          ...response,
          statusCode: result.status
        }

        if (result.status === 403) {
          pld.items = []
        }

        dispatch({
          type: actionTypes.GET_FAILURE,
          payload: pld
        })
      }
    } catch (err) {
      dispatch({
        type: actionTypes.GET_FAILURE,
        payload: { message: JSON.stringify(err), statusCode: 0 }
      })
    }
  }

  function setPage (dispatch, payload) {
    dispatch({ type: actionTypes.PAGE_CHANGE, payload })
  }

  function setRowsPerPage (dispatch, payload) {
    dispatch({
      type: actionTypes.ROWS_PER_PAGE_CHANGE,
      payload
    })
  }

  function clearBaseData (dispatch) {
    dispatch({
      type: actionTypes.CLEAR_DATA
    })
  }

  function clearApiStatus (dispatch) {
    dispatch({
      type: actionTypes.CLEAR_API
    })
  }

  return {
    getter,
    setPage,
    clearBaseData,
    clearApiStatus,
    setRowsPerPage
  }
}
