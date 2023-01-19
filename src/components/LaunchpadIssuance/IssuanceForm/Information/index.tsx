import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

import { Formik, FormikProps } from 'formik'

import { InformationFormValues } from './types'

import { countriesList } from 'constants/countriesList'

import { Row, Separator, Spacer } from 'components/LaunchpadMisc/styled'
import { OutlineButton, FilledButton } from 'components/LaunchpadMisc/buttons'
import { Checkbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'

import { FormGrid } from '../shared/FormGrid'
import { FormField } from '../shared/fields/FormField'
import { ImageField } from '../shared/fields/ImageField'
import { DropdownField } from '../shared/fields/DropdownField'
import { TextareaField } from '../shared/fields/TextareaField'
import { CloseConfirmation } from '../shared/CloseConfirmation'
import { DateRangeField } from '../shared/fields/DateRangeField'
import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, FormSubmitContainer } from '../shared/styled'

import { FAQBlock } from './FAQ'
import { GalleryBlock } from './Gallery'
import { TeamMembersBlock } from './TeamMembers'
import { UploadDocuments } from './UploadDocuments'
import { RejectionReasons } from './RejectionReasons'
import { AdditionalInformation } from './AdditionalInformation'

import { schema } from './schema'

import { 
  initialValues,
  industryOptions,
  tokenTypeOptions,
  networkOptions,
  standardOptions,
  distributionFrequencyOptions,
  investmentStructureOptions 
} from './util'

interface Props {
  edit?: boolean
}

