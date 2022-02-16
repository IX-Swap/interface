import React, { FC, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { getNames } from 'country-list'

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

import { genders, initialIndividualKycFormData, sourceOfFunds } from './mock'
import { Grid, FormCard, FormGrid, ExtraInfoCard } from './styleds'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'

interface Props {
  goBack: () => void
}

export const IndividualKycForm: FC<Props> = ({ goBack }: Props) => {
  const [formData, setFormData] = useState(initialIndividualKycFormData)

  const { info, address, funds, investor, fatca, upload } = formData

  const onChangeInfoHandler = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      info: { ...info, fields: { ...info.fields, [fieldName]: value } },
    })
  }

  const onChangeAddressHandler = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      address: { ...address, fields: { ...address.fields, [fieldName]: value } },
    })
  }

  const onSourceOfFundsChange = (source: string) => {
    const { fields } = funds
    const newSources = [...fields]
    const indexOfSource = fields.indexOf(source)

    // check for existence
    if (indexOfSource > -1) {
      newSources.splice(indexOfSource, 1)
    } else {
      newSources.push(source)
    }

    setFormData({
      ...formData,
      funds: { ...funds, fields: newSources },
    })
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

      <Grid>
        <div style={{ maxHeight: '1000px', overflowY: 'scroll', gap: '35px' }}>
          <Column style={{ gap: '35px' }}>
            <FormCard id="personal">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{info.title}</TYPE.title6>
                {info.passed && <BigPassed />}
              </RowBetween>

              <Column style={{ gap: '20px' }}>
                <FormGrid columns={3}>
                  <TextInput
                    onChange={(e) => onChangeInfoHandler('firstName', e.currentTarget.value)}
                    value={info.fields.firstName}
                    label="First Name:"
                  />
                  <TextInput
                    onChange={(e) => onChangeInfoHandler('middleName', e.currentTarget.value)}
                    value={info.fields.middleName}
                    label="Middle Name:"
                  />
                  <TextInput
                    onChange={(e) => onChangeInfoHandler('lastName', e.currentTarget.value)}
                    value={info.fields.lastName}
                    label="Last Name:"
                  />
                </FormGrid>

                <FormGrid>
                  <DateInput
                    value={info.fields.birthDate}
                    onChange={(value) => onChangeInfoHandler('birthDate', value)}
                  />
                  <Select
                    label="Gender"
                    selectedItem={info.fields.gender}
                    items={genders}
                    onSelect={(gender) => onChangeInfoHandler('gender', gender)}
                  />
                </FormGrid>

                <FormGrid>
                  <Select
                    withScroll
                    label="Nationality"
                    selectedItem={info.fields.nationality}
                    items={countries}
                    onSelect={(nationality) => onChangeInfoHandler('nationality', nationality)}
                  />
                  <Select
                    withScroll
                    label="Citizenship"
                    selectedItem={info.fields.citizenship}
                    items={countries}
                    onSelect={(citizenship) => onChangeInfoHandler('citizenship', citizenship)}
                  />
                </FormGrid>
                <FormGrid>
                  <PhoneInput
                    value={info.fields.phoneNumber}
                    onChange={(value) => onChangeInfoHandler('phoneNumber', value)}
                  />
                  <TextInput
                    onChange={(e) => onChangeInfoHandler('email', e.currentTarget.value)}
                    value={info.fields.email}
                    label="Email address:"
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
                    onChange={(e) => onChangeAddressHandler('line1', e.currentTarget.value)}
                    value={address.fields.line1}
                    label="Line 1"
                  />
                  <TextInput
                    onChange={(e) => onChangeAddressHandler('line2', e.currentTarget.value)}
                    value={address.fields.line2}
                    label="Line 2"
                  />
                </FormGrid>

                <FormGrid>
                  <Select
                    withScroll
                    label="Country"
                    selectedItem={address.fields.country}
                    items={countries}
                    onSelect={(country) => onChangeAddressHandler('country', country)}
                  />
                  <TextInput
                    onChange={(e) => onChangeAddressHandler('city', e.currentTarget.value)}
                    value={address.fields.city}
                    label="City"
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
                    checked={funds.fields.includes(name)}
                    onClick={() => onSourceOfFundsChange(name)}
                    key={`funds-${id}`}
                    label={name}
                  />
                ))}
              </FormGrid>
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
                    checked={investor.value === true}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        investor: { ...investor, value: true },
                      })
                    }
                    label={`I declare that i am “individual accredited Investor"`}
                  />
                  <Checkbox
                    scaleSize={1.4}
                    isRadio
                    checked={investor.value === false}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        investor: { ...investor, value: false },
                      })
                    }
                    label="I am not an accredited investor"
                  />
                </Column>
                <Column style={{ gap: '24px' }}>
                  <Checkbox
                    isRadio
                    checked={investor.exceedsOneMillion === true}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        investor: { ...investor, exceedsOneMillion: true },
                      })
                    }
                    label={`I am a person whose individual net worth or joint net worth with my spouse at the time of purchase 
                    exceeds US $1 million`}
                  />
                  <Checkbox
                    isRadio
                    checked={investor.exceedsOneMillion === false}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        investor: { ...investor, exceedsOneMillion: false },
                      })
                    }
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
                {fatca.passed && <BigPassed />}
              </RowBetween>

              <ExtraInfoCard>
                <TYPE.buttonMuted>Declaration of US Citizenship or US residence for FATCA</TYPE.buttonMuted>
              </ExtraInfoCard>

              <Column style={{ gap: '20px', marginTop: 20 }}>
                <Column style={{ gap: '8px' }}>
                  <Checkbox
                    isRadio
                    checked={fatca.value === true}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        fatca: { ...fatca, value: true },
                      })
                    }
                    label={`I confirm that I am a US citizen and/or resident in the US for tax purposes and my US federal taxpayer ID number (US TIN) is as follows: `}
                  />
                  {fatca.value && (
                    <TextInput
                      style={{ width: 284 }}
                      placeholder="ID Number.."
                      value={fatca.taxId || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fatca: { ...fatca, taxId: e.currentTarget.value },
                        })
                      }
                    />
                  )}
                </Column>
                <Checkbox
                  isRadio
                  checked={fatca.value === false}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      fatca: { ...fatca, value: false },
                    })
                  }
                  label="I confirm that I am not a US citizen or resident in the US for tax purposes. "
                />
              </Column>
            </FormCard>

            <FormCard>
              <Column style={{ gap: '20px' }}>
                <TextInput value={''} label="Occupation" />
                <Select
                  label="Employment Status"
                  selectedItem={null}
                  items={[]}
                  onSelect={(gender) => onChangeInfoHandler('gender', gender)}
                />
                <TextInput value={''} label="Employer" />
                <Select
                  label="Income in SGD"
                  selectedItem={null}
                  items={[]}
                  onSelect={(gender) => onChangeInfoHandler('gender', gender)}
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
                  file={null}
                  onDrop={() => {
                    console.log('drop')
                  }}
                />

                <Uploader
                  title="Proof of Address"
                  subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                  file={null}
                  onDrop={() => {
                    console.log('drop')
                  }}
                />

                <Uploader
                  title="Evidence of accreditation"
                  subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                  file={null}
                  onDrop={() => {
                    console.log('drop')
                  }}
                  optional={!investor.value}
                />
              </Column>
            </FormCard>
          </Column>
        </div>

        <Column>
          <KYCProgressBar
            topics={Object.values(formData)}
            description="Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
            reasons={['Last name', 'Gender', 'Middle name']}
          />
        </Column>
      </Grid>
    </>
  )
}
