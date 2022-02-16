import React, { useMemo } from 'react'
import { Trans, t } from '@lingui/macro'
import { Flex } from 'rebass'

import { ReadMore } from 'components/ReadMore'
import { ButtonGradient } from 'components/Button'
import { RowStart } from 'components/Row'
import { AboutWrapping } from 'components/Vault/AboutWrapping'
import { AccreditationRequest } from 'components/Vault/enum'
import { useCurrency } from 'hooks/Tokens'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useActiveWeb3React } from 'hooks/web3'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { ExternalLink, TextGradient } from 'theme'
import { shortenAddress } from 'utils'

import { Details, Dot } from './styleds'

interface Props {
  token: any
}

export const DetailsInfo = ({ token }: Props) => {
  return (
    <Details>
      <div>
        <div>
          <ExternalLink href={token.url} style={{ textDecoration: 'underline' }}>
            <Trans>{token.ticker} token</Trans>
          </ExternalLink>
          &nbsp;<Trans>issued by</Trans>&nbsp;
          <ExternalLink href={token.issuer.url} style={{ textDecoration: 'underline' }}>
            {token.issuer.name}
          </ExternalLink>
        </div>
        <Dot />
        <div>
          <Trans>Country:</Trans>&nbsp;
          <span>{token.country}</span>
        </div>

        <Dot />
        <div>
          <Trans>Industry:</Trans>&nbsp;
          <span>{token.industry}</span>
        </div>
      </div>
      <ReadMore more={t`Read More`} less={t`Show Less`} lines={2}>
        {token.description}
      </ReadMore>
    </Details>
  )
}
