import styled, { css } from 'styled-components'

import { BodyRow, HeaderRow } from 'components/Table'
import { Colors } from 'theme/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 1fr minmax(auto, 125px) 1fr 1fr minmax(auto, 125px);
  height: 80px;
  min-width: 900px;
  width: 100%;
  margin-bottom: 0px;
  border: none;
  > div {
    padding: 24px 10px;
  }
  button {
    min-height: 32px;
    height: 32px;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 24px;
    line-height: 16px;
  }
`

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr 1fr minmax(auto, 125px) 1fr 1fr minmax(auto, 125px);
  min-width: 900px;
  width: 100%;
  margin-top: 22px;
  > div {
    color: ${({ theme }) => theme.text9};
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
  }
`

export const ViewBtn = styled.a`
  color: white;
`
