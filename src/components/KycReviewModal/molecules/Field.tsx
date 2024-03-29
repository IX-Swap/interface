import React from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'
import { ReactComponent as CheckIcon } from 'assets/images/newRoundCheck.svg'
import { marginLeft } from 'styled-system'

interface Props {
  label: string
  value: string
  data?: any
}

export const Field = ({ label, value, data }: Props) => {
  // if (label === 'Reason') {
  //   switch (value) {
  //     case 'A':
  //       value =
  //         'Reason A - The country/jurisdiction where the Account Holder is resident does not issue TINs to its residents'
  //       break
  //     case 'B':
  //       value =
  //         'Reason B - The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why your are unable to obtain a TIN in the below table if you have selected this reason)'
  //       break
  //     case 'C':
  //       value =
  //         'Reason C - No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdiction does not require the collection of the TIN issued by such jurisdiction)'
  //       break
  //     default:
  //       value = ''
  //       break
  //   }
  //   return (
  //     <Container>
  //       <span>{t`${label}`}</span>
  //       <span>{value}</span>
  //     </Container>
  //   )
  // } else {
    const showCheckIcon = data?.isEmailVerified;
    return (
      <Container>
      <span>{`${label}`}</span>
      <div>
        <span>{value || 'Not completed'}</span>
        {label === 'Email address' && showCheckIcon && (
          <span style={{ position: 'absolute', marginLeft: '10px' }}>
            <CheckIcon />
          </span>
        )}
      </div>
    </Container>
    )
  // }
}

const Container = styled.div`
  display: grid;
  row-gap: 6px;
  font-size: 13px;
  // text-transform: capitalize;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    row-gap: 6px;
    margin-bottom: 12px;
  }
  > :first-child {
    color: ${({ theme: { text5 } }) => text5};

    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      width: max-content;
    }
  }
  > :last-child {
    color: ${({ theme: { text1 } }) => text1};
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      width: max-content;
    }
  }
`
