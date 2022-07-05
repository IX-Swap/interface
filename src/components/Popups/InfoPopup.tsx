import React, { useContext } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
  padding-right: 15px;
  path {
    fill: none;
  }
  line {
    stroke: inherit;
  }
`

export default function InfoPopup({ success, summary }: { success?: boolean; summary?: string }) {
  const theme = useContext(ThemeContext)

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color={theme.green1} size={24} /> : <AlertCircle color={theme.red1} size={24} />}
      </div>
      <AutoColumn gap="8px">
        <TYPE.body fontWeight={500}>{summary ?? `${success ? 'Success' : 'Error'}`}</TYPE.body>
      </AutoColumn>
    </RowNoFlex>
  )
}
