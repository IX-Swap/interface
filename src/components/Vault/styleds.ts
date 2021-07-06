import Column from 'components/Column'
import Row, { RowBetween, RowCenter, RowEnd } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { hexToRGBA } from 'utils/themeHelper'

export const NotSubmittedWrapper = styled.div`
  background: ${({ theme }) => theme.bgG10};
  border-radius: 45px;
  padding: 2rem 14px 3rem;
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 45px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    padding: 2px;
    background: ${({ theme }) => theme.borderG1};
  }
`
export const ExistingWrapper = styled.div`
  background: ${({ theme }) => theme.bgG11};
  border-radius: 45px;
  padding: 62px 56px 36px 56px;
`
export const NotSubmittedTitle = styled.span`
  text-transform: uppercase;
  text-align: center;
`
export const ExistingTitle = styled.span`
  text-align: left;
`
export const NotSubmittedDescription = styled.span`
  text-align: center;
`

export const ButtonRow = styled(RowCenter)`
  gap: 26px;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 3rem;
`

export const TitleStatusRow = styled(RowBetween)`
  margin-bottom: 2rem;
  flex-wrap: wrap;
`
export const StatusTitle = styled(TYPE.titleSmall)`
  text-transform: uppercase;
`

export const HistoryWrapper = styled.div``

export const RowAndDetailsWrapper = styled(Column)<{ showMore: boolean }>`
  padding-right: 13px;
  background: ${({ theme, showMore }) => (showMore ? hexToRGBA(theme.bg10, 0.05) : 'transparent')};
`
export const HistoryRowWraper = styled(RowBetween)``

export const HistoryDetailsWrapper = styled(RowEnd)`
  height: 50px;
  align-items: center;
`

export const HistoryRowElement = styled.div`
  gap: 10px;
`
export const ActionNameColumn = styled(Column)`
  width: 10vw;
`
export const TransactionNameColumn = styled(Column)`
  width: 80px;
`
export const NameAndSumnColumn = styled(RowBetween)`
  width: 15vw;
`
export const SumColumn = styled(Column)`
  margin-left: 'auto';
  margin-right: 0;
`
export const StatusColumn = styled(Column)`
  width: 96px;
`
export const DateColumn = styled(Row)`
  width: 150px;
`
export const ChevronColumn = styled(Column)``
