import React, { useEffect, useRef, useState } from 'react'
import { Box } from 'rebass'
import { FixedSizeList } from 'react-window'

import { RowBetween } from 'components/Row'
import { TYPE } from 'theme'
import { StyledButtonGradientBorder } from 'components/AdminSecurityCatalog/styleds'
import { FeaturedToken } from './FeaturedToken'
import { SecTokensTable } from './SecTokensTable'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { getAllTokens } from 'state/secCatalog/hooks'

import { StyledBodyWrapper, FeaturedTokensGrid } from './styleds'

export default function CustodianV2() {
  const { token } = useAuthState()
  const { account, chainId } = useActiveWeb3React()
  const isLoggedIn = !!token && !!account
  const listRef = useRef<FixedSizeList>()
  const [tokens, setTokens] = useState([])
  const { filteredSortedTokens } = useCurrencySearch({
    listRef,
    list: ListType.USER_TOKENS,
  })
  const approvedSecTokens = filteredSortedTokens.filter(
    ({ tokenInfo }: any) => tokenInfo.accreditationRequest.status === 'approved'
  )
  const pendingSecTokens = filteredSortedTokens.filter(
    ({ tokenInfo }: any) =>
      tokenInfo.accreditationRequest.status !== 'undefined' && tokenInfo.accreditationRequest.status !== 'approved'
  )

  useEffect(() => {
    const getTokens = async () => {
      const result = await getAllTokens()
      setTokens(result)
    }

    getTokens()
  }, [])

  const featuredTokens = tokens.filter(({ feautured, active }) => active && feautured)
  const activeTokens = tokens.filter(({ active }) => active)

  return chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId) ? (
    <AppBody blurred>Security Tokens</AppBody>
  ) : (
    <StyledBodyWrapper>
      <RowBetween marginBottom="76px">
        <TYPE.title4>Security tokens</TYPE.title4>
        <StyledButtonGradientBorder>List my token</StyledButtonGradientBorder>
      </RowBetween>

      {isLoggedIn && (approvedSecTokens?.length > 0 || pendingSecTokens?.length > 0) && (
        <>
          {/* <MySecTokensTab marginBottom="72px">
            <GradientText>
              <TYPE.title5 marginBottom="32px" color="inherit">
                My security tokens
              </TYPE.title5>
            </GradientText>
            {approvedSecTokens?.length > 0 && (
              <>
                <TYPE.title6 marginBottom="32px" color="rgba(237, 206, 255, 0.5)">
                  ACCREDITED
                </TYPE.title6>
                <MySecTokensGrid>
                  {approvedSecTokens.map((token) => (
                    <MySecToken key={`my-sec-${(token as any).tokenInfo.id}`} token={token} />
                  ))}
                </MySecTokensGrid>
              </>
            )}
            {pendingSecTokens?.length > 0 && (
              <>
                <Divider />
                <TYPE.title6 marginBottom="32px" color="rgba(237, 206, 255, 0.5)">
                  PENDING ACCREDITATION
                </TYPE.title6>
                <MySecTokensGrid>
                  {pendingSecTokens.map((token) => (
                    <MySecToken key={`pending-${(token as any)?.tokenInfo.id}`} token={token} />
                  ))}
                </MySecTokensGrid>
              </>
            )}
          </MySecTokensTab> */}
          {featuredTokens?.length > 0 && (
            <Box marginBottom="72px">
              <TYPE.title5 marginBottom="32px">Featured</TYPE.title5>
              <FeaturedTokensGrid>
                {featuredTokens.map((token: any) => (
                  <FeaturedToken token={token} key={`featured-${token.id}`} />
                ))}
              </FeaturedTokensGrid>
            </Box>
          )}
          <SecTokensTable tokens={activeTokens} />
        </>
      )}
    </StyledBodyWrapper>
  )
}
