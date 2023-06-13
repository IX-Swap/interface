import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

interface Props {
  label: string
  value: string
}

export const Field = ({ label, value }: Props) => {
  if (label === 'Reason') {
    switch (value) {
      case 'A':
        value = 'Reason A - The country/jurisdiction where the Account Holder is resident does not issue TINs to its residents'
        break
      case 'B':
        value = 'Reason B - The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why your are unable to obtain a TIN in the below table if you have selected this reason)'
        break
      case 'C':
        value = 'Reason C - No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdiction does not require the collection of the TIN issued by such jurisdiction)'
        break
      default:
        value = ''
        break
    }
    return (<Container>
      <span>{t`${label}`}</span>
      <span>{value}</span>
    </Container>)
  } else {
    return (
      <Container>
        <span>{t`${label}`}</span>
        <span>{value || 'Not completed'}</span>
      </Container>
    )
  }
}

const Container = styled.div`
  display: grid;
  row-gap: 6px;
  font-size: 16px;
  > :first-child {
    color: ${({ theme: { text2 } }) => text2};
  }
  > :last-child {
    color: ${({ theme: { white } }) => white};
  }
`
