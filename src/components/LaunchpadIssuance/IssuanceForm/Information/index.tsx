import React from 'react'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

import { Formik, FormikProps } from 'formik'

import { InformationFormValues } from './types'

import { Row, Separator, Spacer } from 'components/LaunchpadMisc/styled'
import { OutlineButton, FilledButton } from 'components/LaunchpadMisc/buttons'
import { Checkbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'

import { OfferDistributionFrequency, OfferIndustry, OfferNetwork, OfferTokenStandart } from 'state/launchpad/types'

import { FormField } from '../shared/fields/FormField'
import { ImageField } from '../shared/fields/ImageField'
import { DropdownField } from '../shared/fields/DropdownField'
import { TextareaField } from '../shared/fields/TextareaField'
import { DateRangeField } from '../shared/fields/DateRangeField'

import { FormGrid } from '../shared/FormGrid'
import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, FormSubmitContainer } from '../shared/styled'
import { RejectionReasons } from './RejectionReasons'
import { CloseConfirmation } from '../shared/CloseConfirmation'
import { TeamMembersBlock } from './TeamMembers'
import { FAQBlock } from './FAQ'

const initialValues = {
  profilePicture: undefined,
  cardPicture: undefined,
  shortDescription: '',
  longDescription: '',
  name: '',
  companyIdNumber: '',
  industry: undefined,
  investmentStructure: undefined,
  country: '',
  tokenName: '',
  tokenTicker: '',
  tokenType: '',
  network: undefined,
  hardCap: '',
  softcap: '',
  pricePerToken: 0,
  tokenStandart: undefined,
  minInvestment: '',
  maxInvestment: '',
  hasPresale: undefined,
  presaleAlocated: '',
  presaleMinInvestment: '',
  presaleMaxInvestment: '',
  additionalDocuments: [],
  members: [{ id: 0 }],
  faq: [{ id: 0 }],
  terms: {
    whitelist: undefined,
    presale: undefined,
    sale: undefined,
    claim: undefined
  }
} as unknown as InformationFormValues

enum OfferTokenType {
  WIXS,
  WBTC,
  WETH,
  MATIC,
  USDC,
  USDT
}

const industryOptions = [
  { label: 'Blockchain', value: OfferIndustry.blockchain },
  { label: 'Energy', value: OfferIndustry.energy },
  { label: 'Finance', value: OfferIndustry.finance },
  { label: 'Gaming', value: OfferIndustry.gaming },
  { label: 'Healthcare', value: OfferIndustry.healthcare },
  { label: 'Real Estate', value: OfferIndustry.realEstate },
  { label: 'Technology', value: OfferIndustry.technology },
  { label: 'Other', value: OfferIndustry.other },
]

const networkOptions = [
  { label: 'Etherium', value: OfferNetwork.ethereum },
  { label: 'Polygon', value: OfferNetwork.polygon },
  { label: 'Kovan', value: OfferNetwork.kovan },
]

const standardOptions = [
  { label: 'ERC20', value: OfferTokenStandart.erc20 },
  { label: 'XTokenLite', value: OfferTokenStandart.xtokenlite },
]

const structureOptions = [
  { label: 'ERC20', value: OfferTokenStandart.erc20 },
  { label: 'XTokenLite', value: OfferTokenStandart.xtokenlite },
]

const tokenTypeOptions = [
  { label: 'WIXS', value: OfferTokenType.WIXS },
  { label: 'WBTC', value: OfferTokenType.WBTC },
  { label: 'WETH', value: OfferTokenType.WETH },
  { label: 'MATIC', value: OfferTokenType.MATIC },
  { label: 'USDC', value: OfferTokenType.USDC },
  { label: 'USDT', value: OfferTokenType.USDT },
]

const distributionFrequencyOptions = [
  { label: 'Monthly', value: OfferDistributionFrequency.monthly },
  { label: 'Quarterly', value: OfferDistributionFrequency.quarterly },
  { label: 'Annually', value: OfferDistributionFrequency.annually },
  { label: 'N/A', value: OfferDistributionFrequency.notApplicable },
  { label: 'Other', value: OfferDistributionFrequency.other },
]

