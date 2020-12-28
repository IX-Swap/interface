import { DSOTableColumn } from 'types/dso'

export default interface User {
  _id: string
  roles: string
  email: string
  name: string
  verified: boolean
  accountType: string
  totpConfirmed: boolean
  accessToken: string
}

export interface CustomField {
  feature: string
  service: string
  columns: Record<DSOTableColumn, boolean>
  customFields: {
    [key: string]: string | number | boolean
  }
}

export interface UpdateCustomFieldArgs {
  columns: Record<DSOTableColumn, boolean>
  customFields: {
    [key: string]: string | number | boolean
  }
}
