import React, { Fragment, useState } from 'react'
import { Element } from 'react-scroll'
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
import { DSOFormSection } from 'app/components/DSO/DSOFormGuide'
import { DSOFormSidebar } from 'app/components/DSO/components/DSOFormSidebar'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'

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

  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const togglePreviewMode = () => setIsPreviewMode(value => !value)

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
          {isPreviewMode && data !== undefined ? (
            <DSOPreview data={data} />
          ) : (
            <Fragment>
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

              <Element name={DSOFormSection['Upload Documents']}>
                <VSpacer size='large' />
                <DSODataroom />
              </Element>

              <Element name={DSOFormSection['Team Members']}>
                <VSpacer size='large' />
                <DSOTeam />
              </Element>
            </Fragment>
          )}
        </Grid>

        <Grid item lg={3}>
          <DSOFormSidebar
            dso={data}
            isNew={isNew}
            isPreviewMode={isPreviewMode}
            togglePreviewMode={togglePreviewMode}
          />
        </Grid>
      </Grid>
    </Form>
  )
}
