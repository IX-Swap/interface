import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'v2/types/dso'
import { Grid } from '@material-ui/core'
import { dsoFormValidationSchema } from './validation'
import { DSOContainer } from './components/DSOContainer'
import {
  Dataroom,
  noop
} from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { DSOTeam } from 'v2/app/components/DSO/components/DSOTeam'
import { DSOBaseFields } from 'v2/app/components/DSO/components/DSOBaseFields'
import { DSOStatusFields } from 'v2/app/components/DSO/components/DSOStatusFields'
import { DSOOfferingTerms } from 'v2/app/components/DSO/components/DSOOfferingTerms'
import {
  renderStringToHTML,
  transformDSOToFormValues
} from 'v2/app/components/DSO/utils'
import { DSOSubscriptionAndDocuments } from 'v2/app/components/DSO/components/DSOSubscriptionAndDocuments'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { DSOToken } from './components/DSOToken'
import { getIdFromObj } from 'v2/helpers/strings'

export interface DSOFormProps {
  submitButtonLabel?: string
  onSubmit?: (values: DSOFormValues) => any
  data?: DigitalSecurityOffering
  isEditing?: boolean
  isNew?: boolean
}

export const userExtractor = (data: DigitalSecurityOffering | undefined) =>
  data?.user ?? ''

export const useDSOForm = createTypedForm<DSOFormValues>()

export const DSOForm = (props: DSOFormProps) => {
  const {
    submitButtonLabel = 'Submit',
    data,
    onSubmit = noop,
    isEditing = false,
    isNew = false
  } = props
  const { Form, EditableField, FormValue, Submit } = useDSOForm()

  return (
    <Form
      onSubmit={onSubmit}
      validationSchema={dsoFormValidationSchema}
      defaultValues={transformDSOToFormValues(data)}
    >
      <DSOBaseFields isEditing={isEditing} dsoOwnerId={userExtractor(data)} />

      <Grid container direction='row' spacing={2}>
        <Grid item xs={8}>
          <DSOContainer title='Introduction'>
            <EditableField
              fieldType='RichTextEditor'
              isEditing={isEditing}
              label='Introduction'
              name='introduction'
              viewRenderer={
                <FormValue name='introduction'>{renderStringToHTML}</FormValue>
              }
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={4}>
          <DSOContainer title='Status'>
            <DSOStatusFields
              isEditing={isEditing}
              isNew={isNew}
              dsoOwnerId={userExtractor(data)}
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Subscription & Documents'>
            <DSOSubscriptionAndDocuments
              isEditing={isEditing}
              dsoOwnerId={userExtractor(data)}
              dsoId={getIdFromObj(data)}
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Offering Terms'>
            <DSOOfferingTerms
              isEditing={isEditing}
              dsoOwnerId={userExtractor(data)}
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Business Model'>
            <EditableField
              fieldType='RichTextEditor'
              isEditing={isEditing}
              label='Business Model'
              name='businessModel'
              viewRenderer={
                <FormValue name='businessModel'>{renderStringToHTML}</FormValue>
              }
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Token'>
            <DSOToken />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Use of Proceeds'>
            <EditableField
              fieldType='RichTextEditor'
              isEditing={isEditing}
              label='Use of Proceeds'
              name='useOfProceeds'
              viewRenderer={
                <FormValue name='useOfProceeds'>{renderStringToHTML}</FormValue>
              }
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Dataroom'>
            <Dataroom editable isEditing={isEditing} />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Fund Raising Milestone'>
            <EditableField
              fieldType='RichTextEditor'
              isEditing={isEditing}
              label='Fund Raising Milestone'
              name='fundraisingMilestone'
              viewRenderer={
                <FormValue name='fundraisingMilestone'>
                  {renderStringToHTML}
                </FormValue>
              }
            />
          </DSOContainer>
        </Grid>

        <Grid item xs={12}>
          <DSOContainer title='Team'>
            <DSOTeam isEditing={isEditing} dsoOwnerId={userExtractor(data)} />
          </DSOContainer>
        </Grid>

        {isEditing && (
          <Grid item xs={12}>
            <Submit>{submitButtonLabel}</Submit>
          </Grid>
        )}
      </Grid>
    </Form>
  )
}
