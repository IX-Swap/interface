import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Formik } from 'formik'

import { useHistory } from 'react-router-dom'
import { ArrowLeft, Plus } from 'react-feather'

import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Row, Separator } from 'components/LaunchpadMisc/styled'

import { VettingFormValues } from './types'

import { FormField } from '../utils/FormField'
import { FileField } from '../utils/FileField'
import { DirectorField } from '../utils/DIrectorFIeld'


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
  beneficialOwners: [],
  directors: []
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
        <OutlineButton>Save Draft</OutlineButton>
        <OutlineButton>Review</OutlineButton>

        <FilledButton>Submit</FilledButton>
      </FormSideBar>
      
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ submitForm, setFieldValue, errors }) => (
          <FormBody>
            <IssuerInfoBlock>
              <FormField label="Applicant's Full Name" field="applicantFullName" setter={setFieldValue} />
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

              <Description>
                ...
              </Description>
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

            <DirectorField directorTitle='Beneficial Owner' setter={setFieldValue} field="beneficialOwners" />
            <DirectorField directorTitle='Director' setter={setFieldValue} field="directors" />

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

const FormContainer = styled.div`
  display: grid;

  grid-template-columns: 855px 325px;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "header header"
    "body sidebar";

  gap: 1.5rem;

  place-content: stretch;

  margin: 2rem auto;
  max-width: 1180px;

  padding-bottom: 10rem;
`

const FormHeader = styled.div`
  grid-area: header;

  display: flex;
  align-items: center;

  gap: 1rem;
`

const FormTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  text-transform: capitalize;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const FormBody = styled.div`
  grid-area: body;

  display: flex;
  flex-flow: column nowrap;

  align-items: stretch;

  gap: 2.5rem;
`

const FormSideBar = styled.div`
  grid-area: sidebar;

  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  gap: 0.5rem;
  padding: 1.5rem;

  max-height: 215px;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
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
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas:
    ". . ."
    "description description description";

  gap: 2.5rem;

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

const Description = styled.div`
  grid-area: description;
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