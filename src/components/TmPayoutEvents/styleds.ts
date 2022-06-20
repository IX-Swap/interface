import styled, { css } from 'styled-components'

import { BodyRow, HeaderRow } from 'components/Table'
import { Colors } from 'theme/styled'
import { ButtonIXSGradient } from 'components/Button'

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
  grid-template-columns: 75px 125px repeat(6, 1fr);
  height: 80px;
  min-width: 1150px;
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
  grid-template-columns: 75px 125px repeat(6, 1fr);
  min-width: 1150px;
  width: 100%;
  margin-top: 22px;
  > div {
    color: ${({ theme }) => theme.text9};
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
  }
`

export const StatusContainer = styled.div<{ color: keyof Colors | 'transparent' }>`
  width: 100%;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 12px;
  background-color: ${({ theme, color }) => (color === 'transparent' ? 'transparent' : theme[color])};
  border-radius: 40px;
  ${({ color }) =>
    color === 'transparent' &&
    css`
      color: ${({ theme }) => theme.text2};
      border: ${({ theme }) => `1px solid ${theme.text2}`};
    `};
  ${({ color }) =>
    color === 'yellow4' &&
    css`
      color: ${({ theme }) => theme.bg1};
    `};
`
export const CreateButton = styled(ButtonIXSGradient)`
  min-height: 52px;
  height: 52px;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
`
