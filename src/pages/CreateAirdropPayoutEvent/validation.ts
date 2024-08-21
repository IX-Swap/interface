import { object, string } from 'yup'

export const validation = object().shape({
  title: string().required('Field is required').max(100, 'Maximum is allowed 100 chars'),
  type: string().required('Field is required'),
  secToken: object().nullable().required('Field is required'),
  token: object().nullable().required('Field is required'),
})
