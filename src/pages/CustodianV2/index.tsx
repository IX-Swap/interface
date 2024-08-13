import React, { useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import _get from 'lodash/get'

import { TYPE } from 'theme'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { getMyTokens, useFetchTokens, useSecCatalogState } from 'state/secCatalog/hooks'
import { useUserState } from 'state/user/hooks'

import { FeaturedToken } from './FeaturedToken'
import { SecTokensTable } from './SecTokensTable'
import { FeaturedTokensGrid, MySecTokensTab, Divider, StyledBodyWrapper } from './styleds'
import { isMobile } from 'react-device-detect'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import EmptyData from './EmptyData'
import SecTokenSection from './SecTokenSection'
import { LoaderThin } from 'components/Loader/LoaderThin'

const checkPendingAccreditationRequest = (accreditationRequest: any) =>
  accreditationRequest?.brokerDealerStatus !== 'approved' || accreditationRequest?.custodianStatus !== 'approved'
const checkApprovedAccreditationRequest = (accreditationRequest: any) =>
  accreditationRequest?.brokerDealerStatus === 'approved' && accreditationRequest?.custodianStatus === 'approved'

export default function CustodianV2() {
  const { token } = useAuthState()
  const fetchTokens = useFetchTokens()
  const { tokens, loadingRequest } = useSecCatalogState()
  const { account } = useActiveWeb3React()
  const { account: userAccount } = useUserState()
  const { config } = useWhitelabelState()

  const [mySecTokens, setMySecTokens] = useState([])
  const [noFilteredTokens, setNoFilteredTokens] = useState([])
  const [loading, setLoading] = useState(false)

  const isIxswap = config?.isIxSwap ?? false
  const enableFeaturedSecurityVaults = _get(config, 'enableFeaturedSecurityVaults', false)
  const configTokens = config?.tokens || []
  const isLoggedIn = !!token && !!account
  const offset = 10
  const activeTokens = tokens ? tokens.items.filter(({ active }: any) => active) : []
  const featuredTokens = noFilteredTokens.filter(({ featured }: any) => featured)
  let featuredTokensFinal = featuredTokens
  if (!isIxswap) {
    featuredTokensFinal = featuredTokens.filter(({ token }: any) => configTokens.includes(token?.id))
  }
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

  const fetchMyTokens = async () => {
    try {
      setLoading(true)
      const data = await getMyTokens({ active: true, my: true, offset: 100000 })
      setMySecTokens(data?.items.length > 0 ? data.items : [])
    } catch (error: any) {
      console.error('Error fetching my tokens', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
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

  return (
    <>
      <MySecTokensTab marginTop= '24px' marginBottom="72px">
        <TYPE.title5 marginBottom="32px">
          <Trans>My RWAs</Trans>
        </TYPE.title5>

        {loading ? (
          <Flex justifyContent="center" my={64}>
            <LoaderThin size={64} />
          </Flex>
        ) : (
          <>
            {approvedSecTokens?.length > 0 ? (
              <SecTokenSection secTokens={approvedSecTokens} keyName="my-sec" title="Accredited" />
            ) : (
              <EmptyData title="No RWAs" desc="You have no RWAs at the moment" />
            )}
            {pendingSecTokens?.length > 0 && (
              <>
                <Divider style={{ marginTop: '50px', marginBottom: '40px' }} />
                <SecTokenSection secTokens={pendingSecTokens} keyName="pending-sec" title="Pending Accreditation" />
              </>
            )}
          </>
        )}
      </MySecTokensTab>

      <StyledBodyWrapper>
        <Box marginBottom="72px">
          <TYPE.title5 marginBottom="32px">
            <Trans>Featured</Trans>
          </TYPE.title5>

          {loadingRequest ? (
            <Flex justifyContent="center" my={64}>
              <LoaderThin size={64} />
            </Flex>
          ) : (
            <>
              {isIxswap || enableFeaturedSecurityVaults ? (
                <>
                  {featuredTokensFinal?.length > 0 ? (
                    <FeaturedTokensGrid>
                      {featuredTokensFinal?.map((token: any) => (
                        <FeaturedToken token={token} key={`featured-${token?.id}`} />
                      ))}
                    </FeaturedTokensGrid>
                  ) : (
                    <EmptyData title="No Featured Tokens" desc="You have no Featured Tokens at the moment" />
                  )}
                </>
              ) : (
                <EmptyData title="No Featured Tokens" desc="You have no Featured Tokens at the moment" />
              )}
            </>
          )}
        </Box>
      </StyledBodyWrapper>

      {isIxswap ? (
        <SecTokensTable
          page={tokens?.page}
          totalPages={tokens?.totalPages}
          totalItems={tokens?.totalItems}
          tokens={activeTokens}
          offset={offset}
          enableFeaturedSecurityVaults={enableFeaturedSecurityVaults}
        />
      ) : null}
    </>
  )
}
