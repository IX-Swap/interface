import { t, Trans } from '@lingui/macro'
import { Document, Page, StyleSheet, Text, usePDF, View } from '@react-pdf/renderer'
import { ButtonGradient } from 'components/Button'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { EllipsisText } from 'theme'
import rejectedIcon from '../../assets/images/attention.svg'
import approvedIcon from '../../assets/images/check-success.svg'
import pendingIcon from '../../assets/images/loader_thin.svg'
import { convert, getStatusIcon } from './utils'

interface Props {
  status: string
  kyc?: any
  broker?: string
}
const styles = StyleSheet.create({
  section: { textAlign: 'left', margin: 30 },
})

const usePdfDoc = ({ kyc, broker }: { kyc: any; broker: string }) => {
  return useMemo(() => {
    return (
      <Document>
        <Page size="A4">
          <View style={styles.section}>
            <Text>Broker: {broker}</Text>
            <Text>{convert(kyc)}</Text>
          </View>
        </Page>
      </Document>
    )
  }, [kyc, broker])
}
export const BrokerDealerStatus = ({ status, broker = '' }: Props) => {
  return (
    <Container>
      <img src={getStatusIcon(status)} alt="icon" width="20px" height="20px" />
      <EllipsisText>{broker}</EllipsisText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: 100%;
`
