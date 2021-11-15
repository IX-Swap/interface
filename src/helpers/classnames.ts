import classNames from 'classnames'

export const privateClassNames = (...classes: any[]): string =>
  classNames(...classes, 'fs-exclude')
