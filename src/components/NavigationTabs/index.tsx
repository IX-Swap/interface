import React from 'react'
import { Trans } from '@lingui/macro'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import { Link as HistoryLink, NavLink } from 'react-router-dom'
import { Box } from 'rebass'
import { AppDispatch } from 'state'
import { resetMintState } from 'state/mint/actions'
import styled from 'styled-components/macro'
import { StyledPageHeader } from 'theme'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { RowStart } from '../Row'

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

export function FindPoolTabs({ origin }: { origin: string }) {
  return (
    <Tabs>
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
    </Tabs>
  )
}

export function AddRemoveTabs({
  adding,
  creating,
  positionID,
}: {
  adding: boolean
  creating: boolean
  positionID?: string | undefined
}) {
  // reset states on back
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Tabs>
      <StyledPageHeader>
        <RowStart style={{ padding: '0' }}>
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
      </StyledPageHeader>
    </Tabs>
  )
}
