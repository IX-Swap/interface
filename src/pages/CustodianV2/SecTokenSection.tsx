import React, { useEffect, useState } from 'react'
import { TYPE } from 'theme'
import { Trans } from '@lingui/macro'
import { useWeb3React } from 'hooks/useWeb3React'

import apiService from 'services/apiService'
import { MySecTokensGrid } from './styleds'
import { MySecToken } from './MySecToken'
import { tokens as tokenUrl } from 'services/apiUrls'

interface SecTokenSectionProps {
  secTokens: any[]
  keyName: string
  title: string
}

const SecTokenSection: React.FC<SecTokenSectionProps> = ({ secTokens, keyName, title }) => {
  const { account } = useWeb3React()
  const [tokens, setTokens] = useState<any[]>(secTokens)
  const [loading, setLoading] = useState(false)

  const getBalance = async () => {
    try {
      setLoading(true)
      const payload = {
        address: account,
        tokens: tokens.map((token) => {
          return { address: token?.token?.address, chainId: token?.token?.chainId }
        }),
      }
      const { status, data } = await apiService.post(tokenUrl.getERC20Balances, payload)

      if (status === 201) {
        const newTokens = tokens.map((token) => {
          const chainId = token?.token?.chainId
          const address = token?.token?.address

          const balance = data[chainId][address]
          return { ...token, token: { ...token?.token, balance } }
        })

        setTokens(newTokens)
      }
    } catch (error) {
      console.error('Error getting balance', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account) {
      getBalance()
    }
  }, [account])

  return (
    <>
      <TYPE.title6 fontSize={'13px'} marginBottom="32px">
        <Trans>{title}</Trans>
      </TYPE.title6>
      <MySecTokensGrid>
        {tokens?.map((token: any) => (
          <MySecToken key={`${keyName}-${token?.id}`} token={token} loading={loading} />
        ))}
      </MySecTokensGrid>
    </>
  )
}

export default SecTokenSection
