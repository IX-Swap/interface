import React, { useMemo } from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { getData } from 'country-list'

import { useHistory } from 'react-router-dom'
import { ArrowLeft, ChevronUp } from 'react-feather'
import Portal from '@reach/portal'

import { Formik, FormikProps } from 'formik'

import { InformationFormValues } from './types'

import { Column, Row, Separator, Spacer, LoaderContainer } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { OutlineButton, FilledButton } from 'components/LaunchpadMisc/buttons'
import { ConfirmationForm } from 'components/Launchpad/ConfirmForm'
import { BaseCheckboxWithLabel } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'

import { FormGrid } from '../shared/FormGrid'
import { FormField } from '../shared/fields/FormField'
import { ImageField } from '../shared/fields/ImageField'
import { DropdownField } from '../shared/fields/DropdownField'
import { TextareaField } from '../shared/fields/TextareaField'
import { CloseConfirmation } from '../shared/CloseConfirmation'
import { DateRangeField } from '../shared/fields/DateRangeField'
import { RejectInfo } from '../shared/RejectInfo'
import { FormContainer, FormHeader, FormTitle, FormSideBar, FormBody } from '../shared/styled'

import { FAQBlock } from './sections/FAQ'
import { GalleryBlock } from './sections/Gallery'
import { TeamMembersBlock } from './sections/TeamMembers'
import { UploadDocuments } from './sections/UploadDocuments'
// import { RejectionReasons } from './sections/RejectionReasons'
import { AdditionalInformation } from './sections/AdditionalInformation'

import { schema, editSchema } from './schema'

import {
  initialValues,
  industryOptions,
  tokenTypeOptions,
  networkOptions,
  standardOptions,
  distributionFrequencyOptions,
  investmentStructureOptions,
} from './util'
import {
  useMinimalOfferEdit,
  useLoader,
  useOfferFormInitialValues,
  useSubmitOffer,
  useVetting,
} from 'state/launchpad/hooks'
import { useAddPopup } from 'state/application/hooks'
import { OfferReview } from '../Review'
import { IssuanceStatus, SMART_CONTRACT_STRATEGIES } from 'components/LaunchpadIssuance/types'
import { useQueryParams } from 'hooks/useParams'
import { getDaysAfter, getDaysBefore } from 'utils/time'
import { text1, text44 } from 'components/LaunchpadMisc/typography'
import { filterNumberWithDecimals, integerNumberFilter, numberFilter, uppercaseFilter } from 'utils/input'
import { useRole } from 'state/user/hooks'
import { IssuanceActionButtons } from './sections/IssuanceActionButtons'
import { isDraftDisabled, isSubmitDisabled } from 'components/LaunchpadIssuance/utils/form'
import { OfferTokenStandart } from 'state/launchpad/types'
import { IssuanceTooltip } from '../shared/fields/IssuanceTooltip'

interface Props {
  edit?: boolean
}

