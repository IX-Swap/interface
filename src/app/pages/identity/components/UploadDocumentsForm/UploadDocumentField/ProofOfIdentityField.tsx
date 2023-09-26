import { Grid, Typography, Box, FormHelperText } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DataroomFileType } from 'config/dataroom'
import { Tooltip } from 'ui/Tooltip/Tooltip'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { FieldsArray } from 'components/form/FieldsArray'
import {
  plainValueExtractor,
  pathToString,
  dateTimeValueExtractor
} from 'helpers/forms'
import { Icon } from 'ui/Icons/Icon'
import { AddDocumentButton } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/AddDocumentButton'
import { DataroomFile } from 'types/dataroomFile'
import { ProofOfIdentityTypeSelect } from 'components/form/ProofOfIdentityTypeSelect'
import { UploadDocumentInfo } from 'hooks/useUploadFile'
import { TextInput } from 'ui/TextInput/TextInput'
import { DatePicker } from 'components/form/DatePicker'
import { isEmpty } from 'lodash'
import format from 'date-fns/format'
import { compareDatesWithoutTime } from 'helpers/dates'

export interface ProofOfIdentityFieldProps {
  name: any
  label?: string
  helperElement?: React.ReactNode
  tooltipContent?: any
  fieldId?: any
  defaultValue?: any
  isDefaultEmpty?: boolean
  hideLabel?: boolean
}

