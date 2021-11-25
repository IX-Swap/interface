/* eslint-disable */
import { isTestENV } from 'config/history'
import * as Yup from 'yup'

const mockYup: any = jest.requireActual('yup')

if (isTestENV) {
  Yup.addMethod(Yup.string, 'phone', () => ({ required: jest.fn() } as any))
}

export const object = mockYup.object
export const addMethod = mockYup.addMethod
export const number = mockYup.number
export const string = mockYup.string
export const date = mockYup.date
export const array = mockYup.array
export const boolean = mockYup.boolean
export const mixed = mockYup.mixed
export const bool = mockYup.bool
export const ref = mockYup.ref
export const ValidationError = mockYup.ValidationError
