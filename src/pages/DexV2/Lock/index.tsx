import React, { useEffect } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import { Address } from 'viem'

import VerticleSteps from './components/VerticleSteps'
import LockContent from './components/LockContent'
import config from 'lib/config'
import { useWeb3React } from 'hooks/useWeb3React'
import { useDispatch } from 'react-redux'
import { useTokensState } from 'state/dexV2/tokens/hooks'
import { fetchTokensAllowwances } from 'state/dexV2/tokens'
import { TYPE } from 'theme'
import { LockProvider } from './LockProvider'

const Lock: React.FC = () => {
  const { chainId, account } = useWeb3React()
  
  const dispatch = useDispatch()
  const { tokens } = useTokensState()
  const networkConfig = config[chainId]

  useEffect(() => {
    const accountAddress = account as Address
    dispatch(
      fetchTokensAllowwances({
        tokens,
        account: accountAddress,
        contractAddress: networkConfig.addresses.vault,
      })
    )
  }, [])

  return (
    <LockProvider>
      <WidthFull>
        <LayoutContainer>
          <LeftContent>
            <VerticleSteps />
          </LeftContent>
          <CenterContent>
            <Card>
              <TYPE.label>Lock</TYPE.label>

              <LockContent />
            </Card>
          </CenterContent>
          <RightContent></RightContent>
        </LayoutContainer>
      </WidthFull>
    </LockProvider>
  )
}

export default Lock

const WidthFull = styled.div`
  width: 100%;
`

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  row-gap: 2rem;
  column-gap: 0px;
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding-left: 0px;
  padding-right: 0px;

  @media (min-width: 640px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    column-gap: 2rem;
    margin-top: 146px;
  }
`

const LeftContent = styled.div`
  grid-column: span 2 / span 2;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`

const CenterContent = styled.div`
  grid-column: span 3 / span 3;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (min-width: 640px) {
    max-width: 36rem;
  }

  @media (min-width: 1024px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`

const RightContent = styled.div`
  grid-column: span 2 / span 2;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`

const Card = styled.div`
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 30px 48px 0px rgba(63, 63, 132, 0.05);
  padding: 24px;

  @media (min-width: 640px) {
    padding: 32px;
  }

  @media (min-width: 1024px) {
    padding: 48px;
  }
`
