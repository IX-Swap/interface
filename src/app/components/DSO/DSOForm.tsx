import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'
import { noop } from 'helpers/noop'
import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'
import { Grid } from '@material-ui/core'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { Form } from 'components/form/Form'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { getDSOValidationSchema } from 'validation/dso'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { VSpacer } from 'components/VSpacer'
import { DSOFormGuide, DSOFormSection } from 'app/components/DSO/DSOFormGuide'
import { Element } from 'react-scroll'

export interface DSOFormProps {
  submitButtonLabel?: string
  onSubmit?: (values: DSOFormValues) => any
  data?: DigitalSecurityOffering
  isEditing?: boolean
  isNew?: boolean
}

export const DSOForm = (props: DSOFormProps) => {
  const { data, isNew = false, onSubmit = noop } = props
  const isLive = isDSOLive(data)

  useSetPageTitle(getOfferingName(data))

  return (
    <Form
      validationSchema={getDSOValidationSchema(isNew, isLive)}
      defaultValues={transformDSOToFormValues(data)}
      onSubmit={onSubmit}
      data-testid='dso-form'
    >
      <Grid container>
        <Grid item lg={9} container direction='column'>
          <Element name={DSOFormSection['DSO Information']}>
            <DSOBaseFields isNew={isNew} isLive={isLive} />
          </Element>

          <Element name={DSOFormSection.Pricing}>
            <VSpacer size='large' />
            <DSOPricing />
          </Element>

          <Element name={DSOFormSection['Offering Terms']}>
            <VSpacer size='large' />
            <DSOTerms />
          </Element>

          <Element name={DSOFormSection.Information}>
            <VSpacer size='large' />
            <DSOInformationProfile />
          </Element>

          <Element name={DSOFormSection['Team Members']}>
            <VSpacer size='large' />
            <DSOTeam />
          </Element>
        </Grid>

        <Grid item lg={3}>
          <DSOFormGuide title='Progress' />
        </Grid>
      </Grid>
    </Form>
  )
}
