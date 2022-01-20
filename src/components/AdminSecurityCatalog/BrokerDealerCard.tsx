import React, { FC } from 'react'
import { Box } from 'rebass'

import { TYPE } from 'theme'
import { CardHeader, EditButton, TokensList, TokensListItem } from './styleds'
import { StatusIcons } from 'components/Vault/styleds'
import { ActionHistoryStatus } from 'components/Vault/enum'

export interface BrokerDealerFakeProps {
  info: {
    logo: string
    name: string
    website: string
  }
  tokens: {
    symbol: string
    logo: string
    website: string
    isTradable: boolean
    isFeatured: boolean
  }[]
}

export const BrokerDealerCard: FC<BrokerDealerFakeProps> = ({ info, tokens }: BrokerDealerFakeProps) => {
  const { website, logo, name } = info

  return (
    <Box marginBottom="30px">
      <CardHeader>
        <TYPE.title6>{logo}</TYPE.title6>
        <TYPE.title6>{name}</TYPE.title6>
        <TYPE.descriptionThin>{website}</TYPE.descriptionThin>
        <EditButton color="white">Edit</EditButton>
      </CardHeader>

      <TokensList>
        {tokens.map(({ symbol, website, isTradable, isFeatured }, index) => (
          <TokensListItem key={`token-list-${index}`}>
            <TYPE.body3 color="white">{symbol}</TYPE.body3>
            <TYPE.body3 color="white">{website}</TYPE.body3>
            <div>
              {isTradable ? (
                <>
                  {StatusIcons[ActionHistoryStatus.SETTLED]()}
                  <TYPE.title6 marginLeft="10px" fontWeight={400} color="#9DF9B1">
                    Tradable
                  </TYPE.title6>
                </>
              ) : (
                <>
                  {StatusIcons[ActionHistoryStatus.NON_TRADABLE]()}
                  <TYPE.title6 marginLeft="10px" fontWeight={400} color="#EDCEFF">
                    Non Tradable
                  </TYPE.title6>
                </>
              )}
            </div>
            <TYPE.title6 fontWeight={400}>{isFeatured ? 'Featured' : '-'}</TYPE.title6>
          </TokensListItem>
        ))}
      </TokensList>
    </Box>
  )
}
