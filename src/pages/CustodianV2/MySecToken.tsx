import React, { FC, useMemo } from 'react'
import { Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { Status } from './Status'
import CurrencyLogo from 'components/CurrencyLogo'
import { MySecTokenCard } from './styleds'
import { routes } from 'utils/routes'
import { NETWORK_LOGOS } from 'constants/chains'
import { DepositView, setWalletState } from 'state/wallet'

interface Props {
  token: any
  loading: boolean
}

export const MySecToken: FC<Props> = ({ token }: Props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const wrappedToken = token?.token
  const network = token?.token?.network
  const balance = token?.token?.balance
  const networkLogo = network ? NETWORK_LOGOS[network] : ''

  const status = useMemo(() => {
    const statuses = [
      wrappedToken.accreditationRequest?.brokerDealerStatus,
      wrappedToken.accreditationRequest?.custodianStatus,
    ]

    if (statuses.every((status) => status === 'approved')) {
      return 'approved'
    }

    if (statuses.some((status) => status === 'pending')) {
      return 'pending'
    }

    if (statuses.some((status) => status === 'declined')) {
      return 'declined'
    }

    if (statuses.some((status) => status === 'faild')) {
      return 'faild'
    }

    return 'pending'
  }, [wrappedToken])

  const gotoTokenDetail = () => {
    history.push(routes.securityToken(token.id))
    dispatch(setWalletState({ isOpenDepositCard: false, depositView: DepositView.CREATE_REQUEST }))
  }

  return (
    <MySecTokenCard isPending={status !== 'approved'} onClick={gotoTokenDetail}>
      <Flex flexDirection={'row'} justifyContent="space-between" alignItems="center">
        <div style={{ justifyContent: 'space-between', position: 'relative' }}>
          {token.logo ? (
            <img style={{ marginRight: 16, borderRadius: 24 }} width="46px" height="46px" src={token.logo.public} />
          ) : (
            <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16, minWidth: 46 }} />
          )}

          {networkLogo ? (
            <LogoWrap>
              <NetworkLogo src={networkLogo} alt="network logo" />
            </LogoWrap>
          ) : null}
        </div>
        <div style={{ display: 'block', textAlign: 'right' }}>
          <TYPE.title11>{token.ticker}</TYPE.title11>
          <TYPE.small fontWeight={600}>{wrappedToken.name}</TYPE.small>
          <Status status={status} amount={balance} decimals={token.token.decimals ?? 18} />
        </div>
      </Flex>
    </MySecTokenCard>
  )
}

const LogoWrap = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
`

const NetworkLogo = styled.img`
  height: 16px;
  width: 16px;
`
