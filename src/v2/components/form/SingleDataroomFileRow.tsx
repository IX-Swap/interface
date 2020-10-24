import React from 'react'
import { DataroomFileRow, DataroomFileRowProps } from './DataroomFileRow'

export interface SingleDataroomFileRowProps extends DataroomFileRowProps {}

export const SingleDataroomFileRow = (props: SingleDataroomFileRowProps) => {
  return <DataroomFileRow {...props} disableBorder />
}