export const IssuanceInformationForm = () => {
  const theme = useTheme()
  const history = useHistory()

  const form = React.useRef<FormikProps<InformationFormValues>>(null)

  const [isSafeToClose, setIsSafeToClose] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)

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

  React.useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  React.useEffect(() => {
    console.log(form.current?.values)
  })

  React.useEffect(() => {
    console.log(form.current?.values)
  }, [JSON.stringify(form.current?.values)])

  return (
    <FormContainer>
      <CloseConfirmation isOpen={showCloseDialog} onClose={onConfirmationClose} />

      <FormHeader>
        <OutlineButton background={theme.launchpad.colors.background} onClick={goBack} padding="1rem 0.75rem">
          <ArrowLeft color={theme.launchpad.colors.primary} />
        </OutlineButton>

        <FormTitle>Information</FormTitle>
      </FormHeader>

      <FormSideBar>
        <RejectionReasons />
        
        <FormSubmitContainer>
          <OutlineButton>Save Draft</OutlineButton>
          <OutlineButton>Review</OutlineButton>

          <FilledButton>Submit</FilledButton>
        </FormSubmitContainer>
      </FormSideBar>

      <Formik innerRef={form} initialValues={initialValues}  onSubmit={submit}>
        {({ values, errors, setFieldValue }) => (
          <FormBody>
            <div style={{ color: 'black' }}>{JSON.stringify(values)}</div>
            <ImageBlock>
              <ImageField 
                label='Profile Picture'
                field='profilePicture'
                setter={setFieldValue}
              />
              
              <ImageField 
                label='Deal Cards Image'
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
              <FormField field="name" setter={setFieldValue} label="Name of Issuance" placeholder='Name of Issuance' />
              <FormField field="companyId" setter={setFieldValue} label="Company Identification Number" placeholder='Company Identification Number' />

              <DropdownField field="industry" setter={setFieldValue} label="Industry" options={industryOptions} />
              <DropdownField field="industry" setter={setFieldValue} label="Investment Structure" options={industryOptions} />
              <DropdownField field="industry" setter={setFieldValue} label="Deal Country" options={industryOptions} />
            </FormGrid>
            
            <Separator />

            <FormGrid title="Pre-Sale">
              <PresalveFieldContainer>
                <PresaleFieldLabel>
                  Do you wish to apply a {'"Pre-Sale"'} stage to this deal? 
                </PresaleFieldLabel>

                <Spacer />

                <PresaleButton isSelected={values.hasPresale === true} onClick={() => setFieldValue('hasPresale', true)}>
                  Yes
                </PresaleButton>
                
                <PresaleButton isSelected={values.hasPresale === false} onClick={() => setFieldValue('hasPresale', false)}>
                  No
                </PresaleButton>
              </PresalveFieldContainer>

              <FormField 
                field="presaleAlocated" 
                setter={setFieldValue}
                label="Pre-Sale Allocation"
                placeholder='Total fundraising amount allocated for Pre-Sale' />

              <FormField
                field="presaleMaxInvestment"
                setter={setFieldValue}
                label="Maximum Investment per Investor"
                placeholder='No. of Tokens' />

              <FormField 
                field="presaleMinInvestment"
                setter={setFieldValue}
                label="Minimum Investment per Investor" 
                placeholder='No. of Tokens' />
            </FormGrid>

            <Separator />

            <FormGrid title="Tokenomics">
              <FormField field='tokenName' setter={setFieldValue} label='Token Name' placeholder='Must be the same as the issuance name' />
              <FormField field='tokenTicker' setter={setFieldValue} label='Token Ticker' placeholder='2-6 alphanumeric characters' />
              
              <DropdownField field='tokenType' setter={setFieldValue} options={tokenTypeOptions} label='Token to Make Issuance in' placeholder='Token Type' />
              <DropdownField field='network' setter={setFieldValue} options={networkOptions} label='Blockchain Network' placeholder='Blockchain Network' />
              
              <FormField field='hardCap' setter={setFieldValue} label='Total Amount to Raise (Amount in the selected token type)' placeholder='Total Amount to Raise' />
              <FormField field='softCap' setter={setFieldValue} label='Minimum Amount to Raise' placeholder='Minimum Amount to Raise' />
              
              <FormField field='pricePerToken' setter={setFieldValue} label='Price per Token' placeholder='Price per Token' />
              <DropdownField field='tokenStandard' setter={setFieldValue} options={standardOptions} label='Token Standard' placeholder='Token Standard' />
              
              <FormField field='minInvestment' setter={setFieldValue} label='Minimum Investment per Investor' placeholder='No. of Tokens' />
              <FormField field='maxInvestment' setter={setFieldValue} label='Maximum Investment per Investor' placeholder='No. of Tokens' />

              <Row gap="1rem">
                <Checkbox checked />

                <TokenAgreementText>
                  I understand and agree that once I submit this form and it is approved, IX Swap will
                  mint and deposit the tokens into a smart contract based on the information provided.
                </TokenAgreementText>
              </Row>

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

              <DateRangeField mode='single' label='Register to Invest' field='terms.whitelist' setter={setFieldValue} />
              <DateRangeField mode='single' label='Pre-Sale' field='terms.presale' setter={setFieldValue} />
              
              <DateRangeField mode='range' label='Public Sale to Closed' field='terms.sale' setter={setFieldValue} />
              <DateRangeField mode='single' label='Token Claim' field='terms.claim' setter={setFieldValue} />

            </FormGrid>

            <Separator />

            <FormGrid title="Offering Terms">
              <FormField field='investmentStructure' setter={setFieldValue} label='Investment Structure' placeholder='Holding Structure' />
              <FormField field='dividendYield' setter={setFieldValue} label='Dividend Yield' placeholder='In Percent' />
              <FormField field='investmentPeriod' setter={setFieldValue} label='Investment Period' placeholder='In months' optional />
              <FormField field='grossIrr' setter={setFieldValue} label='Gross IRR (%)' placeholder='In percent' optional />

              <DropdownField 
                span={2}
                label="Distribution Frequency"
                placeholder='Frequency of return distribution'
                
                field="distributionFrequency"
                setter={setFieldValue}
                options={distributionFrequencyOptions}
                optional
              />
            </FormGrid>
            
            <Separator />

            <FormGrid title="Team Members">
              <TeamMembersBlock members={values.members} setter={setFieldValue} />
            </FormGrid>
            
            <Separator />
            
            <FormGrid title="FAQ">
              <FAQBlock faq={values.faq} setter={setFieldValue} />
            </FormGrid>
          </FormBody>
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

const PresalveFieldContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;
  padding: 1rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const PresaleFieldLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 140%;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const PresaleButton = styled.button<{ isSelected: boolean }>`
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
`
