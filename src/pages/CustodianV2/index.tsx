import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import { isMobile } from 'react-device-detect'
import { t, Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import { ExternalLink, TYPE } from 'theme'
import { StyledButtonGradientBorder } from 'components/AdminSecurityCatalog/styleds'
import { FeaturedToken } from './FeaturedToken'
import { SecTokensTable } from './SecTokensTable'
import { LOGIN_STATUS, useAuthState, useLogin } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { getMyTokens, useFetchTokens, useSecCatalogState } from 'state/secCatalog/hooks'
import { MySecToken } from './MySecToken'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useShowError } from 'state/application/hooks'

import { ReactComponent as ArrowDown } from '../../assets/images/arrow-sec-tokens.svg'
import {
  StyledBodyWrapper,
  FeaturedTokensGrid,
  StyledArrowWrapper,
  MySecTokensTab,
  GradientText,
  MySecTokensGrid,
  Divider,
} from './styleds'

export default function CustodianV2() {
  const offset = 10
  const docLink = 'https://docs.google.com/forms/d/e/1FAIpQLSenV66JwRp7MeHMm31EYLw-8VCHWfsyj8ji98l5Cqchpr2IyQ/viewform'
  const { token } = useAuthState()
  const [mySecTokens, setMySecTokens] = useState([])
  const fetchTokens = useFetchTokens()
  const [noFilteredTokens, setNoFilteredTokens] = useState([])
  const { tokens } = useSecCatalogState()
  const { account, chainId } = useActiveWeb3React()
  const [pending, setPending] = useState(false)
  const [isLogged, setAuthState] = useState(false)
  const login = useLogin({ mustHavePreviousLogin: false })
  const history = useHistory()
  const showError = useShowError()
  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)
  const isLoggedIn = !!token && !!account

  useEffect(() => {
    const fetchMyTokens = async () => {
      const data = await getMyTokens({ active: true, my: true, offset: 100000 })
      setMySecTokens(data?.items.length > 0 ? data.items : [])
    }

    fetchMyTokens()
  }, [account, isLoggedIn])

  useEffect(() => {
    fetchTokens({ page: 1, offset, search: '' })
  }, [fetchTokens])

  useEffect(() => {
    if (noFilteredTokens.length === 0 && tokens) {
      setNoFilteredTokens(tokens.items.filter(({ active }: any) => active))
    }
  }, [tokens])

  const checkAuthorization = useCallback(async () => {
    setPending(true)
    const status = await login()

    if (status !== LOGIN_STATUS.SUCCESS) {
      showError(t`You need to login to see this page. Please try again`)
      history.push('/swap')
    }

    setAuthState(true)
    setPending(false)
  }, [login, setAuthState, history, showError])

  useEffect(() => {
    if (!isLoggedIn && !pending) {
      const timerFunc = setTimeout(checkAuthorization, 3000)

      return () => clearTimeout(timerFunc)
    }
  }, [isLoggedIn, checkAuthorization])

  const activeTokens = tokens ? tokens.items.filter(({ active }: any) => active) : []
  const featuredTokens = noFilteredTokens.filter(({ featured }: any) => featured)
  const approvedSecTokens = mySecTokens
    ? mySecTokens.filter(
        ({ token }: any) =>
          token.accreditationRequests?.length > 0 && token.accreditationRequests[0]?.status === 'approved'
      )
    : []
  const pendingSecTokens = mySecTokens
    ? mySecTokens.filter(
        ({ token }: any) =>
          token.accreditationRequests?.length > 0 && token.accreditationRequests[0].status !== 'approved'
      )
    : []

  if (!isLoggedIn) return <NFTConnectWallet />

  return blurred ? (
    <AppBody blurred>
      <Trans>Security Tokens</Trans>
    </AppBody>
  ) : (
    <StyledBodyWrapper>
      <Flex
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent="space-between"
        marginBottom="76px"
      >
        <TYPE.title4 marginBottom="16px">
          <Trans>Security tokens</Trans>
        </TYPE.title4>
        <ExternalLink style={{ textDecoration: 'none' }} href={docLink}>
          <StyledButtonGradientBorder>
            <Flex alignItems="center" justifyContent="center">
              <TYPE.body4 marginRight="8px" lineHeight="20px">
                <Trans>List my token</Trans>
              </TYPE.body4>
              <StyledArrowWrapper data-testid="listMyToken" clickable>
                <ArrowDown />
              </StyledArrowWrapper>
            </Flex>
          </StyledButtonGradientBorder>
        </ExternalLink>
      </Flex>

      {tokens && (
        <>
          {mySecTokens?.length > 0 && (
            <MySecTokensTab marginBottom="72px">
              <GradientText>
                <TYPE.title5 marginBottom="32px" color="inherit">
                  <Trans>My security tokens</Trans>
                </TYPE.title5>
              </GradientText>
              {approvedSecTokens.length > 0 && (
                <>
                  <TYPE.title6 marginBottom="32px" color="rgba(237, 206, 255, 0.5)">
                    <Trans>ACCREDITED</Trans>
                  </TYPE.title6>
                  <MySecTokensGrid>
                    {approvedSecTokens.map((token: any) => (
                      <MySecToken key={`my-sec-${token.id}`} token={token} />
                    ))}
                  </MySecTokensGrid>
                </>
              )}
              {pendingSecTokens.length > 0 && (
                <>
                  <Divider />
                  <TYPE.title6 marginBottom="32px" color="rgba(237, 206, 255, 0.5)">
                    <Trans>PENDING ACCREDITATION</Trans>
                  </TYPE.title6>
                  <MySecTokensGrid>
                    {pendingSecTokens.map((token: any) => (
                      <MySecToken key={`pending-${token.id}`} token={token} />
                    ))}
                  </MySecTokensGrid>
                </>
              )}
            </MySecTokensTab>
          )}
          {featuredTokens?.length > 0 && (
            <Box marginBottom="72px">
              <TYPE.title5 marginBottom="32px">
                <Trans>Featured</Trans>
              </TYPE.title5>
              <FeaturedTokensGrid>
                {featuredTokens.map((token: any) => (
                  <FeaturedToken token={token} key={`featured-${token.id}`} />
                ))}
              </FeaturedTokensGrid>
            </Box>
          )}
          <SecTokensTable
            page={tokens.page}
            totalPages={tokens.totalPages}
            totalItems={tokens.totalItems}
            tokens={activeTokens}
            offset={offset}
          />
        </>
      )}
    </StyledBodyWrapper>
  )
}
