import styled from 'styled-components/macro'
import { Box } from 'rebass/styled-components'

export const Row = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const RowBetween = styled(Row)`
  justify-content: space-between;
`
export const RowStart = styled(Row)`
  justify-content: flex-start;
`
export const RowEnd = styled(Row)`
  justify-content: flex-end;
`
export const RowCenter = styled(Row)`
  justify-content: center;
`
export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`
export const ButtonRow = styled(RowBetween)`
  grid-gap: 1.5rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      // flex-direction: column;
      grid-gap: 1rem;
      font-size: 14px;
      padding: 10px;
  `};
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export default Row
