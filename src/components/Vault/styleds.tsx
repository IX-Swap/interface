import React from 'react'
import Column from 'components/Column'
import Row, { RowBetween, RowCenter, RowEnd, RowFixed } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { hexToRGBA } from 'utils/themeHelper'
import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Clock } from 'assets/images/clock.svg'
import { ReactComponent as Passed } from 'assets/images/passed.svg'
import { ActionHistoryStatus } from './enum'

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
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
  `};
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

export const RowAndDetailsWrapper = styled.div<{ showMore: boolean }>`
  border-radius: 8px;
  padding: 10px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  background: ${({ theme, showMore }) => (showMore ? hexToRGBA(theme.bg10, 0.05) : 'transparent')};
`
export const HistoryRowWraper = styled(RowBetween)`
  height: fit-content;
  align-items: center;
`

export const HistoryDetailsWrapper = styled(RowEnd)`
  height: 50px;
  justify-content: center;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`

export const HistoryRowElement = styled.div`
  gap: 10px;
`
export const ActionNameColumn = styled(Column)`
  width: 200px;
`
export const TransactionNameColumn = styled(Column)`
  width: 80px;
`
export const NameAndSumColumn = styled(RowBetween)`
  width: 200px;
`
export const SumColumn = styled(Column)`
  margin-left: 'auto';
  width: 160px;
  margin-right: 0;
`
export const StatusColumn = styled(Column)`
  width: 96px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`
export const IconColumn = styled(Column)`
  width: fit-content;
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`
export const DateColumn = styled(RowFixed)`
  width: fit-content;
  align-items: center;
`
export const DateDesktop = styled.span`
  display: block;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`
export const DateMobile = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`
export const ChevronColumn = styled(Column)``
export const Break = styled(Column)`
  padding-top: 35px;
  padding-bottom: 32px;
  padding-right: 13px;
`
export const TransparentWrapper = styled.div`
  padding-right: 13px;
  padding-bottom: 5px;
  padding-top: 20px;
  display: flex;
  align-items: center;
`
export const AccreditationButtonRow = styled.div`
  display: flex;
  margin-top: 42px;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: center;
    margin-top: 22px;
  `};
`
/* eslint-disable react/display-name */
export const StatusIcons = {
  [ActionHistoryStatus.PENDING]: () => <Clock />,
  [ActionHistoryStatus.APPROVED]: () => <Passed />,
  [ActionHistoryStatus.REJECTED]: () => <Attention />,
}
