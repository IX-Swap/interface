import React from 'react'
import { Trans } from '@lingui/macro'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import { Link as HistoryLink, NavLink } from 'react-router-dom'
import { Box } from 'rebass'
import { AppDispatch } from 'state'
import { resetMintState } from 'state/mint/actions'
import styled from 'styled-components/macro'
import { CloseIcon, StyledPageHeader } from 'theme'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { RowBetween, RowStart, RowEnd } from '../Row'
import MitigationBadge from 'components/MitigationBadge'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`
const ManageHeaderRow = styled(RowBetween)`
  padding: 28px 38px 0 38px;
`
export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  return (
    <Tabs style={{ marginBottom: '20px', display: 'none', padding: '1rem 1rem 0 1rem' }}>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
        <Trans>Swap</Trans>
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
        <Trans>Pool</Trans>
      </StyledNavLink>
    </Tabs>
  )
}

export const PoolTabs = styled(Tabs)`
  padding: 26px 37px 0 37px;
  @media (max-width: 500px) {
    padding: 1rem 0.7rem;
  }
`

export function FindPoolTabs({ origin }: { origin: string }) {
  return (
    <PoolTabs>
      <StyledPageHeader>
        <RowStart style={{ padding: '0' }}>
          <HistoryLink to={origin}>
            <Box marginRight={'0.5rem'}>
              <ArrowLeft />
            </Box>
          </HistoryLink>
          <Trans>Import Pool</Trans>
        </RowStart>
      </StyledPageHeader>
    </PoolTabs>
  )
}
export function ManageTabs({ onClick, onDismiss }: { onClick: () => void; onDismiss: () => void }) {
  return (
    <Tabs>
      <StyledPageHeader>
        <ManageHeaderRow>
          <Box display="flex">
            <Box marginRight={'0.5rem'} style={{ cursor: 'pointer' }} onClick={onClick}>
              <ArrowLeft />
            </Box>
            <Trans>Manage tokens</Trans>
          </Box>

          <CloseIcon onClick={onDismiss} />
        </ManageHeaderRow>
      </StyledPageHeader>
    </Tabs>
  )
}
export function ImportListTabs({ onClick, onDismiss }: { onClick: () => void; onDismiss: () => void }) {
  return (
    <Tabs>
      <StyledPageHeader>
        <ManageHeaderRow>
          <Box display="flex">
            <Box marginRight={'0.5rem'} style={{ cursor: 'pointer' }} onClick={onClick}>
              <ArrowLeft />
            </Box>
            <Trans>Import List</Trans>
          </Box>

          <CloseIcon onClick={onDismiss} />
        </ManageHeaderRow>
      </StyledPageHeader>
    </Tabs>
  )
}
export function CustodianTabs() {
  const listMyTokenLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSenV66JwRp7MeHMm31EYLw-8VCHWfsyj8ji98l5Cqchpr2IyQ/viewform'

  return (
    <Tabs style={{ width: '100%' }}>
      <StyledPageHeader>
        <RowBetween>
          <RowStart style={{ padding: '0' }}>
            <Trans>Security Tokens</Trans>
          </RowStart>
          <RowEnd style={{ padding: '0' }}>
            <Trans>
              <a style={{ color: '#FFFFFF', textDecoration: 'underline' }} href={listMyTokenLink} target="blank">
                List My Token
              </a>
            </Trans>
          </RowEnd>
        </RowBetween>
      </StyledPageHeader>
    </Tabs>
  )
}
export function AddRemoveTabs({
  adding,
  creating,
  positionID,
  showBadge = false,
}: {
  adding: boolean
  creating: boolean
  positionID?: string | undefined
  showBadge?: boolean
}) {
  // reset states on back
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Tabs>
      <StyledPageHeader>
        <RowBetween style={{ padding: '0' }}>
          <RowStart>
            <HistoryLink
              to={'/pool' + (!!positionID ? `/${positionID.toString()}` : '')}
              onClick={() => {
                if (adding) {
                  dispatch(resetMintState())
                }
              }}
            >
              <Box marginRight={'0.5rem'}>
                <ArrowLeft />
              </Box>
            </HistoryLink>

            {creating ? (
              <Trans>Create a pair</Trans>
            ) : adding ? (
              <Trans>Add Liquidity</Trans>
            ) : (
              <Trans>Remove Liquidity</Trans>
            )}
          </RowStart>
          {showBadge && <MitigationBadge />}
        </RowBetween>
      </StyledPageHeader>
    </Tabs>
  )
}
