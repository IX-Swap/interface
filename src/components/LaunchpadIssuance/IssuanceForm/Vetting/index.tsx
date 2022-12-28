import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Formik } from 'formik'

import { useHistory } from 'react-router-dom'
import { ArrowLeft, Plus } from 'react-feather'

import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Row, Separator } from 'components/LaunchpadMisc/styled'

import { VettingFormValues } from './types'

import { FormField } from '../shared/fields/FormField'
import { FileField } from '../shared/fields/FileField'
import { DirectorField } from '../shared/fields/DirectorField'

import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, FormSubmitContainer } from '../shared/styled'
import { TextareaField } from '../shared/fields/TextareaField'


const initialValues = {
  applicantFullname: undefined,
  applicantEmail: undefined,
  companyName: undefined,
  companyWebsite: undefined,
  companyPitchDeck: undefined,
  companyAdditionalFiles: [],
  description: undefined,
  certificateIncorporation: undefined,
  certificateIncumbency: undefined,
  shareDirectorRegistry: undefined,
  copyOfAuditedFinancials: undefined,
  memorandumAndAssociacion: undefined,
  ownershipStructure: undefined,
  authorizedSignatoryList: undefined,
  beneficialOwners: [{ id: 0 }],
  directors: [{ id: 0 }]
} as unknown as VettingFormValues

export const IssuanceVettingForm = () => {
  const theme = useTheme()
  const history = useHistory()
  
  const goBack = React.useCallback(() => history.push('/issuance/create'), [history])

  const submit = React.useCallback((values: VettingFormValues) => {
    console.log('submitted')
  }, [])

  return (
    <FormContainer>
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
              <FormField label="Applicant's Full Name" placeholder="Full name of the Applicant" field="applicantFullName" setter={setFieldValue} />
              <FormField label="Email Address" placeholder="Email Address" field="applicantEmail" setter={setFieldValue} />
              <FormField label="Name of Company" placeholder="Name of your company" field="companyName" setter={setFieldValue} />
              <FormField label="Company Website" placeholder="Company Website" field="companyWebsite" setter={setFieldValue} />
            </IssuerInfoBlock>

            <Separator />

            <DescriptionBlock>
              <FileField label="Upload the company’s pitch deck" field="companyPitchDeck" setter={setFieldValue} />

              <Hint>
                Upload additional documents relevant to the funding objective. (Optional)
              </Hint>

              <OutlineButton padding="0">
                <Plus size="14" /> Add Document
              </OutlineButton>

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
                field="certificateIncorporation"
                error={errors.certificateIncorporation && 'Required'}
                setter={setFieldValue}
              />
              <FileField 
                optional
                label="Certificate of Incumbency"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="certificateIncumbency"
                error={errors.certificateIncumbency && 'Required'}
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
                field="copyOfAuditedFinancials"
                error={errors.copyOfAuditedFinancials && 'Required'}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Memorandum and Article of Association Company Constitution"
                hint="File size should not exceed 5.0 MB. Supported file formats are Docx, PNG, JPG, JPEG and PDF"
                field="memorandumAndAssociacion"
                error={errors.memorandumAndAssociacion && 'Required'}
                setter={setFieldValue}
              />
              <FileField 
                label="Ownership Structure"
                hint={<ExampleLink>See Examples</ExampleLink>}
                field="ownershipStructure"
                // error={errors.ownershipStructure}
                setter={setFieldValue}
              />
              
              <FileField 
                label="Resolution of Authorized Signatory List"
                hint="Document must include specimen signatures or equivalent"
                field="authorizedSignatoryList"
                error={errors.authorizedSignatoryList && 'Required'}
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

  gap: 1rem;

  align-items: end;
`

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