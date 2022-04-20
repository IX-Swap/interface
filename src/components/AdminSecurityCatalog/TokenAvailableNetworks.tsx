import React, { FC } from 'react'
import { Trans } from '@lingui/macro'

import { Checkbox } from 'components/Checkbox'
import { TYPE } from 'theme'
import { defaultNetworksJson } from './mock'
import { Container, Options } from './TokenAvailableFor'

interface Props {
  setToken: (value: Record<string, any>) => void
  token: Record<string, any>
  error?: string | null
}

const options = [
  { label: 'Kovan', value: 'kovan' },
  { label: 'Ethereum', value: 'ethereum' },
  { label: 'Polygon', value: 'polygon' },
  { label: 'Mumbai', value: 'mumbai' },
]

export const TokenAvailableNetworks: FC<Props> = ({ token, setToken, error }) => {
  const kycNetworks = token.kycNetworks || defaultNetworksJson

  const onChange = (option: string) => {
    setToken({ ...token, kycNetworks: { ...kycNetworks, [option]: !kycNetworks[option] } })
  }

  return (
    <>
      <Container>
        <div>
          <Trans>Available for networks:</Trans>
        </div>
        <Options>
          {options.map(({ value, label }) => (
            <Checkbox key={value} label={label} onClick={() => onChange(value)} checked={kycNetworks[value]} />
          ))}
        </Options>
      </Container>
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </>
  )
}
