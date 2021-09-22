import { t, Trans } from '@lingui/macro'
import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import approvedIcon from '../../assets/images/check-success.svg'
import rejectedIcon from '../../assets/images/attention.svg'
import pendingIcon from '../../assets/images/loader_thin.svg'
import { ButtonGradient } from 'components/Button'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import ReactPDF from '@react-pdf/renderer'
import { usePDF, Document, Page, View, Text } from '@react-pdf/renderer'

interface Props {
  status: string
  kyc: any
}

// const Card = ({ kyc }: { kyc: any }) => {
//   const isObject = typeof kyc === 'object' && kyc
//   if (!isObject(kyc)) {
//     return <>{JSON.stringify(kyc)}</>
//   } else {
//     return Object.keys(kyc).map((key, index) => <Card key={JSON.stringify(key)} kyc={kyc[key]} />)
//   }
// }

const usePdfDoc = ({ kyc }: { kyc: any }) => {
  return useMemo(() => {
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>{/* <Card kyc={kyc} /> */}</Text>
          </View>
        </Page>
      </Document>
    )
  }, [kyc])
}
export const FirstStepStatus = ({ status, kyc }: Props) => {
  const theme = useContext(ThemeContext)
  const pdfDoc = usePdfDoc({ kyc })
  const [instance, updateInstance] = usePDF({ document: pdfDoc })
  const statusColors = {
    [AccreditationStatusEnum.PENDING]: theme.text2,
    [AccreditationStatusEnum.PENDING_KYC]: theme.text2,
    [AccreditationStatusEnum.REJECTED]: theme.error,
    [AccreditationStatusEnum.FAILED]: theme.error,
    [AccreditationStatusEnum.APPROVED]: theme.green1,
    [AccreditationStatusEnum.PENDING_CUSTODIAN]: theme.green1,
  } as Record<string, string>

  const getText = () => {
    switch (status) {
      case AccreditationStatusEnum.PENDING:
        return t`Pending`
      case AccreditationStatusEnum.PENDING_KYC:
        return t`Pending KYC`
      case AccreditationStatusEnum.FAILED:
        return t`Failed`
      case AccreditationStatusEnum.APPROVED:
      case AccreditationStatusEnum.REJECTED:
      case AccreditationStatusEnum.PENDING_CUSTODIAN:
        return t`Approved`
      default:
        return t`Status`
    }
  }

  const getIcon = () => {
    switch (status) {
      case AccreditationStatusEnum.FAILED:
        return rejectedIcon
      case AccreditationStatusEnum.REJECTED:
      case AccreditationStatusEnum.APPROVED:
      case AccreditationStatusEnum.PENDING_CUSTODIAN:
        return approvedIcon
      case AccreditationStatusEnum.PENDING:
      case AccreditationStatusEnum.PENDING_KYC:
      default:
        return pendingIcon
    }
  }

  return (
    <Container>
      <img src={getIcon()} alt="icon" width="20px" height="20px" />
      <StatusText color={statusColors[status] || theme.text2}>{getText()}</StatusText>
      {!instance.loading && !instance.error && instance.url && Object.keys(kyc).length > 0 && (
        <ButtonContainer>
          <a href={instance.url} download="kyc.pdf" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
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
