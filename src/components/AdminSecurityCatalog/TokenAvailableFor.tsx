import React from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import { Checkbox } from 'components/Checkbox'
import { TYPE } from 'theme'
import { defaultKycType } from './mock'

const options = [
  { label: 'Individuals - Accredited Investors', value: 'individualAccredited' },
  { label: 'Individuals - NOT Accredited Investors', value: 'individualAccreditedNot' },
  { label: 'Corporate - Accredited Investors', value: 'corporateAccredited' },
  { label: 'Corporate - NOT Accredited Investors', value: 'corporateAccreditedNot' },
]

interface Props {
  setToken: (value: Record<string, any>) => void
  token: Record<string, any>
  error?: string | null
}

export const TokenAvailableFor = ({ setToken, token, error }: Props) => {
  const kycType = token.kycTypeJson || defaultKycType

  const onChange = (option: string) => {
    setToken({ ...token, kycTypeJson: { ...kycType, [option]: !kycType[option] } })
  }

  return (
    <>
      <Container>
        <div>
          <Trans>Available for:</Trans>
        </div>
        <Options>
          {options.map(({ value, label }) => (
            <Checkbox key={value} label={label} onClick={() => onChange(value)} checked={kycType[value]} />
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

const Container = styled.div`
  > div:first-child {
    color: ${({ theme }) => theme.text2};
    margin-bottom: 8px;
  }
  > div:last-child {
    border: 1px solid ${({ theme }) => theme.text9};
    border-radius: 12px;
    padding: 22px 20px;
  }
`

const Options = styled.div`
  * {
    color: white;
  }
`
