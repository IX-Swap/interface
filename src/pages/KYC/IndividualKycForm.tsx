import React, { FC, useMemo, useState } from 'react'
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
import { useCreateIndividualKYC } from 'state/kyc/hooks'

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
  const createIndividualKYC = useCreateIndividualKYC()

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

    setFieldValue('sourceOfFunds', newSources)
  }

  const handleDropImage = (acceptedFile: any, lastValue: any, key: string, setFieldValue: any) => {
    const file = acceptedFile
    if (lastValue?.filePath) {
      URL.revokeObjectURL(lastValue.filePath)
    }
    const preview = URL.createObjectURL(file)
    setFieldValue(key, file)
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
        onSubmit={async (values) => {
          const {
            dateOfBirth,
            sourceOfFunds,
            otherFunds,
            citizenship,
            nationality,
            country,
            employmentStatus,
            gender,
            income,
          } = values
          await createIndividualKYC({
            ...values,
            dateOfBirth: dateOfBirth.format(),
            sourceOfFunds: [...sourceOfFunds, otherFunds].join(', '),
            citizenship: citizenship.name,
            nationality: nationality.name,
            country: country.name,
            employmentStatus: employmentStatus.name,
            gender: gender.name,
            income: income.name,
          })
        }}
      >
        {({ values, handleChange, errors, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
          <Grid>
            <form onSubmit={handleSubmit} style={{ maxHeight: '750px', overflowY: 'scroll', gap: '35px' }}>
              <Column style={{ gap: '35px' }}>
                <FormCard id="personal">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{info.title}</TYPE.title6>
                    {dirty &&
                      !errors.firstName &&
                      !errors.lastName &&
                      !errors.dateOfBirth &&
                      !errors.gender &&
                      !errors.nationality &&
                      !errors.citizenship &&
                      !errors.phoneNumber &&
                      !errors.email && <BigPassed />}
                  </RowBetween>
                  <Column style={{ gap: '20px' }}>
                    <FormGrid columns={3}>
                      <TextInput
                        onBlur={handleBlur}
                        name="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                        label="First Name:"
                        error={errors.firstName && errors.firstName}
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
                        error={errors.lastName && errors.lastName}
                      />
                    </FormGrid>

                    <FormGrid>
                      <DateInput
                        maxHeight={60}
                        name="dateOfBirth"
                        onBlur={handleBlur}
                        error={errors.dateOfBirth && errors.dateOfBirth}
                        value={values.dateOfBirth}
                        onChange={(value) => setFieldValue('dateOfBirth', value)}
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
                        error={errors.email && errors.email}
                      />
                    </FormGrid>
                  </Column>
                </FormCard>

                <FormCard id="address">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{address.title}</TYPE.title6>
                    {dirty && !errors.line1 && !errors.line2 && !errors.country && !errors.city && <BigPassed />}
                  </RowBetween>

                  <Column style={{ gap: '20px' }}>
                    <FormGrid>
                      <TextInput
                        name="line1"
                        onChange={handleChange}
                        value={values.line1}
                        label="Line 1"
                        onBlur={handleBlur}
                        error={errors.line1 && errors.line1}
                      />
                      <TextInput
                        name="line2"
                        onChange={handleChange}
                        value={values.line2}
                        label="Line 2"
                        onBlur={handleBlur}
                        error={errors.line2 && errors.line2}
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
                        error={errors.city && errors.city}
                      />
                    </FormGrid>
                  </Column>
                </FormCard>

                <FormCard id="funds">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{funds.title}</TYPE.title6>
                    {dirty && !errors.sourceOfFunds && <BigPassed />}
                  </RowBetween>
                  <FormGrid columns={3}>
                    {sourceOfFunds.map(({ id, name }: any) => (
                      <Checkbox
                        checked={values.sourceOfFunds.includes(name)}
                        onClick={() => onSourceOfFundsChange(name, values.sourceOfFunds, setFieldValue)}
                        key={`funds-${id}`}
                        label={name}
                      />
                    ))}
                  </FormGrid>
                  {values.sourceOfFunds.includes('Others') && (
                    <TextInput
                      name="otherFunds"
                      style={{ marginTop: 20 }}
                      placeholder="Other Source of Funds...."
                      onChange={handleChange}
                      value={values.otherFunds}
                      onBlur={handleBlur}
                      error={errors.otherFunds && errors.otherFunds}
                    />
                  )}
                  {errors.sourceOfFunds && (
                    <TYPE.small marginTop="8px" color={'red1'}>
                      {errors.sourceOfFunds}
                    </TYPE.small>
                  )}
                </FormCard>

                <FormCard id="investor">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{investor.title}</TYPE.title6>
                    <BigPassed />
                  </RowBetween>

                  <Column style={{ gap: '16px' }}>
                    <Column style={{ gap: '16px' }}>
                      <Checkbox
                        scaleSize={1.4}
                        isRadio
                        checked={values.accredited === 1}
                        onClick={() => setFieldValue('accredited', 1)}
                        label={`I declare that i am “individual accredited Investor"`}
                      />
                      <Checkbox
                        scaleSize={1.4}
                        isRadio
                        checked={values.accredited !== 1}
                        onClick={() => setFieldValue('accredited', 0)}
                        label="I am not an accredited investor"
                      />
                    </Column>

                    <Column
                      style={
                        values.accredited === 1 ? { gap: '12px', pointerEvents: 'none', opacity: 0.4 } : { gap: '12px' }
                      }
                    >
                      <Checkbox
                        isRadio
                        checked={values.accredited === 2}
                        onClick={() => setFieldValue('accredited', 2)}
                        label={`I am a person whose individual net worth or joint net worth with my spouse at the time of purchase 
                  exceeds US $1 million`}
                      />
                      <Checkbox
                        isRadio
                        checked={values.accredited === 3}
                        onClick={() => setFieldValue('accredited', 3)}
                        label="I am person who had an individual income in excess of US$200,000 in each of the two most recent years 
                  or joint income with my spouse in excess of US$300 000 in each of those years and has a reasonable expectation 
                  of reaching the same income level in the current year"
                      />
                    </Column>
                  </Column>
                </FormCard>

                <FormCard id="fatca">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{fatca.title}</TYPE.title6>
                    {dirty && !errors.usTin && <BigPassed />}
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
                          name="usTin"
                          style={{ width: 284 }}
                          placeholder="ID Number.."
                          value={values.usTin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.usTin && errors.usTin}
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
                  <RowBetween flexDirection="row-reverse" height="28px" marginBottom="32px">
                    {dirty && !errors.occupation && !errors.employmentStatus && !errors.employer && !errors.income && (
                      <BigPassed />
                    )}
                  </RowBetween>
                  <Column style={{ gap: '20px' }}>
                    <TextInput
                      name="occupation"
                      onChange={handleChange}
                      value={values.occupation}
                      label="Occupation"
                      onBlur={handleBlur}
                      error={errors.occupation && errors.occupation}
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
                      error={errors.employer && errors.employer}
                    />
                    <Select
                      label="Income in USD in preceding 12 months"
                      selectedItem={values.income}
                      items={incomes}
                      onSelect={(income) => setFieldValue('income', income)}
                      name="income"
                      error={errors.income && errors.income}
                      onBlur={handleBlur}
                    />
                  </Column>
                </FormCard>

                <FormCard id="upload">
                  <RowBetween marginBottom="32px">
                    <TYPE.title6 style={{ textTransform: 'uppercase' }}>{upload.title}</TYPE.title6>
                    {dirty && !errors.proofOfIdentity && !errors.proofOfAddress && !errors.evidenceOfAccreditation && (
                      <BigPassed />
                    )}
                  </RowBetween>

                  <Column style={{ gap: '40px' }}>
                    <Uploader
                      error={errors.proofOfIdentity && errors.proofOfIdentity}
                      title="Proof of Identity"
                      subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                      file={values.proofOfIdentity}
                      onDrop={(file) => {
                        handleDropImage(file, values.proofOfIdentity, 'proofOfIdentity', setFieldValue)
                      }}
                    />

                    <Uploader
                      error={errors.proofOfAddress && errors.proofOfAddress}
                      title="Proof of Address"
                      subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                      file={values.proofOfAddress}
                      onDrop={(file) => {
                        handleDropImage(file, values.proofOfAddress, 'proofOfAddress', setFieldValue)
                      }}
                    />

                    <Uploader
                      error={errors.evidenceOfAccreditation && errors.evidenceOfAccreditation}
                      title="Evidence of accreditation"
                      subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                      file={values.evidenceOfAccreditation}
                      onDrop={(file) => {
                        handleDropImage(file, values.evidenceOfAccreditation, 'evidenceOfAccreditation', setFieldValue)
                      }}
                      optional={values.accredited === 0}
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
