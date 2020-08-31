//

export const initialState = {
  identity: {},
  corporate: {},
  corporateDataroom: [],
  dataroom: [],
  status: STATUS.INIT,
  shouldCreateNew: false,
  editMode: false,
  error: {
    save: null,
    get: null
  },
  type: undefined
}
