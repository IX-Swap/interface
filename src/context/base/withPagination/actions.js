// @flow
import { postRequest } from 'services/httpRequests';
import generateTypes from './types';

export default (name: string, uri: string, additionalPayload: any) => {
  const sName = name.charAt(0).toUpperCase() + name.slice(1);
  const { actionTypes } = generateTypes(sName);

  async function getter(
    dispatch: Function,
    payload: {
      ref: { current: boolean, ... },
      skip?: number,
      limit?: number,
      ...
    }
  ) {
    const { ref, ...data } = payload || { ref: {} };

    try {
      dispatch({ type: actionTypes.GET_REQUEST });
      const result = await postRequest(uri, {
        skip: 0,
        limit: 50,
        ...additionalPayload,
        ...data,
      });

      const response = await result.json();
      if (!ref.current) return null;
      if (result.status === 200) {
        const { limit, count, skip, documents } = response.data[0];
        dispatch({
          type: actionTypes.GET_SUCCESS,
          payload: {
            page: Math.floor(skip / limit) + 1,
            total: count,
            items: documents,
            statusCode: result.status,
          },
        });
      } else {
        const pld = {
          ...response,
          statusCode: result.status,
        };

        if (result.status === 403) {
          pld.items = [];
        }

        dispatch({
          type: actionTypes.GET_FAILURE,
          payload: pld,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.GET_FAILURE,
        payload: { message: JSON.stringify(err), statusCode: 0 },
      });
    }
  }

  function setPage(dispatch: Function, payload: { page: number }) {
    dispatch({ type: actionTypes.PAGE_CHANGE, payload });
  }

  function setRowsPerPage(dispatch: Function, payload: { rows: number }) {
    dispatch({
      type: actionTypes.ROWS_PER_PAGE_CHANGE,
      payload,
    });
  }

  function clearBaseData(dispatch: Function) {
    dispatch({
      type: actionTypes.CLEAR_DATA,
    });
  }

  function clearApiStatus(dispatch: Function) {
    dispatch({
      type: actionTypes.CLEAR_API,
    });
  }

  return {
    getter,
    setPage,
    clearBaseData,
    clearApiStatus,
    setRowsPerPage,
  };
};
