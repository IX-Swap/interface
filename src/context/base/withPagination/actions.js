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

      if (!ref.current) return null;

      if (result.status === 200) {
        const response = await result.json();
        const { limit, count, skip, documents } = response.data[0];
        dispatch({
          type: actionTypes.GET_SUCCESS,
          payload: {
            page: Math.floor(skip / limit) + 1,
            total: count,
            items: documents,
          },
        });
      } else {
        dispatch({
          type: actionTypes.GET_FAILURE,
          payload: result.message,
        });
      }
    } catch (err) {
      dispatch({ type: actionTypes.GET_FAILURE });
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

  return {
    getter,
    setPage,
    setRowsPerPage,
  };
};
