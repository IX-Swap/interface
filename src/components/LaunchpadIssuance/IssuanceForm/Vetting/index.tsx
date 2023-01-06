import React from 'react'
import styled, { useTheme } from 'styled-components'

import { FieldArray, Formik } from 'formik'

import { useHistory } from 'react-router-dom'
import { ArrowLeft, Plus } from 'react-feather'
import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { CenteredFixed, LoaderContainer, Row, Separator } from 'components/LaunchpadMisc/styled'

import { VettingFormValues } from './types'

import { FormField } from '../shared/fields/FormField'
import { FileField } from '../shared/fields/FileField'
import { DirectorField } from '../shared/fields/DirectorField'

import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, FormSubmitContainer, DeleteButton } from '../shared/styled'
import { TextareaField } from '../shared/fields/TextareaField'
import { useGetFieldArrayId, useLoader, useSubmitVettingForm } from 'state/launchpad/hooks'

import { schema } from './schema'
import { FormGrid } from '../shared/FormGrid'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { useAddPopup } from 'state/application/hooks'

const initialValues = {
  applicantFullname: undefined,
  applicantEmail: undefined,
  companyName: undefined,
  companyWebsite: undefined,
  companyPitchDeck: undefined,
  description: undefined,
  certificateIncorporation: undefined,
  certificateIncumbency: undefined,
  shareDirectorRegistry: undefined,
  copyOfAuditedFinancials: undefined,
  memorandumAndAssociacion: undefined,
  ownershipStructure: undefined,
  authorizedSignatoryList: undefined,
  beneficialOwners: [{ id: 0 }],
  directors: [{ id: 0 }],
  fundingDocuments: []
} as unknown as VettingFormValues

export const IssuanceVettingForm = () => {
  const theme = useTheme()
  const history = useHistory()
  const getId = useGetFieldArrayId()

  const loader = useLoader(false)
  const addPopup = useAddPopup()

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
  
  const createVetting = useSubmitVettingForm(issuanceId)
  
  const goBack = React.useCallback(() => history.push(`/issuance/create?id=${issuanceId}`), [history, issuanceId])

  const submit = React.useCallback(async (values: VettingFormValues) => {
    loader.start()

    try {
      await createVetting(values)

      addPopup({ info: { success: true, summary: 'Vetting created successfully' }})
      goBack();
    } catch (err) {
      addPopup({ info: { success: false, summary: `Error occured: ${err}` }})
    } finally {
      loader.stop()
    }

  }, [])

  if (!issuanceId) {
    return null
  }

  return (
    <FormContainer>
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
        <FormSubmitContainer>
          <OutlineButton>Save Draft</OutlineButton>
          <OutlineButton>Review</OutlineButton>

          <FilledButton>Submit</FilledButton>
        </FormSubmitContainer>
      </FormSideBar>
      
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ submitForm, setFieldValue, values, errors }) => (
          <FormBody>
            <IssuerInfoBlock>
              <FormField 
                label="Applicant's Full Name"
                placeholder="Full name of the Applicant"
                field="applicantFullname"
                setter={setFieldValue} 
                error={errors.applicantFullname}
              />

              <FormField
                label="Email Address"
                placeholder="Email Address"
                field="email"
                setter={setFieldValue} 
                error={errors.email}
              />

              <FormField
                label="Name of Company"
                placeholder="Name of your company"
                field="companyName"
                setter={setFieldValue}
                error={errors.companyName}
              />

              <FormField
                label="Company Website"
                placeholder="Company Website"
                field="companyWebsite"
                setter={setFieldValue}
                error={errors.companyWebsite}
              />
            </IssuerInfoBlock>

            <Separator />

            <DescriptionBlock>
              <FileField label="Upload the company’s pitch deck" field="pitchDeck" setter={setFieldValue} />

              <Hint>
                Upload additional documents relevant to the funding objective. (Optional)
              </Hint>

              <FieldArray name="fundingDocuments">
                {({ push, handleRemove }) => (
                  <>
                    <AddDocumentButton padding="0" onClick={() => push({ id: getId() })}>
                      <Plus size="14" /> Add Document
                    </AddDocumentButton>

                    <FundingDocumentsGrid>
                      {values.fundingDocuments.map((entry, idx) => (
                        <FileField 
                          key={entry.id}
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
              />
            </DescriptionBlock>
            
            <Separator />

            <FilesBlock>
              <FileField 
                label="Certificate of Incorporation"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="certificateOfIncorporation"
                error={errors.certificateOfIncorporation && 'Required'}
                setter={setFieldValue}
              />
              <FileField 
                optional
                label="Certificate of Incumbency"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="certificateOfIncumbency"
                error={errors.certificateOfIncumbency && 'Required'}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Share & Director Registry"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="shareDirectorRegistry"
                error={errors.shareDirectorRegistry && 'Required'}
                setter={setFieldValue}
              />
              <FileField 
                optional
                label="Copy of Audited Financials"
                hint="Document must cover the last 3 years or the most recent financials dated within the last 12 months. Not applicable to licensed entities"
                field="auditedFinancials"
                error={errors.auditedFinancials && 'Required'}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Memorandum and Article of Association Company Constitution"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="memorandumArticle"
                error={errors.memorandumArticle && 'Required'}
                setter={setFieldValue}
              />
              <FileField 
                label="Ownership Structure"
                hint={<ExampleLink>See Examples</ExampleLink>}
                field="ownershipStructure"
                error={errors.ownershipStructure && 'File Required'}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Resolution of Authorized Signatory List"
                hint="Document must include specimen signatures or equivalent"
                field="resolutionAuthorizedSignatory"
                error={errors.resolutionAuthorizedSignatory && 'Required'}
                setter={setFieldValue}
              />
            </FilesBlock>

            <Separator />

            <DirectorField directorTitle='Beneficial Owner' directors={values.beneficialOwners} setter={setFieldValue} field="beneficialOwners" />
            <DirectorField directorTitle='Director' directors={values.directors} setter={setFieldValue} field="directors" />

            <Row justifyContent='flex-end' alignItems="center" gap="1.5rem">
              <OutlineButton width="280px">Back</OutlineButton>
              <FilledButton width="280px" onClick={submitForm}>Submit</FilledButton>
            </Row>
          </FormBody>
        )}
      </Formik>
    </FormContainer>
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
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas:
    ". . ."
    "description description description";

  gap: 2.5rem 1rem;

  align-items: end;
`


const AddDocumentButton = styled(OutlineButton)`
  margin-bottom: 1.25rem;
`

const Hint = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  text-align: right;

  color: #8D8DA3;
  
  margin-bottom: 1rem;
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

const RemoveButton = styled(DeleteButton)`
  position: absolute;

  right: 1rem;
`