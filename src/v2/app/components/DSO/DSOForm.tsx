import React, { useEffect } from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'v2/types/dso'
import { Box, Grid } from '@material-ui/core'
import { dsoFormValidationSchema } from 'v2/app/components/DSO/validation'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
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
import { DSOSubscriptionDocument } from 'v2/app/components/DSO/components/DSOSubscriptionDocument'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { DSOToken } from './components/DSOToken'
import { DSOFormBackButton } from 'v2/app/components/DSO/components/DSOFormBackButton'
import { useFormContext } from 'react-hook-form'

export interface DSOFormProps {
  submitButtonLabel?: string
  onSubmit?: (values: DSOFormValues) => any
  data?: DigitalSecurityOffering
  isEditing?: boolean
  isNew?: boolean
}

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
      <DSOBaseFields isEditing={isEditing} dsoOwnerId={data?.user ?? ''} />

      <Grid container direction='row' spacing={2}>
        <DSOContainer title='Introduction' item xs={8}>
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

        <DSOContainer title='Status' item xs={4}>
          <DSOStatusFields
            isEditing={isEditing}
            isNew={isNew}
            dsoOwnerId={data?.user ?? ''}
          />
        </DSOContainer>

        <DSOContainer title='Subscription Document' item xs={12}>
          <DSOSubscriptionDocument
            isEditing={isEditing}
            dsoOwnerId={data?.user ?? ''}
            dsoId={data?._id ?? ''}
          />
        </DSOContainer>

        <DSOContainer title='Offering Terms' item xs={12}>
          <DSOOfferingTerms
            isEditing={isEditing}
            dsoOwnerId={data?.user ?? ''}
          />
        </DSOContainer>

        <DSOContainer title='Business Model' item xs={12}>
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

        {!isNew && (
          <DSOContainer title='Token' item xs={12}>
            <DSOToken />
          </DSOContainer>
        )}

        <DSOContainer title='Use of Proceeds' item xs={12}>
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

        <DSOContainer title='Dataroom' item xs={12}>
          <Dataroom editable isEditing={isEditing} />
        </DSOContainer>

        <DSOContainer title='Fund Raising Milestone' item xs={12}>
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

        <DSOContainer title='Team' item xs={12}>
          <DSOTeam isEditing={isEditing} dsoOwnerId={data?.user ?? ''} />
        </DSOContainer>

        {isEditing && (
          <Grid container item xs={12} justify='center'>
            <DSOFormBackButton />
            <Box px={1} />
            <Submit>{submitButtonLabel}</Submit>
          </Grid>
        )}
      </Grid>
    </Form>
  )
}