export const IssuanceInformationForm: React.FC<Props> = (props) => {
  const theme = useTheme()
  const history = useHistory()
  const addPopup = useAddPopup()
  const { isAdmin } = useRole()

  const loader = useLoader(false)

  const form = React.useRef<FormikProps<InformationFormValues>>(null)

  const [showReview, setShowReview] = React.useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [showCloseDialog, setShowCloseDialog] = React.useState(false)
  const [isReset, setReset] = React.useState(false)
  const {
    objectParams: { id: issuanceId },
  } = useQueryParams<{ id: number }>(['id'])

  const vetting = useVetting(issuanceId)
  const smartContractStrategy = vetting.data?.smartContractStrategy
  const offer = useOfferFormInitialValues(issuanceId, smartContractStrategy)

  const validationSchema = React.useMemo(() => (props.edit ? editSchema : schema), [props.edit])
  const countries = React.useMemo(() => {
    return getData().map((country) => ({ value: country.code, label: country.name }))
  }, [])

  const onConfirmationClose = React.useCallback(() => {
    setShowCloseDialog(false)
  }, [])

  const submitOffer = useSubmitOffer()
  const editOffer = useMinimalOfferEdit()

  const isFullEdit = useMemo(() => {
    let res = false
    if (offer.data?.status) {
      res =
        [IssuanceStatus.draft, IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(offer.data.status) ||
        (isAdmin && offer.data.status === IssuanceStatus.pendingApproval)
    }
    return res
  }, [offer.data?.status, isAdmin])

  const _submit = React.useCallback(
    async (values: InformationFormValues, draft = false) => {
      loader.start()
      const noOffer = !offer.issuance?.vetting?.offer
      try {
        if (noOffer || isFullEdit) {
          await submitOffer(values, offer.data ?? initialValues, draft, vetting.data?.id, offer.data?.id)
        } else if (offer.data) {
          await editOffer(offer.data.id ?? '', values, offer.data)
        }

        const summary = draft ? 'Draft saved successfully' : 'Offer created successfully'
        addPopup({ info: { success: true, summary } })

        goMain()
      } catch (err: any) {
        addPopup({ info: { success: false, summary: err?.toString() } })
      } finally {
        loader.stop()
      }
    },
    [initialValues, vetting.data, offer.data, offer.issuance, isFullEdit]
  )

  const saveDraft = React.useCallback((values: InformationFormValues) => _submit(values, true), [_submit])

  const toSubmit = React.useCallback(() => {
    setShowConfirmDialog(true)
  }, [showConfirmDialog])

  const submit = React.useCallback(
    (values: InformationFormValues) => {
      _submit(values, false)
    },
    [_submit]
  )

  const goMain = React.useCallback(() => {
    history.push(`/issuance/create?id=${issuanceId}`)
  }, [history, issuanceId])

  const goBack = React.useCallback(() => {
    if (JSON.stringify(form?.current?.values) === JSON.stringify(form?.current?.initialValues)) {
      history.push(`/issuance/create?id=${issuanceId}`)
    } else {
      setShowCloseDialog(true)
    }
  }, [history])

  const setPresale = React.useCallback((value: boolean, setter: (field: string, value: any) => void) => {
    setter('timeframe.whitelist', undefined)
    setter('timeframe.preSale', undefined)
    setter('timeframe.sale', undefined)
    setter('timeframe.closed', undefined)
    setter('timeframe.claim', undefined)

    if(!value) {
      setter('presaleAlocated', '')
      setter('presaleMaxInvestment', '')
      setter('presaleMinInvestment', '')
    }

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

  React.useEffect(() => {
    if (!offer.loading && offer.data) {
      const status = offer.data?.status

      if (status) {
        switch (status) {
          case IssuanceStatus.draft:
          case IssuanceStatus.changesRequested:
          case IssuanceStatus.declined:
            if (props.edit) {
              history.replace(`/issuance/create/information?id=${issuanceId}`)
            }

            break

          case IssuanceStatus.pendingApproval:
            if (props.edit && isAdmin) {
              history.replace(`/issuance/create/information?id=${issuanceId}`)
            } else if (!isAdmin) {
              history.replace(`/issuance`)
            }

            break
          default:
            if (!props.edit) {
              history.replace(`/issuance/edit/information?id=${issuanceId}`)
            }
            break
        }
      }
    }
  }, [issuanceId, offer.loading, offer.data, isAdmin])

  const onChangeTokenStandart = (
    value: OfferTokenStandart,
    setFieldValue: (field: string, value: any) => void,
    setFieldTouched: (field: string, touched: boolean) => void
  ) => {
    setFieldValue('tokenStandart', value)
    if (value === OfferTokenStandart.xtokenlite) {
      setFieldValue('totalSupply', '')
      setFieldTouched('totalSupply', false)

      setFieldValue('tokenReceiverAddress', '')
      setFieldTouched('tokenReceiverAddress', false)
    }
  }

  const formIsLoading = useMemo(() => {
    const exists = Boolean(offer.issuance?.vetting?.offer)
    return exists ? !offer.data?.id : false
  }, [offer])

  if (offer.loading || formIsLoading) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <Loader />
      </LoaderContainer>
    )
  }
  if (!offer.data || vetting.error || offer.error) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <FormTitle>{offer.error || vetting.error || 'Issuance not found'}</FormTitle>
      </LoaderContainer>
    )
  }

  return (
    <FormContainer>
      <ScrollToTop onClick={scrollToTop}>
        <ChevronUp color={theme.launchpad.colors.foreground} size="20" />
      </ScrollToTop>

      <FormHeader>
        <OutlineButton background={theme.launchpad.colors.background} onClick={goBack} padding="1rem 0.75rem">
          <ArrowLeft color={theme.launchpad.colors.primary} />
        </OutlineButton>

        <FormTitle>Information</FormTitle>
      </FormHeader>

      <Formik
        innerRef={form}
        initialValues={offer.data ?? initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched, submitForm, resetForm }) => {
          const draftDisabled = isDraftDisabled(errors, touched)
          const submitDisabled = !values.tokenomicsAgreement || isSubmitDisabled(errors, touched)
          return (
            <>
              <ConfirmationForm
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onSave={submitForm}
              />
              <CloseConfirmation
                isOpen={showCloseDialog}
                onDiscard={() => history.push(`/issuance/create?id=${issuanceId}`)}
                onClose={onConfirmationClose}
                onSave={() => saveDraft(values)}
              />
              {showReview && (
                <Portal>
                  <OfferReview
                    values={values}
                    onClose={() => setShowReview(false)}
                    onSubmit={(draft: boolean) => _submit(values, draft)}
                    draftDisabled={draftDisabled}
                    submitDisabled={submitDisabled}
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

                {!isReset &&
                  [IssuanceStatus.changesRequested, IssuanceStatus.declined].includes(
                    offer.data?.status as IssuanceStatus
                  ) && (
                    <RejectInfo
                      message={offer.data?.changesRequested ?? offer.data?.reasonRequested}
                      status={offer.data?.status}
                      issuanceId={issuanceId}
                      onClear={() => {
                        resetForm({ values: initialValues })
                        setReset(true)
                      }}
                      onSubmit={toSubmit}
                    />
                  )}
                <IssuanceActionButtons
                  onSaveDraft={() => saveDraft(values)}
                  showDraft={!props.edit}
                  onReview={() => setShowReview(true)}
                  onSubmit={toSubmit}
                  submitDisabled={submitDisabled}
                  draftDisabled={draftDisabled}
                  offerId={offer?.data?.id}
                  status={offer.data?.status as any}
                />
              </FormSideBar>
              <FormBody>
                <ImageBlock>
                  <ImageField
                    label="Profile Picture"
                    image={values.profilePicture?.file}
                    field="profilePicture"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    error={(touched.profilePicture && errors.profilePicture) as string}
                  />

                  <ImageField
                    label="Deal Card's Image"
                    image={values.cardPicture?.file}
                    field="cardPicture"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    error={(touched.cardPicture && errors.cardPicture) as string}
                  />
                </ImageBlock>

                <TextareaField
                  value={values.shortDescription}
                  label="Short Description"
                  placeholder="A brief description on your deal card. 120-150 characters."
                  field="shortDescription"
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  error={(touched.shortDescription && errors.shortDescription) as string}
                />

                <FormGrid>
                  <FormField
                    field="title"
                    setter={(field, value) => {
                      setFieldValue(field, value)
                      setFieldValue('tokenName', value)
                    }}
                    touch={(field, touched) => {
                      setFieldTouched(field, touched)
                      setFieldTouched('tokenName', touched)
                    }}
                    label="Name of Issuance"
                    placeholder="Name of Issuance"
                    disabled={props.edit}
                    value={values.title}
                    error={(touched.title && errors.title) as string}
                  />

                  <FormField
                    field="issuerIdentificationNumber"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Company Identification Number"
                    placeholder="Company Identification Number"
                    disabled={props.edit}
                    value={values.issuerIdentificationNumber}
                    error={(touched.issuerIdentificationNumber && errors.issuerIdentificationNumber) as string}
                  />

                  <DropdownField
                    field="industry"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Industry"
                    options={industryOptions}
                    value={values.industry}
                    error={(touched.industry && errors.industry) as string}
                  />

                  <DropdownField
                    field="investmentType"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Investment Type"
                    options={investmentStructureOptions}
                    value={values.investmentType}
                    error={(touched.investmentType && errors.investmentType) as string}
                  />

                  <DropdownField
                    field="country"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Deal Country"
                    options={countries}
                    searchable
                    value={values.country}
                    error={(touched.country && errors.country) as string}
                  />

                  <div id="empty-row" />
                  <BaseCheckboxWithLabel
                    state={Boolean(values.allowOnlyAccredited)}
                    toggle={() => setFieldValue('allowOnlyAccredited', !values.allowOnlyAccredited)}
                    disabled={props.edit}
                    label="Accredited investors only"
                    labelStyle={{ fontSize: '14px' }}
                  />
                </FormGrid>

                <Separator />
                <FormGrid title="Tokenomics">
                  <FormField
                    field="tokenName"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Token Name"
                    placeholder="Is usually the same as the issuance name"
                    disabled={props.edit}
                    value={values.tokenName}
                    error={(touched.tokenName && errors.tokenName) as string}
                  />
                  <FormField
                    field="tokenTicker"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Token Ticker"
                    placeholder="2-6 letters"
                    disabled={props.edit}
                    inputFilter={uppercaseFilter}
                    value={values.tokenTicker}
                    error={(touched.tokenTicker && errors.tokenTicker) as string}
                  />
                  <FormField
                    field="decimals"
                    setter={(field, value) => setFieldValue(field, Number(value))}
                    touch={setFieldTouched}
                    label="Decimals"
                    placeholder="18"
                    inputFilter={numberFilter}
                    disabled={props.edit}
                    value={values.decimals.toString()}
                    error={(touched.decimals && errors.decimals) as string}
                  />
                  {smartContractStrategy === SMART_CONTRACT_STRATEGIES.original ? (
                    <FormField
                      field="trusteeAddress"
                      setter={setFieldValue}
                      touch={setFieldTouched}
                      label="Trustee Address"
                      placeholder="Trustee Address"
                      disabled={props.edit}
                      value={values.trusteeAddress}
                      error={(touched.trusteeAddress && errors.trusteeAddress) as string}
                    />
                  ) : (
                    <FormField
                      field="tokenAddress"
                      setter={setFieldValue}
                      touch={setFieldTouched}
                      label="Token Address"
                      placeholder="Token Address"
                      disabled={props.edit}
                      value={values.tokenAddress}
                      error={(touched.tokenAddress && errors.tokenAddress) as string}
                    />
                  )}
                  <DropdownField
                    field="tokenType"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    options={tokenTypeOptions}
                    label="Token to Make Issuance in"
                    placeholder="Token Type"
                    disabled={props.edit}
                    value={values.tokenType}
                    error={(touched.tokenType && errors.tokenType) as string}
                  />
                  <DropdownField
                    field="network"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    options={networkOptions}
                    label="Blockchain Network"
                    placeholder="Blockchain Network"
                    disabled={props.edit}
                    value={values.network}
                    error={(touched.network && errors.network) as string}
                  />
                  <FormField
                    field="hardCap"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Total Amount to Raise (Amount in the selected token type)"
                    placeholder="Total Amount to Raise"
                    inputFilter={numberFilter}
                    disabled={props.edit}
                    value={values.hardCap}
                    error={(touched.hardCap && errors.hardCap) as string}
                  />
                  <FormField
                    field="softCap"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Minimum Amount to Raise"
                    placeholder="Minimum Amount to Raise"
                    inputFilter={numberFilter}
                    disabled={props.edit}
                    value={values.softCap}
                    error={(touched.softCap && errors.softCap) as string}
                  />
                  <FormField
                    field="tokenPrice"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Price per Token"
                    placeholder="Price per Token"
                    inputFilter={numberFilter}
                    disabled={props.edit}
                    value={`${values.tokenPrice}`}
                    error={(touched.tokenPrice && errors.tokenPrice) as string}
                  />
                  <DropdownField
                    field="tokenStandart"
                    setter={(_, value: any) => onChangeTokenStandart(value, setFieldValue, setFieldTouched)}
                    touch={setFieldTouched}
                    options={standardOptions}
                    label="Token Standard"
                    placeholder="Token Standard"
                    disabled={props.edit}
                    value={values.tokenStandart}
                    error={(touched.tokenStandart && errors.tokenStandart) as string}
                  />
                  <FormField
                    field="totalSupply"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Total supply"
                    placeholder="No. of Tokens"
                    inputFilter={numberFilter}
                    disabled={props.edit || values.tokenStandart !== OfferTokenStandart.erc20}
                    value={`${values.totalSupply}`}
                    error={(touched.totalSupply && errors.totalSupply) as string}
                  />
                  <FormField
                    field="tokenReceiverAddress"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Token receiver address"
                    placeholder="Token receiver address"
                    disabled={props.edit || values.tokenStandart !== OfferTokenStandart.erc20}
                    value={`${values.tokenReceiverAddress}`}
                    error={(touched.tokenReceiverAddress && errors.tokenReceiverAddress) as string}
                    trailing={
                      <IssuanceTooltip tooltipContent={"It's a wallet address that will receive remaining tokens"} />
                    }
                  />
                  <FormField
                    field="minInvestment"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Minimum Investment per Investor"
                    placeholder="No. of Tokens"
                    inputFilter={numberFilter}
                    disabled={props.edit}
                    value={values.minInvestment}
                    error={(touched.minInvestment && errors.minInvestment) as string}
                  />
                  <FormField
                    field="maxInvestment"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Maximum Investment per Investor"
                    placeholder="No. of Tokens"
                    inputFilter={numberFilter}
                    disabled={props.edit}
                    value={values.maxInvestment}
                    error={(touched.maxInvestment && errors.maxInvestment) as string}
                  />
                  <Column gap="1rem">
                    <BaseCheckboxWithLabel
                      state={Boolean(values.tokenomicsAgreement)}
                      toggle={() => setFieldValue('tokenomicsAgreement', !values.tokenomicsAgreement)}
                      disabled={props.edit}
                      label="I understand and agree that once I submit this form and it is approved, IX Swap will mint and deposit the tokens into a smart contract based on the information provided."
                    />
                    {errors.tokenomicsAgreement && <ErrorText>{errors.tokenomicsAgreement}</ErrorText>}
                  </Column>
                </FormGrid>

                <Separator />

                <FormGrid title="Pre-Sale">
                  <PresaleFieldContainer disabled={props.edit}>
                    <PresaleFieldLabel>Do you wish to apply a {'"Pre-Sale"'} stage to this deal?</PresaleFieldLabel>

                    <Spacer />

                    <PresaleButton
                      isSelected={values.hasPresale === true}
                      onClick={() => setPresale(true, setFieldValue)}
                      disabled={props.edit}
                    >
                      Yes
                    </PresaleButton>

                    <PresaleButton
                      isSelected={values.hasPresale === false}
                      onClick={() => setPresale(false, setFieldValue)}
                      disabled={props.edit}
                    >
                      No
                    </PresaleButton>
                  </PresaleFieldContainer>

                  <FormField
                    disabled={props.edit || !values.hasPresale}
                    field="presaleAlocated"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Pre-Sale Allocation"
                    placeholder="Total fundraising amount allocated for Pre-Sale"
                    inputFilter={numberFilter}
                    value={values.presaleAlocated}
                    error={(touched.presaleAlocated && errors.presaleAlocated) as string}
                  />

                  <FormField
                    disabled={props.edit || !values.hasPresale}
                    field="presaleMaxInvestment"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Maximum Investment per Investor"
                    placeholder="No. of Tokens"
                    inputFilter={numberFilter}
                    value={values.presaleMaxInvestment}
                    error={(touched.presaleMaxInvestment && errors.presaleMaxInvestment) as string}
                  />

                  <FormField
                    disabled={props.edit || !values.hasPresale}
                    field="presaleMinInvestment"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Minimum Investment per Investor"
                    placeholder="No. of Tokens"
                    inputFilter={numberFilter}
                    value={values.presaleMinInvestment}
                    error={(touched.presaleMinInvestment && errors.presaleMinInvestment) as string}
                  />
                </FormGrid>

                <Separator />

                <FormGrid
                  title="Timeline"
                  description={
                    <>
                      The timeline will be in the following order: Register To Invest {'>'} Pre-Sale {'>'} Public Sale{' '}
                      {'>'} Token Claim. Exclude the Pre-Sale stage if you decide to not include this.
                    </>
                  }
                >
                  <DateRangeField
                    mode="single"
                    showButton
                    label="Register To Invest"
                    field="timeframe.whitelist"
                    setter={setFieldValue}
                    value={values.timeframe.whitelist}
                    disabled={props.edit || !values.hasPresale}
                    maxDate={values?.timeframe?.preSale ? getDaysBefore(values?.timeframe?.preSale, 1) : undefined}
                    error={
                      (touched.timeframe?.whitelist && (touched.timeframe && errors.timeframe)?.whitelist) as string
                    }
                  />

                  <DateRangeField
                    mode="single"
                    showButton
                    label="Pre-Sale"
                    field="timeframe.preSale"
                    setter={setFieldValue}
                    value={values.timeframe.preSale}
                    disabled={props.edit || !values.hasPresale || !values.timeframe.whitelist}
                    minDate={getDaysAfter(values?.timeframe?.whitelist, 1)}
                    maxDate={values?.timeframe?.sale ? getDaysBefore(values?.timeframe?.sale, 1) : undefined}
                    error={(touched.timeframe?.preSale && (touched.timeframe && errors.timeframe)?.preSale) as string}
                  />

                  <DateRangeField
                    mode="range"
                    showButton
                    label="Public Sale to Closed"
                    field="timeframe.sale"
                    value={[values.timeframe.sale, values.timeframe.closed].filter((x) => !!x).map((x) => moment(x))}
                    disabled={props.edit || (values.hasPresale && !values.timeframe.preSale)}
                    minDate={values.hasPresale ? getDaysAfter(values.timeframe.preSale, 1) : undefined}
                    maxDate={values?.timeframe?.claim ? getDaysBefore(values?.timeframe?.claim, 1) : undefined}
                    onChange={([start, end]) => {
                      setFieldTouched('timeframe.sale')
                      setFieldTouched('timeframe.closed')
                      setFieldValue('timeframe.sale', start)
                      setFieldValue('timeframe.closed', end)
                    }}
                    error={`${(touched.timeframe?.sale ? errors?.timeframe?.sale ?? '' : '') as string}
                     ${(touched.timeframe?.closed ? errors?.timeframe?.closed ?? '' : '') as string}`}
                  />

                  <DateRangeField
                    mode="single"
                    showButton
                    label="Token Claim"
                    field="timeframe.claim"
                    setter={setFieldValue}
                    disabled={props.edit || !values.timeframe.closed}
                    minDate={getDaysAfter(values.timeframe.closed, 1)}
                    value={values.timeframe.claim}
                    error={(touched.timeframe?.claim && (touched.timeframe && errors.timeframe)?.claim) as string}
                  />
                </FormGrid>

                <Separator />
                <FormGrid title="Offering Terms">
                  <FormField
                    field="terms.investmentStructure"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Investment Structure"
                    placeholder="Holding Structure"
                    disabled={props.edit}
                    value={values.terms?.investmentStructure}
                    error={
                      (touched.terms?.investmentStructure &&
                        (touched.terms && errors.terms)?.investmentStructure) as string
                    }
                  />
                  <FormField
                    field="terms.dividentYield"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Dividend Yield"
                    placeholder="In Percent"
                    optional
                    disabled={props.edit}
                    value={values.terms?.dividentYield}
                    error={(touched.terms?.dividentYield && (touched.terms && errors.terms)?.dividentYield) as string}
                    inputFilter={filterNumberWithDecimals}
                  />
                  <FormField
                    field="terms.investmentPeriod"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Investment Period"
                    placeholder="In months"
                    optional
                    disabled={props.edit}
                    value={values.terms?.investmentPeriod?.toString()}
                    error={
                      (touched.terms?.investmentPeriod && (touched.terms && errors.terms)?.investmentPeriod) as string
                    }
                    inputFilter={integerNumberFilter}
                  />
                  <FormField
                    field="terms.grossIrr"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    label="Gross IRR (%)"
                    placeholder="In percent"
                    optional
                    disabled={props.edit}
                    value={values.terms?.grossIrr}
                    error={(touched.terms?.grossIrr && (touched.terms && errors.terms)?.grossIrr) as string}
                    inputFilter={filterNumberWithDecimals}
                  />

                  <DropdownField
                    span={2}
                    label="Distribution Frequency"
                    placeholder="Frequency of return distribution"
                    field="terms.distributionFrequency"
                    setter={setFieldValue}
                    touch={setFieldTouched}
                    options={distributionFrequencyOptions}
                    optional
                    disabled={props.edit}
                    value={values.terms?.distributionFrequency}
                    error={
                      (touched.terms?.distributionFrequency &&
                        (touched.terms && errors.terms)?.distributionFrequency) as string
                    }
                  />
                </FormGrid>

                <Separator />

                <AdditionalInformation
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  values={values}
                  errors={errors}
                  touched={touched}
                />

                <Separator />

                <UploadDocuments documents={values.additionalDocuments} />

                <Separator />

                <GalleryBlock
                  description={values.longDescription}
                  images={values.images}
                  videos={values.videos}
                  setter={setFieldValue}
                  touch={setFieldTouched}
                  errors={errors}
                  touched={touched}
                />

                <Separator />

                <TeamMembersBlock members={values.members} />

                <Separator />

                <FAQBlock faq={values.faq} />

                <Row justifyContent="flex-end" gap="1rem" alignItems="center">
                  {!props.edit && (
                    <OutlineButton disabled={draftDisabled} onClick={() => saveDraft(values)}>
                      Save Draft
                    </OutlineButton>
                  )}

                  <OutlineButton onClick={() => setShowReview(true)}>Review</OutlineButton>
                  <FilledButton onClick={toSubmit} disabled={submitDisabled}>
                    Submit
                  </FilledButton>
                </Row>
              </FormBody>
            </>
          )
        }}
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

const PresaleFieldContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  ${(props) =>
    props.disabled &&
    `
    background: ${props.theme.launchpad.colors.foreground};
  `}
`

const PresaleFieldLabel = styled.div`
  ${text44}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const PresaleButton = styled.button<{ isSelected: boolean; disabled?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary + '33'};
  border-radius: 6px;
  cursor: pointer;

  ${text1}

  background: ${(props) => props.theme.launchpad.colors.background};
  color: ${(props) => props.theme.launchpad.colors.primary};

  ${(props) =>
    props.isSelected === true &&
    `
    background: ${props.theme.launchpad.colors.primary};
    color: ${props.theme.launchpad.colors.text.light};
  `}

  ${(props) =>
    props.disabled &&
    `
    cursor: default;
  `}
`

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 10rem;
  background: ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 50%;
  display: grid;
  place-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.75rem;
`

const ErrorText = styled.div`
  color: ${(props) => props.theme.launchpad.colors.error};

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
`
