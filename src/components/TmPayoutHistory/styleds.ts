import styled from 'styled-components'

import { BodyRow, HeaderRow } from 'components/Table'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

const gridTemplateColumns = '1fr 1fr 1fr minmax(auto, 125px) 1fr 1fr minmax(auto, 125px)';
const minWidth = '900px';



export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: ${gridTemplateColumns};
  place-content: center;
  height: 80px;
  min-width: ${minWidth};
  margin-bottom: 0px;
  border: none;

  > div {
    padding: 24px 10px;
    gap: 4px;
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
  grid-template-columns: ${gridTemplateColumns};
  place-content: center;
  min-width: ${minWidth};
  margin-top: 22px;
  > div {
    color: ${({ theme }) => theme.text9};
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
  }
`

export const ViewBtn = styled.a`
  color: #6666FF;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
`
