import React from 'react'
import { Trans, t } from '@lingui/macro'

import { ReadMore } from 'components/ReadMore'
import { ExternalLink } from 'theme'

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