export const IssuanceInformationForm: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()

  const form = React.useRef<FormikProps<InformationFormValues>>(null)

  const [isSafeToClose, setIsSafeToClose] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)
  
  const countries = React.useMemo(() => {
    return countriesList
      ?.map((name, index) => ({ value: ++index, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const onConfirmationClose = React.useCallback(() => {
    setIsSafeToClose(true)
    setShowCloseDialog(false)
  }, [])

  const submit = React.useCallback((values: InformationFormValues) => {
    console.log('submitted')
  }, [])
  
  const goBack = React.useCallback(() => {
    if (isSafeToClose) {
      history.push('/issuance/create')
    } else {
      setShowCloseDialog(true)
    }
  }, [history])

  const alertUser = React.useCallback((event: BeforeUnloadEvent) => {
    console.log(event)

    event.preventDefault()
    event.returnValue = true

    if (!isSafeToClose) {
      setShowCloseDialog(true)

    }
    
    return isSafeToClose
  }, [])

  const textFilter = React.useCallback((value: string) => value.split('').filter(x => /[a-zA-Z .,!?"'/\[\]+\-#$%&]/.test(x)).join(''), [])
  const numberFilter = React.useCallback((value: string) => {
    const [whole, ...decimals] = value
      .split('')
      .filter(x => /[0-9.]/.test(x))
      .join('')
      .split('.')

    return whole + (decimals.length > 0 ? `.${decimals.join('')}` : '')

  }, [])

  const setPresale = React.useCallback((value: boolean, setter: (field: string, value: any) => void) => {
    setter('hasPresale', value)

    setter('terms.whitelist', undefined)
    setter('terms.presale', undefined)
    setter('terms.sale', undefined)
    setter('terms.closed', undefined)
    setter('terms.claim', undefined)
  }, [])

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  return (
    <FormContainer>
      <CloseConfirmation isOpen={showCloseDialog} onClose={onConfirmationClose} />

      <FormHeader>
        <OutlineButton background={theme.launchpad.colors.background} onClick={goBack} padding="1rem 0.75rem">
          <ArrowLeft color={theme.launchpad.colors.primary} />
        </OutlineButton>

        <FormTitle>Information</FormTitle>
      </FormHeader>

      <Formik innerRef={form} initialValues={initialValues}  onSubmit={submit} validationSchema={schema}>
        {({ values, errors, setFieldValue, submitForm }) => (
          <>
            <FormSideBar>
              {Object.keys(form.current?.errors ?? {}).length > 0 && <RejectionReasons />}
              
              
              <FormSubmitContainer>
                {!props.edit && <OutlineButton>Save Draft</OutlineButton>}

                <OutlineButton>Review</OutlineButton>
                <FilledButton onClick={submitForm}>Submit</FilledButton>
              </FormSubmitContainer>
            </FormSideBar>
            <FormBody>
              <ImageBlock>
                <ImageField 
                  label='Profile Picture'
                  image={values.profilePicture}
                  field='profilePicture'
                  setter={setFieldValue}
                />
                
                <ImageField 
                  label='Deal Cards Image'
                  image={values.cardPicture}
                  field='cardPicture'
                  setter={setFieldValue}
                />
              </ImageBlock>

              <TextareaField 
                label='Short Description'
                placeholder='A brief description on your deal card. 120-150 characters.'
                field='shortDescription'
                setter={setFieldValue}
              />

              <FormGrid>
                <FormField 
                  field="name"
                  setter={setFieldValue}
                  label="Name of Issuance"
                  placeholder='Name of Issuance'
                  disabled={props.edit}
                />

                <FormField
                  field="companyId"
                  setter={setFieldValue}
                  label="Company Identification Number"
                  placeholder='Company Identification Number'
                  disabled={props.edit}
                />

                <DropdownField 
                  field="industry"
                  setter={setFieldValue}
                  label="Industry"
                  options={industryOptions}
                />

                <DropdownField
                  field="investmentStructure"
                  setter={setFieldValue}
                  label="Investment Type"
                  options={investmentStructureOptions}
                />

                <DropdownField
                  field="country"
                  setter={setFieldValue}
                  label="Deal Country"
                  options={countries}
                  searchable
                />
              </FormGrid>
              
              <Separator />

              <FormGrid title="Tokenomics">
                <FormField
                  field='tokenName'
                  setter={setFieldValue}
                  label='Token Name'
                  placeholder='Must be the same as the issuance name'
                  disabled={props.edit}
                />
                <FormField
                  field='tokenTicker'
                  setter={setFieldValue}
                  label='Token Ticker'
                  placeholder='2-6 alphanumeric characters'
                  disabled={props.edit}
                />
                
                <DropdownField
                  field='tokenType'
                  setter={setFieldValue}
                  options={tokenTypeOptions}
                  label='Token to Make Issuance in'
                  placeholder='Token Type'
                  disabled={props.edit}
                />
                <DropdownField
                  field='network'
                  setter={setFieldValue}
                  options={networkOptions}
                  label='Blockchain Network'
                  placeholder='Blockchain Network'
                  disabled={props.edit}
                />
                
                <FormField
                  field='hardCap'
                  setter={setFieldValue}
                  label='Total Amount to Raise (Amount in the selected token type)'
                  placeholder='Total Amount to Raise'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                />
                <FormField
                  field='softCap'
                  setter={setFieldValue}
                  label='Minimum Amount to Raise'
                  placeholder='Minimum Amount to Raise'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                />
                
                <FormField
                  field='pricePerToken'
                  setter={setFieldValue}
                  label='Price per Token'
                  placeholder='Price per Token'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                />
                <DropdownField
                  field='tokenStandard'
                  setter={setFieldValue}
                  options={standardOptions}
                  label='Token Standard'
                  placeholder='Token Standard'
                  disabled={props.edit}
                />
                
                <FormField
                  field='minInvestment'
                  setter={setFieldValue}
                  label='Minimum Investment per Investor'
                  placeholder='No. of Tokens'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                />
                <FormField
                  field='maxInvestment'
                  setter={setFieldValue}
                  label='MaximumInvestment per Investor'
                  placeholder='No. of Tokens'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                />

                <Row gap="1rem">
                  <Checkbox checked />

                  <TokenAgreementText>
                    I understand and agree that once I submit this form and it is approved, IX Swap will
                    mint and deposit the tokens into a smart contract based on the information provided.
                  </TokenAgreementText>
                </Row>

              </FormGrid>
              
              <Separator />
              
              <FormGrid title="Pre-Sale">
                <PresalveFieldContainer disabled={props.edit}>
                  <PresaleFieldLabel>
                    Do you wish to apply a {'"Pre-Sale"'} stage to this deal? 
                  </PresaleFieldLabel>

                  <Spacer />

                  <PresaleButton isSelected={values.hasPresale === true} onClick={() => props.edit && setPresale(true, setFieldValue)}>
                    Yes
                  </PresaleButton>
                  
                  <PresaleButton isSelected={values.hasPresale === false} onClick={() => props.edit && setPresale(false, setFieldValue)}>
                    No
                  </PresaleButton>
                </PresalveFieldContainer>

                <FormField 
                  disabled={props.edit || !values.hasPresale}
                  field="presaleAlocated" 
                  setter={setFieldValue}
                  label="Pre-Sale Allocation"
                  placeholder='Total fundraising amount allocated for Pre-Sale'
                  inputFilter={numberFilter}
                />

                <FormField
                  disabled={props.edit || !values.hasPresale}
                  field="presaleMaxInvestment"
                  setter={setFieldValue}
                  label="Maximum Investment per Investor"
                  placeholder='No. of Tokens' 
                  inputFilter={numberFilter}
                />

                <FormField 
                  disabled={props.edit || !values.hasPresale}
                  field="presaleMinInvestment"
                  setter={setFieldValue}
                  label="Minimum Investment per Investor" 
                  placeholder='No. of Tokens' 
                  inputFilter={numberFilter}
                />
              </FormGrid>

              <Separator />

              <FormGrid 
                title="Timeline" 
                description={
                  <>
                    The timeline will be in the following order: 
                    Register to Invest {'>'} Pre-Sale {'>'} Public Sale {'>'} Token Claim. 
                    Exclude the Pre-Sale stage if you decide to not include this.
                  </>
                }
              >

                <DateRangeField 
                  mode='single'
                  label='Register to Invest'
                  field='terms.whitelist'
                  setter={setFieldValue}
                  value={values.terms.whitelist}
                  disabled={props.edit}
                />

                <DateRangeField 
                  mode='single'
                  label='Pre-Sale'
                  field='terms.presale'
                  setter={setFieldValue}
                  value={values.terms.presale}
                  disabled={props.edit || !values.hasPresale || !values.terms.whitelist}
                  minDate={values.terms.whitelist}
                />

                {/* <div style={{ color: 'black'}}>
                  {values.hasPresale?.toString() ?? 'not set'}
                  {values.terms.whitelist?.toString() ?? 'not set'}
                  {values.terms.presale?.toString() ?? 'not set'}
                </div> */}
                
                <DateRangeField 
                  mode='range'
                  label='Public Sale to Closed'
                  field='terms.sale'
                  value={[values.terms.sale, values.terms.closed].filter(x => !!x).map(x => moment(x))}
                  disabled={props.edit || (values.hasPresale && !values.terms.presale) || (!values.hasPresale && !values.terms.whitelist)}
                  minDate={values.hasPresale ? values.terms.presale : values.terms.whitelist}
                  onChange={([start, end]) => {
                    setFieldValue('terms.sale', start?.toDate())
                    setFieldValue('terms.closed', end?.toDate())
                  }}
                />

                <DateRangeField
                  mode='single'
                  label='Token Claim'
                  field='terms.claim'
                  setter={setFieldValue}
                  disabled={props.edit || !values.terms.closed}
                  minDate={values.terms.closed}
                  value={values.terms.claim}
                />

              </FormGrid>

              <Separator />

              <FormGrid title="Offering Terms">
                <FormField field='investmentStructure' setter={setFieldValue} label='Investment Structure' placeholder='Holding Structure' disabled={props.edit} />
                <FormField field='dividendYield' setter={setFieldValue} label='Dividend Yield' placeholder='In Percent' optional disabled={props.edit} />
                <FormField field='investmentPeriod' setter={setFieldValue} label='Investment Period' placeholder='In months' optional disabled={props.edit} />
                <FormField field='grossIrr' setter={setFieldValue} label='Gross IRR (%)' placeholder='In percent' optional disabled={props.edit} />

                <DropdownField 
                  span={2}
                  label="Distribution Frequency"
                  placeholder='Frequency of return distribution'
                  
                  field="distributionFrequency"
                  setter={setFieldValue}
                  options={distributionFrequencyOptions}
                  optional

                  disabled={props.edit}
                />
              </FormGrid>
              
              <Separator />
              
              <AdditionalInformation social={values.social} setter={setFieldValue} errors={errors} />
              
              <Separator />
              
              <UploadDocuments documents={values.additionalDocuments} setter={setFieldValue} />
              
              <Separator />
              
              <GalleryBlock images={values.images} videos={values.videos}  setter={setFieldValue} errors={errors} />
              
              <Separator />

              <FormGrid title="Team Members">
                <TeamMembersBlock members={values.members} setter={setFieldValue} />
              </FormGrid>
              
              <Separator />
              
              <FormGrid title="FAQ">
                <FAQBlock faq={values.faq} setter={setFieldValue} />
              </FormGrid>
            </FormBody>
          </>
        )}
      </Formik>

    </FormContainer>
  )
}

const ImageBlock = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 240px;

  gap: 1.5rem;

  place-content: stretch;
`

const TokenAgreementText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const PresalveFieldContainer = styled.div<{ disabled?: boolean }>`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;
  padding: 1rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  ${props => props.disabled && `
    background: ${props.theme.launchpad.colors.foreground};
  `}
`

const PresaleFieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 140%;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const PresaleButton = styled.button<{ isSelected: boolean, disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.theme.launchpad.colors.primary + '33'};
  border-radius: 6px;

  cursor: pointer;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  background: ${props => props.theme.launchpad.colors.background};
  color: ${props => props.theme.launchpad.colors.primary};

  ${props => props.isSelected === true && `
    background: ${props.theme.launchpad.colors.primary};
    color: ${props.theme.launchpad.colors.text.light};
  `}

  ${props => props.disabled && `
    background: ${props.theme.launchpad.colors.foreground};
    cursor: default;
  `}
`
