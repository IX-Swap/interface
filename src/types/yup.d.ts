/* eslint-disable */
import * as Yup from 'yup'

declare module 'yup' {
  export interface StringSchema {
    phone(
      countryCode?: string,
      strict?: boolean,
      errorMessage?: string
    ): StringSchema
  }
}