export const ProofOfIdentityField = ({
  name,
  label,
  helperElement,
  tooltipContent,
  isDefaultEmpty = false,
  hideLabel = false
}: ProofOfIdentityFieldProps) => {
  const { control, watch, formState } = useFormContext()

  const defaultUploadedFiles =
    watch(name) !== undefined && Array.isArray(watch(name))
      ? watch(name).map((file: { value: DataroomFile }) => file.value)
      : []
  const filteredDefaultUploadedFiles = defaultUploadedFiles.filter(
    (file: DataroomFile) =>
      typeof file !== 'undefined' && Object.keys(file).length > 0
  )
  const [uploadedFiles, setUploadedFiles] = useState<DataroomFile[]>(
    filteredDefaultUploadedFiles
  )

  const handleSuccessFileUpload = (value: DataroomFile) => {
    setUploadedFiles([...uploadedFiles, value])
  }
  const handleRemoveFile = (value: DataroomFile) => {
    const filteredValue = uploadedFiles.filter((it: DataroomFile) => {
      return it._id !== value._id
    })

    console.log('test')

    setUploadedFiles(filteredValue)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box>
          <Grid item container alignItems='center'>
            {!hideLabel && (
              <Typography variant='subtitle1' color={'otpInput.color'}>
                {label}
              </Typography>
            )}

            <Box pr={1}></Box>
            {tooltipContent !== undefined ? (
              <Tooltip
                data-testid='upload-document-field-tooltip'
                title={tooltipContent}
              />
            ) : null}
          </Grid>
        </Box>
        {helperElement !== undefined ? <Box mt={1}>{helperElement}</Box> : null}
      </Grid>

      <Grid item xs={12}>
        <FieldsArray name={name} control={control}>
          {({ fields, append, remove }) => (
            <Grid container spacing={2}>
              {fields.map((field, index) => {
                const identityType = pathToString([name, index, 'identityType'])
                const identityTypeValue = watch(identityType)
                const documentNumberValue = watch(
                  pathToString([name, index, 'documentNumber'])
                )
                const issuedDateValue = watch(
                  pathToString([name, index, 'issuedDate'])
                )
                const expiryDateValue = watch(
                  pathToString([name, index, 'expiryDate'])
                )
                const idsWithFrontAndBack = ['NATIONAL ID', 'DRIVING LICENSE']
                const hasFrontAndBack =
                  idsWithFrontAndBack.includes(identityTypeValue)

                const idsWithOptionalDates = ['NATIONAL ID', 'OTHERS']
                const areDatesOptional =
                  idsWithOptionalDates.includes(identityTypeValue)

                const isIssueDateEmpty = isNaN(Date.parse(issuedDateValue))
                const isExpiryDateEmpty = isNaN(Date.parse(expiryDateValue))

                const isExpiryDateEarlierThanIssuedDate =
                  compareDatesWithoutTime(
                    new Date(expiryDateValue),
                    new Date(issuedDateValue)
                  ) === -1

                const isUploadDisabled =
                  isEmpty(identityTypeValue) ||
                  isEmpty(documentNumberValue) ||
                  (!areDatesOptional &&
                    (isIssueDateEmpty ||
                      isExpiryDateEmpty ||
                      isExpiryDateEarlierThanIssuedDate)) ||
                  (areDatesOptional &&
                    (!isIssueDateEmpty || !isExpiryDateEmpty) &&
                    isExpiryDateEarlierThanIssuedDate)

                const areDocumentFieldsDisabled = uploadedFiles.length > 0

                // console.log('identityType', identityTypeValue)
                // console.log('field', field)
                // console.log('issuedDateValue', Date.parse(issuedDateValue))

                const documentInfo: UploadDocumentInfo = {
                  type: label,
                  title: [
                    identityTypeValue,
                    !isIssueDateEmpty
                      ? format(new Date(issuedDateValue), 'yyyy-MM-dd')
                      : 'NA',
                    !isExpiryDateEmpty
                      ? format(new Date(expiryDateValue), 'yyyy-MM-dd')
                      : 'NA',
                    documentNumberValue
                  ].join(',')
                }

                const titleField =
                  ('front' in field
                    ? field.front?.title
                    : field.value?.title) ?? ''
                const metadata: any = titleField
                  .split(',')
                  .map((data: any) => data.trim())
                const title =
                  (metadata?.[0] === 'NA' ? null : metadata[0]) ?? null
                const documentNumber =
                  (metadata?.[3] === 'NA' ? null : metadata[3]) ?? null
                const issuance =
                  (metadata?.[1] === 'NA' ? null : metadata[1]) ?? null
                const expiry =
                  (metadata?.[2] === 'NA' ? null : metadata[2]) ?? null

                return (
                  <Grid item xs={12} key={field.id}>
                    <Grid item xs={12} mt={-2}>
                      <TypedField
                        component={ProofOfIdentityTypeSelect}
                        control={control}
                        name={[name, index, 'identityType']}
                        variant='outlined'
                        customRenderer
                        placeholder='Select Identity Type'
                        defaultValue={title}
                        disabled={areDocumentFieldsDisabled}
                      />
                    </Grid>

                    <Grid item container spacing={3} xs={12} mt={2}>
                      <Grid item xs={12} md={6}>
                        <TypedField
                          fullWidth
                          component={TextInput}
                          control={control}
                          name={[name, index, 'documentNumber']}
                          label='Document Number'
                          variant='outlined'
                          customRenderer
                          defaultValue={documentNumber}
                          disabled={areDocumentFieldsDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TypedField
                          component={DatePicker}
                          control={control}
                          name={[name, index, 'issuedDate']}
                          label='Document Issued Date'
                          defaultValue={issuance}
                          valueExtractor={dateTimeValueExtractor}
                          customRenderer
                          isOptional={areDatesOptional}
                          maxDate={expiryDateValue}
                          disabled={areDocumentFieldsDisabled}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TypedField
                          component={DatePicker}
                          control={control}
                          name={[name, index, 'expiryDate']}
                          label='Document Expiry Date'
                          defaultValue={expiry}
                          valueExtractor={dateTimeValueExtractor}
                          customRenderer
                          isOptional={areDatesOptional}
                          minDate={issuedDateValue}
                          disabled={
                            isNaN(Date.parse(issuedDateValue)) ||
                            areDocumentFieldsDisabled
                          }
                        />
                        {isExpiryDateEarlierThanIssuedDate && (
                          <FormHelperText error>
                            The Document Expiry Date must not be earlier than
                            the Document Issued Date
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>

                    {hasFrontAndBack ? (
                      <Grid item container spacing={3} mt={2}>
                        <Grid item xs={12} md={6}>
                          <TypedField
                            customRenderer
                            name={[name, index, 'front']}
                            control={control}
                            component={FileUpload}
                            isValid={
                              formState.isValid
                                ? true
                                : uploadedFiles.length > 0
                            }
                            label='Front Picture'
                            placeHolder='Upload Front Picture'
                            valueExtractor={plainValueExtractor}
                            accept={DataroomFileType.image}
                            documentInfo={{
                              ...documentInfo,
                              feature: 'front'
                            }}
                            remove={() => {
                              remove(index)
                            }}
                            onSuccessUploadCallback={handleSuccessFileUpload}
                            onRemoveCallback={handleRemoveFile}
                            isCover
                            defaultValue={field.front}
                            disabled={isUploadDisabled}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TypedField
                            customRenderer
                            name={[name, index, 'back']}
                            control={control}
                            component={FileUpload}
                            label='Back Picture'
                            placeHolder='Upload Back Picture'
                            valueExtractor={plainValueExtractor}
                            accept={DataroomFileType.image}
                            documentInfo={{
                              ...documentInfo,
                              feature: 'back'
                            }}
                            remove={() => {
                              remove(index)
                            }}
                            onSuccessUploadCallback={handleSuccessFileUpload}
                            onRemoveCallback={handleRemoveFile}
                            isCover
                            defaultValue={field.back}
                            isOptional
                            disabled={isUploadDisabled}
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item xs={12} mt={2}>
                        <TypedField
                          customRenderer
                          name={[name, index, 'value']}
                          control={control}
                          component={FileUpload}
                          isValid={
                            formState.isValid ? true : uploadedFiles.length > 0
                          }
                          label='Upload File'
                          valueExtractor={plainValueExtractor}
                          accept={DataroomFileType.document}
                          fullWidth
                          maxSize={10}
                          documentInfo={documentInfo}
                          remove={() => {
                            remove(index)
                          }}
                          onSuccessUploadCallback={handleSuccessFileUpload}
                          onRemoveCallback={handleRemoveFile}
                          defaultValue={field.value}
                          disabled={isUploadDisabled}
                        />
                      </Grid>
                    )}
                  </Grid>
                )
              })}

              <AddDocumentButton
                addEmptyValue={!isDefaultEmpty}
                name={name}
                // isVisible={
                //   fields.length === uploadedFiles.length || fields.length === 0
                // }
                isVisible={false}
                onClick={() => {
                  append({ value: {} })
                }}
                variant='outlined'
                startIcon={<Icon name='plus' />}
                sx={{ width: '100%' }}
              />
            </Grid>
          )}
        </FieldsArray>
      </Grid>
    </Grid>
  )
}
