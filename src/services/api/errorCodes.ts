export enum errorCodes {
  COULD_NOT_GET_CUSTODY_ACCOUNT = 'RWHC-87H9HK',
  COULD_NOT_ASSIGN_CUSTODY_ACCOUNT = 'RWHC-89HIJK'
}

export type Errors = {
  [key in errorCodes]: {
    code: errorCodes
    message?: string
  }
}

export const errors: Errors = {
  [errorCodes.COULD_NOT_GET_CUSTODY_ACCOUNT]: {
    code: errorCodes.COULD_NOT_GET_CUSTODY_ACCOUNT
  },
  [errorCodes.COULD_NOT_ASSIGN_CUSTODY_ACCOUNT]: {
    code: errorCodes.COULD_NOT_ASSIGN_CUSTODY_ACCOUNT,
    message: 'Could not assign custody account'
  }
}
