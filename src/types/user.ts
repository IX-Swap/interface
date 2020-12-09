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
  _id: string
  createdAt: string
  updatedAt: string
  feature: string
  service: string
  user: string
  columns: {
    [key: string]: boolean
  }
}

export interface UpdateCustomFieldArgs {
  columns: Record<DSOTableColumn, boolean>
  customFields: {
    [key: string]: string | number | boolean
  }
}
