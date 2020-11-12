import classNames from 'classnames'
import { ClassValue } from 'classnames/types'

export const privateClassNames = (...classes: ClassValue[]): string =>
  classNames(...classes, 'fs-exclude')
