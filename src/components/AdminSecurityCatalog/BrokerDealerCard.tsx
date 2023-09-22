import React, { FC } from 'react'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'

import { ExternalLink, TYPE } from 'theme'
import { ReactComponent as Passed } from 'assets/images/newRightCheck.svg'
import { ReactComponent as NonTradable } from 'assets/images/newReject.svg'
import { ReactComponent as EditIcon } from 'assets/images/NewEditButton.svg'

import { CardHeader, EditButton, EditWrapper, TokensList, TokensListItem } from './styleds'
export interface BrokerDealerFakeProps {
  issuer: any
  handleEditClick: (editIssuer: any) => void
}

export const BrokerDealerCard: FC<BrokerDealerFakeProps> = ({ issuer, handleEditClick }: BrokerDealerFakeProps) => {
  const { url, logo, name, tokens } = issuer

  return (
    <Box marginBottom="30px">
      <CardHeader>
        <div className="left-side">
          <img style={{ width: '64px', height: '64px', marginRight: '20px' }} src={logo.public} />
          <div>
            <TYPE.title7 style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</TYPE.title7>
            <TYPE.small overflow="hidden">
              <ExternalLink style={{ color: '#B8B8CC', overflow: 'hidden', textOverflow: 'ellipsis' }} href={url}>
                {url}
              </ExternalLink>
            </TYPE.small>
          </div>
        </div>

        {/* <div className="left-side">
          <img style={{ width: '64px', height: '64px', marginRight: '20px' }} src={logo.public} />
        </div> */}
        <EditWrapper onClick={() => handleEditClick(issuer)}>
          <EditIcon />
          {/* <img style={{ width: '64px', height: '64px', marginRight: '20px' }} src={logo.public} /> */}
        </EditWrapper>
      </CardHeader>

      {tokens?.length > 0 && (
        <TokensList>
          {tokens.map(({ ticker, url, token: wrappedToken, featured, logo }: any, index: number) => (
            <TokensListItem key={`token-list-${index}`}>
              <Box>
                <img style={{ borderRadius: '24px' }} width="30px" height="31px" src={logo?.public} />
                <TYPE.title7 style={{ whiteSpace: 'nowrap' }} marginLeft="12px">
                  {ticker}
                </TYPE.title7>
              </Box>

              <TYPE.small overflow="hidden" color="#B8B8CC">
                <ExternalLink style={{ color: '#B8B8CC' }} href={url}>
                  {url}
                </ExternalLink>
              </TYPE.small>
              <div>
                {wrappedToken ? (
                  <>
                    <Passed />
                    <TYPE.title10 fontSize="13px" marginLeft="10px">
                      <Trans>Tradable</Trans>
                    </TYPE.title10>
                  </>
                ) : (
                  <>
                    <NonTradable />
                    <TYPE.title10 fontSize="13px" marginLeft="10px">
                      <Trans>Non Tradable</Trans>
                    </TYPE.title10>
                  </>
                )}
              </div>
              <TYPE.title10 fontSize="13px">{featured ? 'Featured' : '-'}</TYPE.title10>
            </TokensListItem>
          ))}
        </TokensList>
      )}
    </Box>
  )
}
