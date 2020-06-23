// @flow
import React from 'react'
import DsoListModule from './modules'
import DsoList from './DsoList'

const { DsoListProvider } = DsoListModule

const DsoListWithProvider = ({
  onClickView,
  status,
  user = ''
}: {
  user?: string,
  status?: string,
  onClickView: Function,
}) => (
  <DsoListProvider>
    <DsoList onClickView={onClickView} status={status} user={user} />
  </DsoListProvider>
)

export default DsoListWithProvider
