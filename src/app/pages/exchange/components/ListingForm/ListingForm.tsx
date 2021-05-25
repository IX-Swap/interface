import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { isDSOLive } from 'app/components/DSO/utils'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { ListingFormFields } from 'app/pages/exchange/components/ListingForm/ListingFormFields'
import { ListingSidebar } from 'app/pages/exchange/components/ListingForm/ListingSidebar'
import { ListingFormActions } from 'app/pages/exchange/components/ListingForm/ListingFormActions'

export interface ListingFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const ListingForm = (props: ListingFormProps) => {
  const { data, isNew = false } = props
  const isLive = isDSOLive(data)

  useSetPageTitle(getOfferingName(data))

  return (
    <Form data-testid='listing-form'>
      <Grid container>
        <Grid item lg={9} container direction='column'>
          <ListingFormFields isNew={isNew} isLive={isLive} />
        </Grid>

        <Grid item lg={3}>
          <ListingSidebar
            dso={data}
            footer={<ListingFormActions listing={data} />}
          />
        </Grid>
      </Grid>
    </Form>
  )
}
