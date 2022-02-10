import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex } from 'rebass'
import { FixedSizeList } from 'react-window'
import { isMobile } from 'react-device-detect'
import { Trans } from '@lingui/macro'

import { ExternalLink, TYPE } from 'theme'
import { StyledButtonGradientBorder } from 'components/AdminSecurityCatalog/styleds'
import { FeaturedToken } from './FeaturedToken'
import { SecTokensTable } from './SecTokensTable'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import useTheme from 'hooks/useTheme'
import { getAllTokens } from 'state/secCatalog/hooks'

import { ReactComponent as ArrowDown } from '../../assets/images/arrow-sec-tokens.svg'
import { StyledBodyWrapper, FeaturedTokensGrid, StyledArrowWrapper } from './styleds'

export default function CustodianV2() {
  const docLink = 'https://docs.google.com/forms/d/e/1FAIpQLSenV66JwRp7MeHMm31EYLw-8VCHWfsyj8ji98l5Cqchpr2IyQ/viewform'
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
      setTokens(result.items || result)
    }

    getTokens()
  }, [])

  const featuredTokens = tokens.filter(({ featured, active }) => active && featured)
  const activeTokens = tokens.filter(({ active }) => active)

  return chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId) ? (
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

      {isLoggedIn && (approvedSecTokens?.length > 0 || pendingSecTokens?.length > 0) && (
        <>
          {/* <MySecTokensTab marginBottom="72px">
            <GradientText>
              <TYPE.title5 marginBottom="32px" color="inherit">
                <Trans>My security tokens</Trans>
              </TYPE.title5>
            </GradientText>
            {approvedSecTokens?.length > 0 && (
              <>
                <TYPE.title6 marginBottom="32px" color="rgba(237, 206, 255, 0.5)">
                  <Trans>ACCREDITED</Trans>
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
                  <Trans>PENDING ACCREDITATION</Trans>
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
          <SecTokensTable tokens={activeTokens} />
        </>
      )}
    </StyledBodyWrapper>
  )
}
