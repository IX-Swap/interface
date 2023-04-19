import React, { useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import { FieldArray, FieldProps, Formik, FormikProps, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import { ArrowLeft, Plus } from 'react-feather'
import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { LoaderContainer, Row, Separator } from 'components/LaunchpadMisc/styled'
import { VettingFormValues } from './types'
import { FormField } from '../shared/fields/FormField'
import { FileField } from '../shared/fields/FileField'
import { DirectorField } from '../shared/fields/DirectorField'
import { RejectInfo } from '../shared/RejectInfo'
import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, DeleteButton } from '../shared/styled'
import { CloseConfirmation } from '../shared/CloseConfirmation'
import { ConfirmationForm } from 'components/Launchpad/ConfirmForm'
import { TextareaField } from '../shared/fields/TextareaField'
import { useLoader, useSubmitVettingForm, useVettingFormInitialValues } from 'state/launchpad/hooks'

import { schema } from './schema'
import { FormGrid } from '../shared/FormGrid'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { useAddPopup, useShowError } from 'state/application/hooks'
import { defaultValues } from 'components/LaunchpadIssuance/IssuanceForm/Vetting/util'
import { useQueryParams } from 'hooks/useParams'
import { textFilter } from 'utils/input'
import { text19 } from 'components/LaunchpadMisc/typography'
import { useSaveDraftVetting } from './useSaveDraftVetting'
import { VettingActionButtons } from './VettingActionButtons'
import { StrategyCard } from './StrategyCard'
import { strategyOptions } from './constants'
import { isDraftDisabled, isSubmitDisabled } from 'components/LaunchpadIssuance/utils/form'

export interface IssuanceVettingFormProps {
  view?: boolean
}
export const IssuanceVettingForm = ({ view = false }: IssuanceVettingFormProps) => {
  const theme = useTheme()
  const history = useHistory()
  const loader = useLoader(false)
  const addPopup = useAddPopup()
  const showError = useShowError()
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)
  const [isReset, setReset] = React.useState(false)

  const onConfirmationClose = React.useCallback(() => {
    setShowCloseDialog(false)
    showError('Cannot save changes, please check the form for error messages')
  }, [])

  const {
    objectParams: { id: issuanceId },
  } = useQueryParams<{ id: number }>(['id'])
  const initialValues = useVettingFormInitialValues(issuanceId)

  const createVetting = useSubmitVettingForm(issuanceId)

  const goMain = useCallback(() => {
    history.push(`/issuance/create?id=${issuanceId}`)
  }, [history, issuanceId])
  const form = React.useRef<FormikProps<VettingFormValues>>(null)
  const goBack = useCallback(() => {
    if (JSON.stringify(form?.current?.values) === JSON.stringify(form?.current?.initialValues)) {
      goMain()
    } else {
      setShowCloseDialog(true)
    }
  }, [history, issuanceId])

  const saveDraft = useSaveDraftVetting({
    issuanceId,
    vettingId: initialValues.vettingId,
    goMain,
    initialData: initialValues.data,
  })

  const toSubmit = useCallback(() => {
    setShowConfirmDialog(true)
  }, [showConfirmDialog])

  const submit = useCallback(
    async (values: VettingFormValues) => {
      setShowConfirmDialog(false)
      if (!initialValues.data) return

      loader.start()
      try {
        await createVetting(values, initialValues.data, initialValues.vettingId)

        addPopup({
          info: { success: true, summary: `Vetting ${initialValues.vettingId ? 'updated' : 'created'} successfully` },
        })
        goMain()
      } catch (err: any) {
        addPopup({ info: { success: false, summary: err?.toString() } })
      } finally {
        loader.stop()
      }
    },
    [initialValues.data, initialValues.vettingId]
  )

  React.useEffect(() => {
    const listener = () => true

    window.addEventListener('beforeunload', listener)

    return () => window.removeEventListener('beforeunload', listener)
  }, [])

  if (!issuanceId) {
    return null
  }

  if (initialValues.loading) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <Loader />
      </LoaderContainer>
    )
  }
  if (!initialValues.loading && initialValues.error) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <FormTitle>{initialValues.error}</FormTitle>
      </LoaderContainer>
    )
  }

  return (
    <Formik
      initialValues={initialValues.data!}
      onSubmit={submit}
      validationSchema={schema}
      enableReinitialize={true}
      innerRef={form}
    >
      {({ submitForm, setFieldValue, values, errors, resetForm, touched, setFieldTouched }) => {
        const draftDisabled = view || isDraftDisabled(errors, touched)
        const submitDisabled = view || isSubmitDisabled(errors, touched)
        return (
          <FormContainer>
            <ConfirmationForm
              isOpen={showConfirmDialog}
              onClose={() => setShowConfirmDialog(false)}
              onSave={submitForm}
            />

            <CloseConfirmation
              isOpen={showCloseDialog}
              onDiscard={() => history.push(`/issuance/create?id=${issuanceId}`)}
              onClose={onConfirmationClose}
              onSave={() => (draftDisabled ? onConfirmationClose() : saveDraft(values))}
            />

            {loader.isLoading && (
              <LoaderContainer width="100vw" height="100vh">
                <Loader />
              </LoaderContainer>
            )}

            <FormHeader>
              <OutlineButton background={theme.launchpad.colors.background} onClick={goBack} padding="1rem 0.75rem">
                <ArrowLeft color={theme.launchpad.colors.primary} />
              </OutlineButton>

              <FormTitle>Vetting</FormTitle>
            </FormHeader>

            <FormSideBar>
              {!isReset &&
                [IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(
                  initialValues?.data?.status as IssuanceStatus
                ) && (
                  <RejectInfo
                    message={initialValues?.data?.reasonRequested}
                    longMessage={initialValues?.data?.changesRequested}
                    status={initialValues?.data?.status}
                    issuanceId={issuanceId}
                    onClear={() => {
                      resetForm({ values: defaultValues })
                      setReset(true)
                    }}
                    onSubmit={toSubmit}
                  />
                )}
              <VettingActionButtons
                onSaveDraft={() => saveDraft(values)}
                onSubmit={toSubmit}
                isView={view}
                draftDisabled={draftDisabled}
                submitDisabled={submitDisabled}
                vettingId={String(initialValues.vettingId)}
                status={initialValues?.data?.status}
              />
            </FormSideBar>

            <FormBody>
              <StrategyInfoBlock>
                {strategyOptions.map((strategy, idx) => (
                  <StrategyCard
                    key={strategy.option + idx}
                    field="smartContractStrategy"
                    id={strategy.option}
                    checked={
                      strategy.option ===
                      (values.smartContractStrategy
                        ? values.smartContractStrategy
                        : defaultValues.smartContractStrategy)
                    }
                    option={strategy.option}
                    text={strategy.text}
                    tooltipContent={strategy.tooltipContent}
                    disabled={view}
                    setter={setFieldValue}
                    touch={setFieldTouched}
                  />
                ))}
              </StrategyInfoBlock>

              <Separator />

              <IssuerInfoBlock>
                <FormField
                  label="Applicant's Full Name"
                  placeholder="Full name of the Applicant"
                  field="applicantFullName"
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  disabled={view}
                  value={values.applicantFullName}
                  error={touched.applicantFullName ? errors.applicantFullName : ''}
                  inputFilter={textFilter}
                />

                <FormField
                  label="Email Address"
                  placeholder="Email Address"
                  field="email"
                  disabled={view}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  value={values.email}
                  error={touched.email ? errors.email : ''}
                  inputFilter={textFilter}
                />

                <FormField
                  label="Name of Company"
                  placeholder="Name of your company"
                  field="companyName"
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  disabled={view}
                  value={values.companyName}
                  error={touched.companyName ? errors.companyName : ''}
                  inputFilter={textFilter}
                />

                <FormField
                  label="Company Website"
                  placeholder="Company Website"
                  field="companyWebsite"
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  disabled={view}
                  value={values.companyWebsite}
                  error={touched.companyWebsite ? errors.companyWebsite : ''}
                  inputFilter={textFilter}
                />
              </IssuerInfoBlock>

              <Separator />

              <DescriptionBlock>
                <FileField
                  label="Upload the company's pitch deck"
                  field="document.pitchDeck"
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  disabled={view}
                  value={values.document.pitchDeck}
                  error={(touched.document?.pitchDeck && errors.document?.pitchDeck) as string}
                  isImage
                />

                <FieldArray name="fundingDocuments">
                  {({ push, handleRemove }) => (
                    <>
                      <AdditionalFiles>
                        <Hint>Upload additional documents relevant to the funding objective. (Optional)</Hint>

                        <AddDocumentButton padding="0" onClick={() => push({ file: null })} disabled={view}>
                          <Plus size="14" /> Add Document
                        </AddDocumentButton>
                      </AdditionalFiles>

                      <FundingDocumentsGrid>
                        {values.fundingDocuments.map((entry, idx) => (
                          <Field name={`fundingDocuments[${idx}].file`} key={idx}>
                            {({ field: { name, value, onChange }, meta }: FieldProps) => (
                              <FileField
                                error={meta.touched ? meta.error : ''}
                                value={value}
                                disabled={view}
                                field={name}
                                setter={(name: string, value: any) =>
                                  onChange({
                                    target: { name, value },
                                  })
                                }
                                touch={setFieldTouched}
                                trailing={
                                  !view && (
                                    <DeleteButton onClick={handleRemove(idx)}>
                                      <Trash />
                                    </DeleteButton>
                                  )
                                }
                                isDocument
                              />
                            )}
                          </Field>
                        ))}
                      </FundingDocumentsGrid>
                    </>
                  )}
                </FieldArray>

                <TextareaField
                  label="Description"
                  placeholder="Short description of the company/offering"
                  field="description"
                  disabled={view}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  span={3}
                  value={values.description}
                  error={touched.description ? errors.description : ''}
                />
              </DescriptionBlock>

              <Separator />

              <FilesBlock>
                <FileField
                  label="Certificate of Incorporation"
                  disabled={view}
                  hint="File size should not exceed 5.0 MB. Supported file formats are doc, docx, PNG, JPG, JPEG and PDF"
                  field="document.certificateOfIncorporation"
                  value={values.document.certificateOfIncorporation}
                  error={
                    (touched.document?.certificateOfIncorporation &&
                      errors.document?.certificateOfIncorporation) as string
                  }
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />
                <FileField
                  optional
                  label="Certificate of Incumbency"
                  disabled={view}
                  hint="File size should not exceed 5.0 MB. Supported file formats are doc, docx, PNG, JPG, JPEG and PDF"
                  field="document.certificateOfIncumbency"
                  value={values.document.certificateOfIncumbency}
                  error={
                    (touched.document?.certificateOfIncumbency && errors.document?.certificateOfIncumbency) as string
                  }
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />

                <FileField
                  label="Share & Director Registry"
                  disabled={view}
                  hint="File size should not exceed 5.0 MB. Supported file formats are doc, docx, PNG, JPG, JPEG and PDF"
                  field="document.shareDirectorRegistry"
                  value={values.document.shareDirectorRegistry}
                  error={(touched.document?.shareDirectorRegistry && errors.document?.shareDirectorRegistry) as string}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />
                <FileField
                  optional
                  label="Copy of Audited Financials"
                  disabled={view}
                  hint="Document must cover the last 3 years or the most recent financials dated within the last 12 months. 
                      Not applicable to licensed entities. 
                      Supported file formats are doc, docx, PNG, JPG, JPEG and PDF"
                  field="document.auditedFinancials"
                  value={values.document.auditedFinancials}
                  error={(touched.document?.auditedFinancials && errors.document?.auditedFinancials) as string}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />

                <FileField
                  label="Memorandum and Article of Association Company Constitution"
                  disabled={view}
                  hint="File size should not exceed 5.0 MB. Supported file formats are doc, docx, PNG, JPG, JPEG and PDF"
                  field="document.memorandumArticle"
                  value={values.document.memorandumArticle}
                  error={(touched.document?.memorandumArticle && errors.document?.memorandumArticle) as string}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />
                <FileField
                  label="Ownership Structure"
                  hint={
                    <div>
                      <text>Supported file formats are doc, docx, PNG, JPG, JPEG and PDF.</text>
                      <br />
                      <ExampleLink
                        href="https://s3.eu-central-1.amazonaws.com/static.ixswap.io/ownership-structure-example.pdf"
                        target="_blank"
                      >
                        See Examples
                      </ExampleLink>
                    </div>
                  }
                  field="document.ownershipStructure"
                  value={values.document.ownershipStructure}
                  error={(touched.document?.ownershipStructure && errors.document?.ownershipStructure) as string}
                  disabled={view}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />

                <FileField
                  label="Resolution of Authorized Signatory List"
                  hint="Document must include specimen signatures or equivalent. Supported file formats are doc, docx, PNG, JPG, JPEG and PDF"
                  field="document.resolutionAuthorizedSignatory"
                  value={values.document.resolutionAuthorizedSignatory}
                  error={
                    (touched.document?.resolutionAuthorizedSignatory &&
                      errors.document?.resolutionAuthorizedSignatory) as string
                  }
                  disabled={view}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  isDocument
                />
              </FilesBlock>

              <Separator />

              <DirectorField
                directorTitle="Beneficial Owner"
                directors={values.beneficialOwners}
                setter={setFieldValue}
                disabled={view}
                field="beneficialOwners"
              />

              <DirectorField
                directorTitle="Director"
                disabled={view}
                directors={values.directors}
                setter={setFieldValue}
                field="directors"
              />
              <Row justifyContent="flex-end" alignItems="center" gap="1.5rem">
                <OutlineButton width="280px" onClick={goBack}>
                  Back
                </OutlineButton>
                {!view ||
                  (![IssuanceStatus.approved, IssuanceStatus.declined].includes(
                    initialValues?.data?.status as IssuanceStatus
                  ) && (
                    <FilledButton width="280px" onClick={toSubmit} disabled={submitDisabled}>
                      Submit
                    </FilledButton>
                  ))}
              </Row>
            </FormBody>
          </FormContainer>
        )
      }}
    </Formik>
  )
}

const StrategyInfoBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
`

const IssuerInfoBlock = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
`

const DescriptionBlock = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    '. . .'
    'description description';
  gap: 2.5rem 1rem;
  align-items: end;
`

const AdditionalFiles = styled(FormGrid)`
  padding-top: 2.75rem;
  place-self: start;
`

const AddDocumentButton = styled(OutlineButton)`
  font-weight: 600;
`

const Hint = styled.div`
  ${text19}
  text-align: right;
  color: ${(props) => props.theme.launchpad.colors.text.hint};
`

const FilesBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, auto);
  align-items: end;
  gap: 2rem;
`

const ExampleLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  ${text19}
  color: ${(props) => props.theme.launchpad.colors.primary};
`

const FundingDocumentsGrid = styled(FormGrid)`
  grid-column: span 3;
  gap: 0.5rem 2rem;
`
