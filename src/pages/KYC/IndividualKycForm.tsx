import React, { FC, FormEvent, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { getNames } from 'country-list'
import { Formik } from 'formik'

import Column from 'components/Column'
import { KYCProgressBar } from './KYCProgressBar'
import { ButtonText } from 'components/Button'
import { TYPE } from 'theme'
import { GradientText } from 'pages/CustodianV2/styleds'
import { RowBetween } from 'components/Row'
import { Select, TextInput, Uploader } from './common'
import { PhoneInput } from 'components/PhoneInput'
import { DateInput } from 'components/DateInput'
import { Checkbox } from 'components/Checkbox'

import { empleymentStatuses, formInitialValues, genders, incomes, individualKycFormData, sourceOfFunds } from './mock'
import { Grid, FormCard, FormGrid, ExtraInfoCard } from './styleds'
import { errorsSchema } from './schema'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'

interface Props {
  goBack: () => void
}

export const IndividualKycForm: FC<Props> = ({ goBack }: Props) => {
  const [formData] = useState(individualKycFormData)

  const { info, address, funds, investor, fatca, upload } = formData

  const onSourceOfFundsChange = (source: string, fields: any[], setFieldValue: any) => {
    const newSources = [...fields]
    const indexOfSource = fields.indexOf(source)

    // check for existence
    if (indexOfSource > -1) {
      newSources.splice(indexOfSource, 1)
    } else {
      newSources.push(source)
    }

    setFieldValue('funds', newSources)
  }

  const countries = useMemo(() => {
    return getNames()
      .map((name, index) => ({ id: ++index, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  return (
    <>
      <ButtonText style={{ textDecoration: 'none' }} display="flex" marginBottom="64px" onClick={goBack}>
        <ArrowLeft />
        <TYPE.title4 display="flex" marginLeft="10px">
          <Trans>
            KYC as <GradientText style={{ marginLeft: 8 }}>Individual</GradientText>
          </Trans>
        </TYPE.title4>
      </ButtonText>

      <Formik
        initialValues={formInitialValues}
        validationSchema={errorsSchema}
        validateOnBlur
        onSubmit={(values) => {
          console.log('submit', values)
        }}
      >
        {({ values, handleChange, errors, handleBlur, handleSubmit, setFieldValue, isValid, touched }) => (
          <Grid>
            <form onSubmit={handleSubmit} style={{ maxHeight: '1000px', overflowY: 'scroll', gap: '35px' }}>
              <Column style={{ gap: '35px' }}>
                <FormCard id="personal">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{info.title}</TYPE.title6>
                    {info.passed && <BigPassed />}
                  </RowBetween>
                  <Column style={{ gap: '20px' }}>
                    <FormGrid columns={3}>
                      <TextInput
                        onBlur={handleBlur}
                        name="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                        label="First Name:"
                        error={touched.firstName && errors.firstName && errors.firstName}
                      />
                      <TextInput
                        name="middleName"
                        onChange={handleChange}
                        value={values.middleName}
                        label="Middle Name:"
                      />
                      <TextInput
                        onBlur={handleBlur}
                        name="lastName"
                        onChange={handleChange}
                        value={values.lastName}
                        label="Last Name:"
                        error={touched.lastName && errors.lastName && errors.lastName}
                      />
                    </FormGrid>

                    <FormGrid>
                      <DateInput
                        maxHeight={60}
                        name="birthDate"
                        onBlur={handleBlur}
                        error={touched.birthDate && errors.birthDate && errors.birthDate}
                        value={values.birthDate}
                        onChange={(value) => setFieldValue('birthDate', value)}
                      />
                      <Select
                        name="gender"
                        error={errors.gender && errors.gender}
                        onBlur={handleBlur}
                        label="Gender"
                        selectedItem={values.gender}
                        items={genders}
                        onSelect={(gender) => setFieldValue('gender', gender)}
                      />
                    </FormGrid>

                    <FormGrid>
                      <Select
                        name="nationality"
                        error={errors.nationality && errors.nationality}
                        onBlur={handleBlur}
                        withScroll
                        label="Nationality"
                        selectedItem={values.nationality}
                        items={countries}
                        onSelect={(nationality) => setFieldValue('nationality', nationality)}
                      />
                      <Select
                        name="citizenship"
                        error={errors.citizenship && errors.citizenship}
                        onBlur={handleBlur}
                        withScroll
                        label="Citizenship"
                        selectedItem={values.citizenship}
                        items={countries}
                        onSelect={(citizenship) => setFieldValue('citizenship', citizenship)}
                      />
                    </FormGrid>
                    <FormGrid>
                      <PhoneInput
                        onBlur={handleBlur}
                        error={errors.phoneNumber && errors.phoneNumber}
                        value={values.phoneNumber}
                        onChange={(value) => setFieldValue('phoneNumber', value)}
                      />
                      <TextInput
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        label="Email address:"
                        error={touched.email ? errors.email : false}
                      />
                    </FormGrid>
                  </Column>
                </FormCard>

                <FormCard id="address">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{address.title}</TYPE.title6>
                    {address.passed && <BigPassed />}
                  </RowBetween>

                  <Column style={{ gap: '20px' }}>
                    <FormGrid>
                      <TextInput
                        name="line1"
                        onChange={handleChange}
                        value={values.line1}
                        label="Line 1"
                        onBlur={handleBlur}
                        error={touched.line1 && errors.line1 && errors.line1}
                      />
                      <TextInput
                        name="line2"
                        onChange={handleChange}
                        value={values.line2}
                        label="Line 2"
                        onBlur={handleBlur}
                        error={touched.line2 && errors.line2 && errors.line2}
                      />
                    </FormGrid>

                    <FormGrid>
                      <Select
                        withScroll
                        label="Country"
                        selectedItem={values.country}
                        items={countries}
                        onSelect={(country) => setFieldValue('country', country)}
                        name="country"
                        error={errors.country && errors.country}
                        onBlur={handleBlur}
                      />
                      <TextInput
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                        label="City"
                        onBlur={handleBlur}
                        error={touched.city && errors.city && errors.city}
                      />
                    </FormGrid>
                  </Column>
                </FormCard>

                <FormCard id="funds">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{funds.title}</TYPE.title6>
                    {funds.passed && <BigPassed />}
                  </RowBetween>
                  <FormGrid columns={3}>
                    {sourceOfFunds.map(({ id, name }: any) => (
                      <Checkbox
                        checked={values.funds.includes(name)}
                        onClick={() => onSourceOfFundsChange(name, values.funds, setFieldValue)}
                        key={`funds-${id}`}
                        label={name}
                      />
                    ))}
                  </FormGrid>
                  {values.funds.includes('Others') && (
                    <TextInput
                      name="otherFunds"
                      style={{ marginTop: 20 }}
                      placeholder="Other Source of Funds...."
                      onChange={handleChange}
                      value={values.otherFunds}
                      onBlur={handleBlur}
                      error={touched.otherFunds && errors.otherFunds && errors.otherFunds}
                    />
                  )}
                </FormCard>

                <FormCard id="investor">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{investor.title}</TYPE.title6>
                    {investor.passed && <BigPassed />}
                  </RowBetween>

                  <Column style={{ gap: '34px' }}>
                    <Column style={{ gap: '16px' }}>
                      <Checkbox
                        scaleSize={1.4}
                        isRadio
                        checked={values.isAccreditedInvestor}
                        onClick={() => setFieldValue('isAccreditedInvestor', true)}
                        label={`I declare that i am “individual accredited Investor"`}
                      />
                      <Checkbox
                        scaleSize={1.4}
                        isRadio
                        checked={!values.isAccreditedInvestor}
                        onClick={() => setFieldValue('isAccreditedInvestor', false)}
                        label="I am not an accredited investor"
                      />
                    </Column>
                    {values.isAccreditedInvestor === false && (
                      <Column style={{ gap: '24px' }}>
                        <Checkbox
                          isRadio
                          checked={values.exceedsOneMillion}
                          onClick={() => setFieldValue('exceedsOneMillion', true)}
                          label={`I am a person whose individual net worth or joint net worth with my spouse at the time of purchase 
                  exceeds US $1 million`}
                        />
                        <Checkbox
                          isRadio
                          checked={!values.exceedsOneMillion}
                          onClick={() => setFieldValue('exceedsOneMillion', false)}
                          label="I am person who had an individual income in excess of US$200,000 in each of the two most recent years 
                  or joint income with my spouse in excess of US$300 000 in each of those years and has a reasonable expectation 
                  of reaching the same income level in the current year"
                        />
                      </Column>
                    )}
                  </Column>
                </FormCard>

                <FormCard id="fatca">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{fatca.title}</TYPE.title6>
                    {fatca.passed && <BigPassed />}
                  </RowBetween>

                  <ExtraInfoCard>
                    <TYPE.buttonMuted>Declaration of US Citizenship or US residence for FATCA</TYPE.buttonMuted>
                  </ExtraInfoCard>

                  <Column style={{ gap: '20px', marginTop: 20 }}>
                    <Column style={{ gap: '8px' }}>
                      <Checkbox
                        isRadio
                        checked={values.isUSTaxPayer}
                        onClick={() => setFieldValue('isUSTaxPayer', true)}
                        label={`I confirm that I am a US citizen and/or resident in the US for tax purposes and my US federal taxpayer ID number (US TIN) is as follows: `}
                      />
                      {values.isUSTaxPayer && (
                        <TextInput
                          name="taxId"
                          style={{ width: 284 }}
                          placeholder="ID Number.."
                          value={values.taxId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.taxId && errors.taxId && errors.taxId}
                        />
                      )}
                    </Column>
                    <Checkbox
                      isRadio
                      checked={!values.isUSTaxPayer}
                      onClick={() => setFieldValue('isUSTaxPayer', false)}
                      label="I confirm that I am not a US citizen or resident in the US for tax purposes. "
                    />
                  </Column>
                </FormCard>

                <FormCard>
                  <Column style={{ gap: '20px' }}>
                    <TextInput
                      name="occupation"
                      onChange={handleChange}
                      value={values.occupation}
                      label="Occupation"
                      onBlur={handleBlur}
                      error={touched.occupation && errors.occupation && errors.occupation}
                    />
                    <Select
                      label="Employment Status"
                      selectedItem={values.employmentStatus}
                      items={empleymentStatuses}
                      onSelect={(status) => setFieldValue('employmentStatus', status)}
                      name="employmentStatus"
                      error={errors.employmentStatus && errors.employmentStatus}
                      onBlur={handleBlur}
                    />
                    <TextInput
                      name="employer"
                      onChange={handleChange}
                      value={values.employer}
                      label="Employer"
                      onBlur={handleBlur}
                      error={touched.employer && errors.employer && errors.employer}
                    />
                    <Select
                      label="Income in USD in preceding 12 months"
                      selectedItem={values.income12Month}
                      items={incomes}
                      onSelect={(income) => setFieldValue('income12Month', income)}
                      name="income12Month"
                      error={errors.income12Month && errors.income12Month}
                      onBlur={handleBlur}
                    />
                  </Column>
                </FormCard>

                <FormCard id="upload">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{upload.title}</TYPE.title6>
                    {upload.passed && <BigPassed />}
                  </RowBetween>

                  <Column style={{ gap: '40px' }}>
                    <Uploader
                      title="Proof of Identity"
                      subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                      file={values.proofIdentityFile}
                      onDrop={(file) => {
                        setFieldValue('proofIdentityFile', file)
                      }}
                    />

                    <Uploader
                      title="Proof of Address"
                      subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                      file={values.proofAddressFile}
                      onDrop={(file) => {
                        setFieldValue('proofAddressFile', file)
                      }}
                    />

                    <Uploader
                      title="Evidence of accreditation"
                      subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                      file={values.proofAccreditationFile}
                      onDrop={(file) => {
                        setFieldValue('proofAccreditationFile', file)
                      }}
                      optional={!values.isAccreditedInvestor}
                    />
                  </Column>
                </FormCard>
                <FormCard>
                  <TYPE.title6 marginBottom="12px">
                    <Trans>ACCOUNT ON INVESTAX</Trans>
                  </TYPE.title6>

                  <Checkbox checked={true} onClick={() => null} label="Create account for me on InvestaX" />
                </FormCard>
              </Column>
            </form>

            <Column>
              <KYCProgressBar
                handleSubmit={handleSubmit}
                disabled={!isValid}
                topics={Object.values(formData)}
                description="Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
                reasons={['Last name', 'Gender', 'Middle name']}
              />
            </Column>
          </Grid>
        )}
      </Formik>
    </>
  )
}
