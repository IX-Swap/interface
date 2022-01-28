import React, { FC } from 'react'
import { Box } from 'rebass'

import { TYPE } from 'theme'
import { ActionHistoryStatus } from 'components/Vault/enum'

import { CardHeader, EditButton, TokensList, TokensListItem } from './styleds'
import { StatusIcons } from 'components/Vault/styleds'

export interface BrokerDealerFakeProps {
  issuer: any
  handleEditClick: (editIssuer: any) => void
}

export const BrokerDealerCard: FC<BrokerDealerFakeProps> = ({ issuer, handleEditClick }: BrokerDealerFakeProps) => {
  const { url, logo, name, tokens } = issuer

  return (
    <Box marginBottom="30px">
      <CardHeader>
        <Box>
          <img style={{ objectFit: 'cover' }} width="75px" height="20px" src={logo.public} />
        </Box>
        <TYPE.title6>{name}</TYPE.title6>
        <TYPE.descriptionThin style={{ overflow: 'visible' }}>{url}</TYPE.descriptionThin>
        <EditButton onClick={() => handleEditClick(issuer)} marginLeft="auto" marginRight="19px" color="white">
          Edit
        </EditButton>
      </CardHeader>

      <TokensList>
        {tokens?.length > 0 &&
          tokens.map(({ ticker, url, tradable, feautured }: any, index: number) => (
            <TokensListItem key={`token-list-${index}`}>
              <TYPE.body3 color="white">{ticker}</TYPE.body3>
              <TYPE.body3 color="white">{url}</TYPE.body3>
              <div>
                {tradable ? (
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
              <TYPE.title6 fontWeight={400}>{feautured ? 'Featured' : '-'}</TYPE.title6>
            </TokensListItem>
          ))}
      </TokensList>
    </Box>
  )
}
