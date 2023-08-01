import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import {
  useIsAccredited,
  useIsRetail,
  useIsExpert,
  useIsInstitutional,
  useIsIssuer
} from 'helpers/acl'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { AccountActions } from './AccountActions/AccountActions'
import { TotalStats } from './TotalStats/TotalStats'
import { PrimaryOfferings } from 'app/pages/invest/components/PrimaryOfferings'
import { IssuerSTOs } from 'app/pages/invest/components/IssuerSTOs'
import { CashAccounts } from './CashAccounts/CashAccounts'
import { WalletAddresses } from './WalletAddresses/WalletAddresses'
import { isMobile } from 'react-device-detect'
import { MobileDialog } from './MobileDialog'

export const Dashboard = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const [isDisclosureVisible, setIsDisclosureVisible] = useState<boolean>(false)
  const isAccredited = useIsAccredited()
  const isRetail = useIsRetail()
  const isExpert = useIsExpert()
  const isInstitutional = useIsInstitutional()
  const hasAccreditation = isAccredited || isExpert || isInstitutional
  const isInvestor = isRetail || hasAccreditation
  const isIssuer = useIsIssuer()
  const hasAcceptedMasDisclosure = sessionStorage.getItem('mobileMode')

  useEffect(() => {
    if (hasAcceptedMasDisclosure === 'true') {
      setIsDisclosureVisible(true)
    } else {
      setIsDisclosureVisible(false)
    }
  }, [hasAcceptedMasDisclosure, setIsDisclosureVisible])
  return (
    <>
      <MobileDialog
        toggleModal={toggleOpen}
        isOpen={isDisclosureVisible && isMobile}
      />
      <Grid container direction='column' style={{ display: 'table' }}>
        <Grid item>
          <PageHeader title={'Dashboard'} />
        </Grid>
        <RootContainer>
          <Grid container direction='column' spacing={2}>
            <AccountActions />
            {isInvestor && (
              <>
                {hasAccreditation && (
                  <Grid item>
                    <TotalStats />
                  </Grid>
                )}
                <Grid item>
                  <PrimaryOfferings />
                </Grid>
              </>
            )}
            {isIssuer && (
              <Grid item>
                <IssuerSTOs />
              </Grid>
            )}
            <Grid item>
              <CashAccounts />
            </Grid>
            <Grid item>
              <WalletAddresses />
            </Grid>
          </Grid>
        </RootContainer>
      </Grid>
    </>
  )
}
