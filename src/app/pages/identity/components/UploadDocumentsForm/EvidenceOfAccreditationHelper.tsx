import { Typography } from '@mui/material'
import React from 'react'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/styles'
import { CryptoHoldingDialog } from '../InvestorDeclarationForm/CryptoHoldingDialog/CryptoHoldingDialog'
import { InvestorRole } from '../../utils/shared'

export const EvidenceOfAccreditationHelper = ({
  investorRole = 'accredited'
}: {
  investorRole: InvestorRole
}) => {
  const styles = useStyles()
  const isExpert = investorRole === 'expert'
  return (
    <Typography className={styles.text} textTransform='capitalize'>
      {!isExpert ? (
        <>
          <span className={styles.blackText}>Net Personal Asset</span> Copy of
          latest investment portfolio holdings, e.g. bank, broker, <br /> fund
          manager account statements, copy bank statement, CPF statement,&nbsp;
          <CryptoHoldingDialog />
        </>
      ) : (
        <>
          Eg-: SGX trading member confirmation, recent custody or broker trading
          statement, confirmation letter from broker/custodian for trading
          activity for past 12 months, financial statement/reports showing
          previous engagement or dealing in capital market products, trust deed
          showing intended activities of the trust.
        </>
      )}
    </Typography>
  )
}
