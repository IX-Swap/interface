import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { useHistory } from 'react-router-dom'
import { ArrowLeft, ChevronUp } from 'react-feather'
import Portal from '@reach/portal'

import { Formik, FormikProps } from 'formik'

import { InformationFormValues } from './types'

import { countriesList } from 'constants/countriesList'

import { Row, Separator, Spacer, LoaderContainer } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OutlineButton, FilledButton } from 'components/LaunchpadMisc/buttons'
import { ConfirmationForm } from 'components/Launchpad/ConfirmForm'
import { Checkbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'

import { FormGrid } from '../shared/FormGrid'
import { FormField } from '../shared/fields/FormField'
import { ImageField } from '../shared/fields/ImageField'
import { DropdownField } from '../shared/fields/DropdownField'
import { TextareaField } from '../shared/fields/TextareaField'
import { CloseConfirmation } from '../shared/CloseConfirmation'
import { DateRangeField } from '../shared/fields/DateRangeField'
import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody, FormSubmitContainer } from '../shared/styled'

import { FAQBlock } from './sections/FAQ'
import { GalleryBlock } from './sections/Gallery'
import { TeamMembersBlock } from './sections/TeamMembers'
import { UploadDocuments } from './sections/UploadDocuments'
import { RejectionReasons } from './sections/RejectionReasons'
import { AdditionalInformation } from './sections/AdditionalInformation'

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
import { useFormatOfferValue, useLoader, useOfferFormInitialValues, useSubmitOffer, useVetting } from 'state/launchpad/hooks'
import { useAddPopup } from 'state/application/hooks'
import { OfferReview } from '../Review'


interface Props {
  edit?: boolean
}

