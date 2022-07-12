import { object, string, array, TestContext } from 'yup'
import dayjs from 'dayjs'

export const validation = object().shape({
  title: string().required('Field is required').max(100, 'Maximum is allowed 100 chars'),
  description: string().required('Field is required').max(5000, 'Maximum is allowed 100 chars'),
  type: string().required('Field is required'),
  otherType: string().when('type', {
    is: (type: string) => type === 'Other',
    then: string().required('Field is required').max(50, 'Maximum is allowed 50 chars'),
    otherwise: string(),
  }),
  secToken: object().nullable().required('Field is required'),
  token: object().nullable().required('Field is required'),
  files: array().nullable().min(1, 'Must be at leat 1 file'),
  startDate: string().required('Field is required'),
  recordDate: string()
    .required('Field is required')
    .test(
      'validate',
      'Record date must be before start date minus 1 day',
      (value = '', context: TestContext<{ startDate?: string }>) => {
        if (value && context.parent.startDate) {
          return dayjs(value).isBefore(dayjs(context.parent.startDate))
        }

        return true
      }
    )
    .test(
      'validate',
      'Record date must be before end date minus 2 day',
      (value = '', context: TestContext<{ startDate?: string }>) => {
        if (value && context.parent.endDate) {
          return dayjs(value).subtract(1, 'day').isBefore(dayjs(context.parent.endDate))
        }
        return true
      }
    ),
  endDate: string().test(
    'isAfter',
    'End date must be after start date plus 1 day',
    (value = '', context: TestContext<{ startDate?: string }>) => {
      if (value && context.parent.startDate) {
        return dayjs(value).isAfter(dayjs(context.parent.startDate))
      }
      return true
    }
  ),
})
