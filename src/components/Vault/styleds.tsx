import { ReactComponent as Attention } from 'assets/images/attention.svg'
import { ReactComponent as Passed } from 'assets/images/check-success.svg'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowBetween, RowCenter } from 'components/Row'
import React from 'react'
import styled from 'styled-components'
import { gradientBorder, TYPE } from 'theme'
import { ActionHistoryStatus, ActionTypes } from './enum'

export const NotSubmittedWrapper = styled.div`
  background: ${({ theme }) => theme.bgG10};
  border-radius: 45px;
  padding: 2rem 14px 3rem;
  position: relative;
  ${gradientBorder}
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
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
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

export const HistoryRowWraper = styled.tr`
  height: 30px;
  cursor: pointer;
  :hover,
  :active {
    padding: 1px;
    background: ${({ theme }) => theme.bgG2};
  }
`

export const HistoryHeaderWrapper = styled.thead`
  text-align: left;
  height: 30px;
`

export const StyledTableCell = styled.td`
  display: flex;
`

export const IconColumn = styled.span`
  width: fit-content;
`

export const Break = styled(Column)`
  padding-top: 35px;
  padding-bottom: 32px;
  padding-right: 13px;
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

export const ModalPadding = styled.div`
  padding: 37px 40px 19px 40px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 1rem;
  `};
`

/* eslint-disable react/display-name */
export const StatusIcons = {
  [ActionHistoryStatus.PENDING]: () => <LoaderThin size={20} />,
  [ActionHistoryStatus.SETTLED]: () => <Passed />,
  [ActionHistoryStatus.APPROVED]: () => <Passed />,
  [ActionHistoryStatus.REJECTED]: () => <Attention />,
  [ActionHistoryStatus.FAILED]: () => <Attention />,
  [ActionHistoryStatus.REQUESTED]: () => <LoaderThin size={20} />,
  [ActionHistoryStatus.CANCELLED]: () => <Attention />,
  [ActionHistoryStatus.PROCESSING]: () => <LoaderThin size={20} />,
}

export const getStatusIcon = (action = ActionTypes.DEPOSIT, status: ActionHistoryStatus) => {
  if (action === ActionTypes.DEPOSIT && status === ActionHistoryStatus.APPROVED) {
    return StatusIcons[ActionHistoryStatus.PENDING]
  }
  return StatusIcons[status]
}