export const IssuanceInformationForm: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const addPopup = useAddPopup()

  const loader = useLoader(false)
  const formatValue = useFormatOfferValue(false)

  const form = React.useRef<FormikProps<InformationFormValues>>(null)

  const [showReview, setShowReview] = React.useState(false)
  const [isSafeToClose, setIsSafeToClose] = React.useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)

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
  }, [])

  const vetting = useVetting(issuanceId)
  const offer = useOfferFormInitialValues(issuanceId)
  
  const countries = React.useMemo(() => {
    return countriesList
      ?.map((name, index) => ({ value: name, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const onConfirmationClose = React.useCallback(() => {
    setIsSafeToClose(true)
    setShowCloseDialog(false)
  }, [])

  const submitOffer = useSubmitOffer()
  const _submit = React.useCallback(async (values: InformationFormValues, draft = false) => {
    loader.start()

    try {
      await submitOffer(values, initialValues, draft, vetting.data?.id)

      addPopup({ info: { success: true, summary: 'Offer created successfully' }})
      goMain();
    } catch (err) {
      addPopup({ info: { success: false, summary: `Error occured: ${err}` }})
    } finally {
      loader.stop()
    }
  }, [vetting.data?.id])

  const saveDraft = React.useCallback((values: InformationFormValues) => _submit(values, true), [_submit])

  const toSubmit = React.useCallback(() => {
    setShowConfirmDialog(true)
  }, [showConfirmDialog])

  const submit = React.useCallback((values: InformationFormValues) => _submit(values, false), [_submit])
  
  const goMain = React.useCallback(() => {
    history.push(`/issuance/create?id=${issuanceId}`)
  }, [history, issuanceId])

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

  const textFilter = React.useCallback((value?: string) => value?.split('').filter(x => /[a-zA-Z .,!?"'/\[\]+\-#$%&]/.test(x)).join(''), []) ?? ''
  const numberFilter = React.useCallback((value?: string) => {
    if (!value) {
      return ''
    }

    const [whole, ...decimals] = value
      .split('')
      .filter(x => /[0-9.]/.test(x))
      .join('')
      .split('.')

    return whole + (decimals.length > 0 ? `.${decimals.join('')}` : '')

  }, [])

  const setPresale = React.useCallback((value: boolean, setter: (field: string, value: any) => void) => {
    setter('timeframe.whitelist', undefined)
    setter('timeframe.presale', undefined)
    setter('timeframe.sale', undefined)
    setter('timeframe.closed', undefined)
    setter('timeframe.claim', undefined)

    setter('hasPresale', value)
  }, [])

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  React.useEffect(() => {
    const listener = () => true
    
    window.addEventListener('beforeunload', listener)
  
    return () => window.removeEventListener('beforeunload', listener)
  }, [])

  return (
    <FormContainer>
      <ScrollToTop onClick={scrollToTop}>
        <ChevronUp color={theme.launchpad.colors.foreground} size="20" />
      </ScrollToTop>

      <FormHeader>
        <OutlineButton background={theme.launchpad.colors.background} onClick={goBack} padding="1rem 0.75rem">
          <ArrowLeft color={theme.launchpad.colors.primary} />
        </OutlineButton>

        <FormTitle>Information1</FormTitle>
      </FormHeader>

      <Formik innerRef={form} initialValues={initialValues}  onSubmit={submit} validationSchema={schema}>
        {({ values, errors, setFieldValue, submitForm }) => (
          <>
            <ConfirmationForm
              isOpen={showConfirmDialog}
              onClose={()=> setShowConfirmDialog(false)}
              onSave={submitForm}/>

            <CloseConfirmation
              isOpen={showCloseDialog}
              onDiscard={() => history.push(`/issuance/create?id=${issuanceId}`)}
              onClose={onConfirmationClose}
              onSave={() => saveDraft(values)} />

            {showReview && (
              <Portal>
                <OfferReview 
                  values={values}
                  onClose={() => setShowReview(false)}
                  onSubmit={(draft: boolean) => draft ? toSubmit() : _submit(values, draft)}
                />
              </Portal>
            )}

            {loader.isLoading && (
              <LoaderContainer width="100vw" height="100vh">
                <Loader />
              </LoaderContainer>
            )}

            <FormSideBar>
              {/* {Object.keys(errors).length > 0 && <RejectionReasons />} */}
              
              <FormSubmitContainer>
                {!props.edit && <OutlineButton onClick={() => saveDraft(values)}>Save Draft</OutlineButton>}

                <OutlineButton onClick={() => setShowReview(true)}>Review</OutlineButton>
                <FilledButton onClick={toSubmit}>Submit</FilledButton>
              </FormSubmitContainer>
            </FormSideBar>
            <FormBody>
              <ImageBlock>
                <ImageField 
                  label='Profile Picture'
                  image={values.profilePicture?.file}
                  field='profilePicture'
                  setter={setFieldValue}
                  error={errors.profilePicture as string}
                />
                
                <ImageField 
                  label='Deal Cards Image'
                  image={values.cardPicture?.file}
                  field='cardPicture'
                  setter={setFieldValue}
                  error={errors.cardPicture as string}
                />
              </ImageBlock>

              <TextareaField 
                label='Short Description'
                placeholder='A brief description on your deal card. 120-150 characters.'
                field='shortDescription'
                setter={setFieldValue}
                error={errors.shortDescription}
              />

              <FormGrid>
                <FormField 
                  field="title"
                  setter={setFieldValue}
                  label="Name of Issuance"
                  placeholder='Name of Issuance'
                  disabled={props.edit}
                  error={errors.title}
                />

                <FormField
                  field="issuerIdentificationNumber"
                  setter={setFieldValue}
                  label="Company Identification Number"
                  placeholder='Company Identification Number'
                  disabled={props.edit}
                  error={errors.issuerIdentificationNumber}
                />

                <DropdownField 
                  field="industry"
                  setter={setFieldValue}
                  label="Industry"
                  options={industryOptions}
                  error={errors.industry}
                />

                <DropdownField
                  field="investmentType"
                  setter={setFieldValue}
                  label="Investment Type"
                  options={investmentStructureOptions}
                  error={errors.investmentType}
                />

                <DropdownField
                  field="country"
                  setter={setFieldValue}
                  label="Deal Country"
                  options={countries}
                  searchable
                  error={errors.country}
                />

                <Row gap="1rem" alignItems="center" margin="1rem 0 2rem 0">
                  <Checkbox checked={values.allowOnlyAccredited} />

                  <AccreditedInvestorsLabel>
                    Accredited investors only
                  </AccreditedInvestorsLabel>
                </Row>
              </FormGrid>
              
              <Separator />

              <FormGrid title="Tokenomics">
                <FormField
                  field='tokenName'
                  setter={setFieldValue}
                  label='Token Name'
                  placeholder='Must be the same as the issuance name'
                  disabled={props.edit}
                  error={errors.tokenName}
                />
                <FormField
                  field='tokenTicker'
                  setter={setFieldValue}
                  label='Token Ticker'
                  placeholder='2-6 alphanumeric characters'
                  disabled={props.edit}
                  error={errors.tokenTicker}
                />
                
                <DropdownField
                  field='tokenType'
                  setter={setFieldValue}
                  options={tokenTypeOptions}
                  label='Token to Make Issuance in'
                  placeholder='Token Type'
                  disabled={props.edit}
                  error={errors.tokenType}
                />
                <DropdownField
                  field='network'
                  setter={setFieldValue}
                  options={networkOptions}
                  label='Blockchain Network'
                  placeholder='Blockchain Network'
                  disabled={props.edit}
                  error={errors.network}
                />
                
                <FormField
                  field='hardCap'
                  setter={setFieldValue}
                  label='Total Amount to Raise (Amount in the selected token type)'
                  placeholder='Total Amount to Raise'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                  error={errors.hardCap}
                />
                <FormField
                  field='softCap'
                  setter={setFieldValue}
                  label='Minimum Amount to Raise'
                  placeholder='Minimum Amount to Raise'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                  error={errors.softCap}
                />
                
                <FormField
                  field='tokenPrice'
                  setter={setFieldValue}
                  label='Price per Token'
                  placeholder='Price per Token'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                  error={errors.tokenPrice}
                />
                <DropdownField
                  field='tokenStandart'
                  setter={setFieldValue}
                  options={standardOptions}
                  label='Token Standard'
                  placeholder='Token Standard'
                  disabled={props.edit}
                  error={errors.tokenStandart}
                />
                
                <FormField
                  field='minInvestment'
                  setter={setFieldValue}
                  label='Minimum Investment per Investor'
                  placeholder='No. of Tokens'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                  error={errors.minInvestment}
                />
                <FormField
                  field='maxInvestment'
                  setter={setFieldValue}
                  label='MaximumInvestment per Investor'
                  placeholder='No. of Tokens'
                  inputFilter={numberFilter}
                  disabled={props.edit}
                  error={errors.maxInvestment}
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

                  <PresaleButton isSelected={values.hasPresale === true} onClick={() => setPresale(true, setFieldValue)}>
                    Yes
                  </PresaleButton>
                  
                  <PresaleButton isSelected={values.hasPresale === false} onClick={() => setPresale(false, setFieldValue)}>
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
                  error={errors.presaleAlocated}
                />

                <FormField
                  disabled={props.edit || !values.hasPresale}
                  field="presaleMaxInvestment"
                  setter={setFieldValue}
                  label="Maximum Investment per Investor"
                  placeholder='No. of Tokens' 
                  inputFilter={numberFilter}
                  error={errors.presaleMaxInvestment}
                />

                <FormField 
                  disabled={props.edit || !values.hasPresale}
                  field="presaleMinInvestment"
                  setter={setFieldValue}
                  label="Minimum Investment per Investor" 
                  placeholder='No. of Tokens' 
                  inputFilter={numberFilter}
                  error={errors.presaleMinInvestment}
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
                  field='timeframe.whitelist'
                  setter={setFieldValue}
                  value={values.timeframe.whitelist}
                  disabled={props.edit || !values.hasPresale}
                  error={errors.timeframe?.whitelist as string}
                />

                <DateRangeField 
                  mode='single'
                  label='Pre-Sale'
                  field='timeframe.presale'
                  setter={setFieldValue}
                  value={values.timeframe.presale}
                  disabled={props.edit || !values.hasPresale || !values.timeframe.whitelist}
                  minDate={values.timeframe.whitelist}
                  error={errors.timeframe?.presale as string}
                />

                {/* <div style={{ color: 'black'}}>
                  {values.hasPresale?.toString() ?? 'not set'}
                  {values.terms.whitelist?.toString() ?? 'not set'}
                  {values.terms.presale?.toString() ?? 'not set'}
                </div> */}
                
                <DateRangeField 
                  mode='range'
                  label='Public Sale to Closed'
                  field='timeframe.sale'
                  value={[values.timeframe.sale, values.timeframe.closed].filter(x => !!x).map(x => moment(x))}
                  disabled={props.edit || (values.hasPresale && !values.timeframe.presale)}
                  minDate={values.hasPresale ? values.timeframe.presale : undefined}
                  onChange={([start, end]) => {
                    setFieldValue('timeframe.sale', start)
                    setFieldValue('timeframe.closed', end)
                  }}
                  error={errors.timeframe?.sale as string}
                />

                <DateRangeField
                  mode='single'
                  label='Token Claim'
                  field='timeframe.claim'
                  setter={setFieldValue}
                  disabled={props.edit || !values.timeframe.closed}
                  minDate={values.timeframe.closed}
                  value={values.timeframe.claim}
                  error={errors.timeframe?.claim as string}
                />

              </FormGrid>

              <Separator />

              <FormGrid title="Offering Terms">
                <FormField 
                  field='terms.investmentStructure'
                  setter={setFieldValue}
                  label='Investment Structure'
                  placeholder='Holding Structure'
                  disabled={props.edit}
                  error={errors.terms?.investmentStructure}
                />
                <FormField
                  field='terms.dividendYield'
                  setter={setFieldValue}
                  label='Dividend Yield'
                  placeholder='In Percent'
                  optional
                  disabled={props.edit}
                  error={errors.terms?.dividentYield}
                  inputFilter={formatValue}
                />
                <FormField
                  field='terms.investmentPeriod'
                  setter={setFieldValue}
                  label='Investment Period'
                  placeholder='In months'
                  optional
                  disabled={props.edit}
                  error={errors.terms?.investmentPeriod}
                  inputFilter={formatValue}
                />
                <FormField
                  field='terms.grossIrr'
                  setter={setFieldValue}
                  label='Gross IRR (%)'
                  placeholder='In percent'
                  optional
                  disabled={props.edit}
                  error={errors.terms?.grossIrr}
                  inputFilter={formatValue}
                />

                <DropdownField 
                  span={2}
                  label="Distribution Frequency"
                  placeholder='Frequency of return distribution'
                  
                  field="distributionFrequency"
                  setter={setFieldValue}
                  options={distributionFrequencyOptions}
                  optional

                  disabled={props.edit}
                  error={errors.terms?.distributionFrequency}
                />
              </FormGrid>
              
              <Separator />
              
              <AdditionalInformation social={values.social} setter={setFieldValue} errors={errors} />
              
              <Separator />
              
              <UploadDocuments documents={values.additionalDocuments} setter={setFieldValue} errors={errors}/>
              
              <Separator />
              
              <GalleryBlock images={values.images} videos={values.videos}  setter={setFieldValue} errors={errors} />
              
              <Separator />

              <TeamMembersBlock members={values.members} setter={setFieldValue} errors={errors} />
              
              <Separator />
              
              <FAQBlock faq={values.faq} setter={setFieldValue} errors={errors} />
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

const AccreditedInvestorsLabel = styled(TokenAgreementText)`
  font-size: 14px;
`

const ScrollToTop = styled.button`
  position: fixed;

  bottom: 1rem;
  right: 10rem;

  background: ${props => props.theme.launchpad.colors.primary};
  border-radius: 50%;

  display: grid;

  place-content: center;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 0.75rem;
`
