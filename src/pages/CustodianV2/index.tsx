import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import { useCookies } from 'react-cookie'

import { TYPE } from 'theme'
import { FeaturedToken } from './FeaturedToken'
import { SecTokensTable } from './SecTokensTable'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { getMyTokens, useFetchTokens, useSecCatalogState } from 'state/secCatalog/hooks'
import { MySecToken } from './MySecToken'
import { NotAvailablePage } from 'components/NotAvailablePage'

import {
  StyledBodyWrapper,
  FeaturedTokensGrid,
  MySecTokensTab,
  GradientText,
  MySecTokensGrid,
  Divider,
} from './styleds'
import { Info } from './Info'
import { useUserState } from 'state/user/hooks'

export default function CustodianV2() {
  const offset = 10
  const { token } = useAuthState()
  const [mySecTokens, setMySecTokens] = useState([])
  const [cookies] = useCookies(['annoucementsSeen'])
  const fetchTokens = useFetchTokens()
  const [noFilteredTokens, setNoFilteredTokens] = useState([])
  const { tokens } = useSecCatalogState()
  const { account, chainId } = useActiveWeb3React()
  const { account: userAccount } = useUserState()

  const blurred = !chainId || !TGE_CHAINS_WITH_SWAP.includes(chainId)
  const isLoggedIn = !!token && !!account

  useEffect(() => {
    const fetchMyTokens = async () => {
      const data = await getMyTokens({ active: true, my: true, offset: 100000 })
      setMySecTokens(data?.items.length > 0 ? data.items : [])
    }
    if (isLoggedIn) {
      fetchMyTokens()
      setNoFilteredTokens([])
    }
  }, [userAccount, isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      fetchTokens({ page: 1, offset, search: '' })
    }
  }, [fetchTokens, isLoggedIn, userAccount])

  useEffect(() => {
    if (noFilteredTokens.length === 0 && tokens) {
      setNoFilteredTokens(tokens.items.filter(({ active }: any) => active))
    }
  }, [tokens])

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

  if (!isLoggedIn) return <NotAvailablePage />

  return blurred ? (
    <AppBody blurred>
      <Trans>Security Tokens</Trans>
    </AppBody>
  ) : (
    <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
      <TYPE.title4 marginBottom="16px">
        <Trans>Security tokens</Trans>
      </TYPE.title4>
      <Info />
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
