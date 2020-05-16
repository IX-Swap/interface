// @flow
import type {
  GenericActions,
  GenericStatus,
  BaseStateWithPagination,
} from './types';

export default function generateReducers<T>(
  actionTypes: GenericActions,
  statusTypes: GenericStatus,
  additionalReducer?: (
    statusTypes: GenericStatus,
    state: BaseStateWithPagination<T>,
    load: any
  ) => BaseStateWithPagination<T>
) {
  const reducer = (
    state: BaseStateWithPagination<T>,
    load: any
  ): BaseStateWithPagination<T> => {
    const { type, payload } = load;
    switch (type) {
      case actionTypes.GET_REQUEST:
        return {
          ...state,
          status: statusTypes.GETTING,
          error: '',
        };
      case actionTypes.GET_SUCCESS:
        return {
          ...state,
          status: statusTypes.IDLE,
          error: null,
          items: payload.items,
          total: payload.total,
        };
      case actionTypes.GET_FAILURE:
        return {
          ...state,
          status: statusTypes.IDLE,
          error: payload.message,
        };
      case actionTypes.PAGE_CHANGE:
        return {
          ...state,
          status: statusTypes.INIT,
          page: payload.page || 0,
        };
      case actionTypes.ROWS_PER_PAGE_CHANGE:
        return {
          ...state,
          limit: payload.rows,
        };
      default:
        if (additionalReducer) {
          return additionalReducer(statusTypes, state, load);
        }

        throw new Error(`Unhandled action type: ${type}`);
    }
  };

  return reducer;
}
