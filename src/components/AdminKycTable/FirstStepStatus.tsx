import { t, Trans } from '@lingui/macro'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import approvedIcon from '../../assets/images/check-success.svg'
import rejectedIcon from '../../assets/images/attention.svg'
import pendingIcon from '../../assets/images/loader_thin.svg'
import { ButtonGradient } from 'components/Button'

interface Props {
  status: string
  link?: string
}

export const FirstStepStatus = ({ status, link }: Props) => {
  const theme = useContext(ThemeContext)

  const statusColors = {
    pending: theme.text2,
    rejected: theme.error,
    approved: theme.green1,
  } as Record<string, string>

  const getText = () => {
    switch (status) {
      case 'pending':
        return t`Pending`
      case 'rejected':
        return t`Rejected`
      case 'approved':
        return t`Approved`
      default:
        return t`Status`
    }
  }

  const getIcon = () => {
    switch (status) {
      case 'pending':
        return pendingIcon
      case 'rejected':
        return rejectedIcon
      case 'approved':
        return approvedIcon
      default:
        return pendingIcon
    }
  }

  return (
    <Container>
      <img src={getIcon()} alt="icon" width="20px" height="20px" />
      <StatusText color={statusColors[status] || theme.text2}>{getText()}</StatusText>
      {link && (
        <ButtonContainer>
          <a href={link} download="kyc.pdf" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <ButtonGradient>
              <Trans>Download</Trans>
            </ButtonGradient>
          </a>
        </ButtonContainer>
      )}
    </Container>
  )
}

const ButtonContainer = styled.div`
  margin-left: 6px;
`

const StatusText = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 20px 90px 110px;
  grid-gap: 9px;
  align-items: center;
`
