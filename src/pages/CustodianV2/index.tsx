import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import _get from 'lodash/get'

import { TYPE } from 'theme'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { getMyTokens, useFetchTokens, useSecCatalogState } from 'state/secCatalog/hooks'
import { useUserState } from 'state/user/hooks'

import { FeaturedToken } from './FeaturedToken'
import { SecTokensTable } from './SecTokensTable'
import { MySecToken } from './MySecToken'
import { FeaturedTokensGrid, MySecTokensTab, MySecTokensGrid, Divider } from './styleds'
import { isMobile } from 'react-device-detect'
import { useWhitelabelState } from 'state/whitelabel/hooks'

const checkPendingAccreditationRequest = (accreditationRequest: any) =>
  accreditationRequest?.brokerDealerStatus !== 'approved' || accreditationRequest?.custodianStatus !== 'approved'
const checkApprovedAccreditationRequest = (accreditationRequest: any) =>
  accreditationRequest?.brokerDealerStatus === 'approved' && accreditationRequest?.custodianStatus === 'approved'

export default function CustodianV2() {
  const { token } = useAuthState()
  const fetchTokens = useFetchTokens()
  const { tokens } = useSecCatalogState()
  const { account } = useActiveWeb3React()
  const { account: userAccount } = useUserState()
  const { config } = useWhitelabelState()
  const isIxswap = config?.isIxSwap ?? false
  const enableFeaturedSecurityVaults = _get(config, 'enableFeaturedSecurityVaults', false)
  const configTokens = config?.tokens || []

  const [mySecTokens, setMySecTokens] = useState([])
  const [noFilteredTokens, setNoFilteredTokens] = useState([])

  const isLoggedIn = !!token && !!account
  const offset = 10

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

  const approvedSecFilterCondition = ({ token: { accreditationRequest, id } }: any) =>
    isIxswap
      ? checkApprovedAccreditationRequest(accreditationRequest)
      : configTokens.includes(id) && checkApprovedAccreditationRequest(accreditationRequest)

  const pendingSecFilterCondition = ({ token: { accreditationRequest, id } }: any) =>
    isIxswap
      ? checkPendingAccreditationRequest(accreditationRequest)
      : configTokens.includes(id) && checkPendingAccreditationRequest(accreditationRequest)

  const approvedSecTokens = mySecTokens ? mySecTokens.filter(approvedSecFilterCondition) : []
  const pendingSecTokens = mySecTokens ? mySecTokens.filter(pendingSecFilterCondition) : []

  return (
    <>
      <TYPE.title4
        marginTop={isMobile ? '70px' : ''}
        fontSize={isMobile ? '24px' : '40px'}
        marginLeft={isMobile ? '30px' : ''}
        marginBottom="30px"
        data-testid="securityTokensTitle"
      >
        <Trans>Security tokens</Trans>
      </TYPE.title4>
      {/* <Info /> */}
      {tokens && (
        <>
          {mySecTokens?.length > 0 && (
            <MySecTokensTab marginBottom="72px">
              {/* <GradientText> */}
              <TYPE.title5 marginBottom="32px">
                <Trans>My security tokens</Trans>
              </TYPE.title5>
              {/* </GradientText> */}
              {approvedSecTokens.length > 0 && (
                <>
                  <TYPE.title6 fontSize={'13px'} marginBottom="32px">
                    <Trans>Accredited</Trans>
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
                  <Divider style={{ marginTop: '50px', marginBottom: '40px' }} />
                  <TYPE.title6 fontSize={'13px'} marginBottom="32px">
                    <Trans>Pending Accreditations</Trans>
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
          {(isIxswap || enableFeaturedSecurityVaults) && featuredTokens?.length > 0 ? (
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
          ) : null}
          <SecTokensTable
            page={tokens.page}
            totalPages={tokens.totalPages}
            totalItems={tokens.totalItems}
            tokens={activeTokens}
            offset={offset}
          />
        </>
      )}
    </>
  )
}
