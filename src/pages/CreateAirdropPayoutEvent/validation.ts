import { object, string, array } from 'yup'

export const validation = object().shape({
  title: string().required('Field is required').max(100, 'Maximum is allowed 100 chars'),
  secToken: object().nullable(),
  token: object().nullable().required('Field is required'),
  memo: string().required('Field is required'),
  files: array().min(1, 'Field is required').required('Field is required'),
})
