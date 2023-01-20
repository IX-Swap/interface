import React from 'react'
import styled, { useTheme } from 'styled-components'

import { FieldArray, Formik } from 'formik'

import { useHistory } from 'react-router-dom'
import { ArrowLeft, Plus } from 'react-feather'
import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { LoaderContainer, Row, Separator } from 'components/LaunchpadMisc/styled'

import { VettingFormValues } from './types'

import { FormField } from '../shared/fields/FormField'
import { FileField } from '../shared/fields/FileField'
import { DirectorField } from '../shared/fields/DirectorField'
import { RejectInfo } from '../shared/RejectInfo'

import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, FormSubmitContainer, DeleteButton } from '../shared/styled'
import { CloseConfirmation } from '../shared/CloseConfirmation'
import { TextareaField } from '../shared/fields/TextareaField'
import { useGetFieldArrayId, useLoader, useSaveVettingDraft, useSubmitVettingForm, useVetting, useVettingFormInitialValues } from 'state/launchpad/hooks'

import { schema } from './schema'
import { FormGrid } from '../shared/FormGrid'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { useAddPopup } from 'state/application/hooks'


export const IssuanceVettingForm = () => {
  const theme = useTheme()
  const history = useHistory()
  const getId = useGetFieldArrayId()

  const loader = useLoader(false)
  const addPopup = useAddPopup()
  
  const [isSafeToClose, setIsSafeToClose] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)

  const onConfirmationClose = React.useCallback(() => {
    setIsSafeToClose(true)
    setShowCloseDialog(false)
  }, [])

  const alertUser = React.useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = true

    if (!isSafeToClose) {
      setShowCloseDialog(true)
    }
    
    return isSafeToClose
  }, [])

  const issuanceId = React.useMemo(() => {
    const value = decodeURI(history.location.search).replace('?', '').split('&')
      .map(x => x.split('='))
      .map(([key, value]) => ({ key, value }))
      .find(x => x.key === 'id')
      ?.value

    if (!value) {
      return
    }

    return Number(value)
  }, [history.location.search])

  const initialValues = useVettingFormInitialValues(issuanceId)

  const createVetting = useSubmitVettingForm(issuanceId)
  const saveDraftVetting = useSaveVettingDraft(issuanceId)

  const goBack = React.useCallback(() =>{
    if (isSafeToClose) {
      history.push(`/issuance/create?id=${issuanceId}`)
    } else {
      setShowCloseDialog(true)
    }
  }, [history, issuanceId])

  const textFilter = React.useCallback((value: string) => value.split('').filter(x => /[a-zA-Z0-9 .,!?"'/\[\]+\-#$%&@:;]/.test(x)).join(''), [])

  const submit = React.useCallback(async (values: VettingFormValues) => {
    loader.start()

    try {
      await createVetting(values, initialValues.data!, initialValues.vettingId)

      addPopup({ info: { success: true, summary: 'Vetting created successfully' }})
      goBack();
    } catch (err) {
      addPopup({ info: { success: false, summary: `Error occured: ${err}` }})
    } finally {
      loader.stop()
    }
  }, [initialValues.data, initialValues.vettingId])

  const resetForm = React.useCallback(async (values: VettingFormValues) => {
    values = {} as VettingFormValues
  }, [initialValues.data, initialValues.vettingId])

  const saveDraft = React.useCallback(async (values: VettingFormValues) => {
    loader.start()

    try {
      await saveDraftVetting(values, initialValues.data!, initialValues.vettingId)

      addPopup({ info: { success: true, summary: 'Draft saved successfully' }})
      goBack();
    } catch (err) {
      addPopup({ info: { success: false, summary: `Error occured: ${err}` }})
    } finally {
      loader.stop()
    }
  }, [initialValues.data, initialValues.vettingId])

  React.useEffect(() => {
    const listener = () => true
    
    window.addEventListener('beforeunload', alertUser)
  
    return () => window.removeEventListener('beforeunload', alertUser)
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

  return (
    <Formik initialValues={initialValues.data!} onSubmit={submit} validationSchema={schema} onReset={resetForm}>
      {({ submitForm, setFieldValue, values, handleReset, errors }) => (
        <FormContainer>
          <CloseConfirmation
            isOpen={showCloseDialog}
            onDiscard={()=> history.push(`/issuance/create?id=${issuanceId}`)}
            onClose={onConfirmationClose}
            onSave={() => saveDraft(values)}/>

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

            {initialValues?.data?.changesRequested && (
              <RejectInfo
                message={initialValues?.data?.changesRequested}
                vettingId={issuanceId}
                onClear={handleReset}
                onSubmit={submitForm}
                onContactUs={() => console.log('contact us!')}/>)}

            <FormSubmitContainer>
              <OutlineButton onClick={() => saveDraft(values)}>Save Draft</OutlineButton>

              <FilledButton onClick={submitForm}>Submit</FilledButton>
            </FormSubmitContainer>
          </FormSideBar>
      
          <FormBody>
            <IssuerInfoBlock>
              <FormField 
                label="Applicant's Full Name"
                placeholder="Full name of the Applicant"
                field="applicantFullName"
                setter={setFieldValue} 
                value={values.applicantFullName}
                error={errors.applicantFullName}
                inputFilter={textFilter}
              />

              <FormField
                label="Email Address"
                placeholder="Email Address"
                field="email"
                setter={setFieldValue} 
                value={values.email}
                error={errors.email}
                inputFilter={textFilter}
              />

              <FormField
                label="Name of Company"
                placeholder="Name of your company"
                field="companyName"
                setter={setFieldValue}
                value={values.companyName}
                error={errors.companyName}
                inputFilter={textFilter}
              />

              <FormField
                label="Company Website"
                placeholder="Company Website"
                field="companyWebsite"
                setter={setFieldValue}
                value={values.companyWebsite}
                error={errors.companyWebsite}
                inputFilter={textFilter}
              />
            </IssuerInfoBlock>

            <Separator />

            <DescriptionBlock>
              <FileField
                label="Upload the company’s pitch deck"
                field="document.pitchDeck"
                setter={setFieldValue}
                value={values.document.pitchDeck}
                error={errors.document?.pitchDeck as string}
              />


              <FieldArray name="fundingDocuments">
                {({ push, handleRemove }) => (
                  <>
                    <AdditionalFiles>
                      <Hint>
                        Upload additional documents relevant to the funding objective. (Optional)
                      </Hint>

                      <AddDocumentButton padding="0" onClick={() => push({ id: getId() })}>
                        <Plus size="14" /> Add Document
                      </AddDocumentButton>
                    </AdditionalFiles>

                    <FundingDocumentsGrid>
                      {values.fundingDocuments.map((entry, idx) => (
                        <FileField 
                          key={entry.id}
                          value={entry.file}
                          field={`fundingDocuments[${idx}].file`}
                          setter={setFieldValue} 
                          trailing={
                            <DeleteButton onClick={handleRemove(idx)}>
                              <Trash />
                            </DeleteButton>
                          }
                        />
                      ))}
                    </FundingDocumentsGrid>
                  </>
                )}
              </FieldArray>

              <TextareaField 
                label="Description"
                placeholder="Short description of the company/offering"
                field="description"
                setter={setFieldValue}
                span={3}
                value={values.description}
                error={errors.description}
              />
            </DescriptionBlock>
            
            <Separator />

            <FilesBlock>
              <FileField 
                label="Certificate of Incorporation"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="document.certificateOfIncorporation"
                value={values.document.certificateOfIncorporation}
                error={errors.document?.certificateOfIncorporation as string}
                setter={setFieldValue}
              />
              <FileField 
                optional
                label="Certificate of Incumbency"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="document.certificateOfIncumbency"
                value={values.document.certificateOfIncumbency}
                error={errors.document?.certificateOfIncumbency as string}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Share & Director Registry"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="document.shareDirectorRegistry"
                value={values.document.shareDirectorRegistry}
                error={errors.document?.shareDirectorRegistry as string}
                setter={setFieldValue}
              />
              <FileField 
                optional
                label="Copy of Audited Financials"
                hint="Document must cover the last 3 years or the most recent financials dated within the last 12 months. Not applicable to licensed entities"
                field="document.auditedFinancials"
                value={values.document.auditedFinancials}
                error={errors.document?.auditedFinancials as string}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Memorandum and Article of Association Company Constitution"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="document.memorandumArticle"
                value={values.document.memorandumArticle}
                error={errors.document?.memorandumArticle as string}
                setter={setFieldValue}
              />
              <FileField 
                label="Ownership Structure"
                hint={<ExampleLink>See Examples</ExampleLink>}
                field="document.ownershipStructure"
                value={values.document.ownershipStructure}
                error={errors.document?.ownershipStructure as string}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Resolution of Authorized Signatory List"
                hint="Document must include specimen signatures or equivalent"
                field="document.resolutionAuthorizedSignatory"
                value={values.document.resolutionAuthorizedSignatory}
                error={errors.document?.resolutionAuthorizedSignatory as string}
                setter={setFieldValue}
              />
            </FilesBlock>

            <Separator />

            <DirectorField 
              directorTitle='Beneficial Owner'
              directors={values.beneficialOwners}
              setter={setFieldValue} 
              field="beneficialOwners"
              errors={errors as { [key: string]: string }}
            />

            <DirectorField 
              directorTitle='Director'
              directors={values.directors}
              setter={setFieldValue}
              field="directors"
              errors={errors as { [key: string]: string }}
            />

            <Row justifyContent='flex-end' alignItems="center" gap="1.5rem">
              <OutlineButton width="280px">Back</OutlineButton>
              <FilledButton width="280px" onClick={submitForm}>Submit</FilledButton>
            </Row>
          </FormBody>
      </FormContainer>
      )}
    </Formik>
  )
}


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
    ". . ."
    "description description";

  gap: 2.5rem 1rem;

  align-items: end;
`

const AdditionalFiles = styled(FormGrid)`
  padding-top: 2.75rem;
  place-self: start;
`

const AddDocumentButton = styled(OutlineButton)``

const Hint = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  text-align: right;

  color: #8D8DA3;
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

  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.primary};
`

const FundingDocumentsGrid = styled(FormGrid)`
  grid-column: span 3;

  gap: 0.5rem 2rem;
`
