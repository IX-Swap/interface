import React, { FC } from 'react'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'

import { ExternalLink, TYPE } from 'theme'
import { ActionHistoryStatus } from 'components/Vault/enum'
import { StatusIcons } from 'components/Vault/styleds'

import { CardHeader, EditButton, TokensList, TokensListItem } from './styleds'
import { isMobile } from 'react-device-detect'
export interface BrokerDealerFakeProps {
  issuer: any
  handleEditClick: (editIssuer: any) => void
}

export const BrokerDealerCard: FC<BrokerDealerFakeProps> = ({ issuer, handleEditClick }: BrokerDealerFakeProps) => {
  const { url, logo, name, tokens } = issuer

  return (
    <Box marginBottom="30px">
      <CardHeader>
        <Box height="100%">
          <img style={{ width: 'fit-content', height: '100%' }} src={logo.public} />
        </Box>
        <TYPE.title6 style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</TYPE.title6>
        <TYPE.descriptionThin overflow="hidden">
          <ExternalLink
            style={{ color: 'rgba(237, 206, 255, 0.5)', overflow: 'hidden', textOverflow: 'ellipsis' }}
            href={url}
          >
            {url}
          </ExternalLink>
        </TYPE.descriptionThin>
        <EditButton
          onClick={() => handleEditClick(issuer)}
          marginLeft={isMobile ? '8px' : 'auto'}
          marginRight="19px"
          color="white"
        >
          <Trans>Edit</Trans>
        </EditButton>
      </CardHeader>

      {tokens?.length > 0 && (
        <TokensList>
          {tokens.map(({ ticker, url, token: wrappedToken, featured, logo }: any, index: number) => (
            <TokensListItem key={`token-list-${index}`}>
              <Box>
                <img style={{ borderRadius: '24px' }} width="30px" height="31px" src={logo?.public} />
                <TYPE.body3 style={{ whiteSpace: 'nowrap' }} marginLeft="12px" color="white">
                  {ticker}
                </TYPE.body3>
              </Box>

              <TYPE.body3 overflow="hidden" color="white">
                <ExternalLink style={{ color: 'white' }} href={url}>
                  {url}
                </ExternalLink>
              </TYPE.body3>
              <div>
                {wrappedToken ? (
                  <>
                    {StatusIcons[ActionHistoryStatus.SETTLED]()}
                    <TYPE.title6 marginLeft="10px" fontWeight={400} color="#9DF9B1">
                      <Trans>Tradable</Trans>
                    </TYPE.title6>
                  </>
                ) : (
                  <>
                    {StatusIcons[ActionHistoryStatus.NON_TRADABLE]()}
                    <TYPE.title6 marginLeft="10px" fontWeight={400} color="#EDCEFF">
                      <Trans>Non Tradable</Trans>
                    </TYPE.title6>
                  </>
                )}
              </div>
              <TYPE.title6 fontWeight={400}>{featured ? 'Featured' : '-'}</TYPE.title6>
            </TokensListItem>
          ))}
        </TokensList>
      )}
    </Box>
  )
}
