import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { ViewListedTokens } from 'app/pages/admin/components/ViewListedTokens/ViewListedTokems'
import { ListedTokensDialog } from 'app/pages/admin/components/ListedTokensDialog/ListedTokensDialog'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const CustodyManagement = () => {
  const [
    isTokensListPopupVisible,
    setIsTokensListPopupVisible
  ] = useState<boolean>(false)
  const [custodianValue, setCustodianValue] = useState<string>('hex')

  const { isMobile } = useAppBreakpoints()

  const currentCustodianLabel = custodianValue === 'hex' ? 'HEX' : 'InvestaX'

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Custody Management' />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item container justify={'space-between'}>
        <Grid item xs={12} sm={7} md={5} lg={4}>
          <AccountsUnderCustody />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={'auto'}
          style={{ width: 'max-content', marginTop: isMobile ? 30 : 0 }}
        >
          <ViewListedTokens
            radioValue={custodianValue}
            onRadioChange={value => setCustodianValue(value)}
            onButtonClick={() => setIsTokensListPopupVisible(true)}
          />
        </Grid>
      </Grid>
      <Grid item>
        <VSpacer size={'medium'} />
        <CustodyManagementFilters />
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <CustodyManagementTable />
      </Grid>
      <ListedTokensDialog
        open={isTokensListPopupVisible}
        currentCustodian={currentCustodianLabel}
        onClose={() => setIsTokensListPopupVisible(false)}
      />
    </Grid>
  )
}
