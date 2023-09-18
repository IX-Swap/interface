import React from 'react'
import { Trans, t } from '@lingui/macro'
import { Box, Text } from 'rebass'
import { Details, Dot, Value, Label, Info } from './styleds'
import { AddToMetamask } from './AddToMetamask'
import dayjs from 'dayjs'
import { ReadMore } from 'components/ReadMore'
import { Line } from 'components/Line'

interface Props {
  token: any
}

const KeyValueRow = ({ label, value }: { label: string; value: any }) => (
  <div>
    <Line />
    <Label>
      <Trans>{label}:</Trans>
    </Label>
    {value ? (
      <Value>
        {label === 'Issuer' || label === 'Website' ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#6666FF',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </Value>
    ) : (
      <Value>-</Value>
    )}
    <Line />
  </div>
)

export const DetailsInfo = ({ token }: Props) => {
  const { description, country, industry, issuer, url: issuerUrl, createdAt: issuerCreatedAt } = token

  return (
    <Details>
      <ReadMore more={t`Read More`} less={t`Show Less`} lines={2}>
        <Trans>{description}</Trans>
      </ReadMore>

      {token && <AddToMetamask token={token} />}
      <Info>
        <div>
          <KeyValueRow label="Country" value={country} />
          <KeyValueRow label="Industry" value={industry} />
          <KeyValueRow label="Issuer" value={issuer?.name} />
          <KeyValueRow label="Website" value={issuer?.url} />
        </div>
        <div>
          <KeyValueRow label="Issuance Date" value={dayjs(issuerCreatedAt).format('MMM D, YYYY HH:mm')} />
          <KeyValueRow label="Market Capitalization" value="-" />
          <KeyValueRow label="Protocol" value="-" />
        </div>
        <div>
          <KeyValueRow label="Exchange" value="-" />
          <KeyValueRow label="Token Supply" value="-" />
          <KeyValueRow label="Issuing Price" value="-" />
        </div>
      </Info>
    </Details>
  )
}
