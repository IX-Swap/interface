import React, { useState } from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import { Checkbox } from 'components/Checkbox'
import { TYPE } from 'theme'

const options = [
  { label: 'Individuals - Accredited Investors', value: 'individualAccreditated' },
  { label: 'Individuals - NOT Accredited Investors', value: 'individualNotAccreditated' },
  { label: 'Corporate - Accredited Investors', value: 'corportateAccreditated' },
  { label: 'Corporate - NOT Accredited Investors', value: 'corportateNotAccreditated' },
]

interface Props {
  setToken: (value: Record<string, any>) => void
  token: Record<string, any>
  error?: string | null
}

export const TokenAvailableFor = ({ setToken, token, error }: Props) => {
  const onChange = (option: any) => {
    const kycTypes = token.kycTypes || []
    if (kycTypes.includes(option)) {
      const data = kycTypes.filter((el: string) => el !== option)
      setToken({ ...token, kycTypes: data })
    } else {
      setToken({ ...token, kycTypes: [...kycTypes, option] })
    }
  }

  return (
    <>
      <Container>
        <div>
          <Trans>Available for:</Trans>
        </div>
        <Options>
          {options.map(({ value, label }) => (
            <Checkbox
              key={value}
              label={label}
              onClick={() => onChange(value)}
              checked={(token.kycTypes || []).includes(value)}
            />
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
    border: 1px solid rgba(237, 206, 255, 0.5);
    border-radius: 12px;
    padding: 22px 20px;
  }
`

const Options = styled.div`
  * {
    color: white;
  }
`
