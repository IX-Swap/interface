import * as unoMaterialUI from 'uno-material-ui'

const unoMaterialUIMock =
  jest.genMockFromModule<typeof unoMaterialUI>('uno-material-ui')

export const snackbarService = {
  showSnackbar: jest.fn()
}

export default unoMaterialUIMock
