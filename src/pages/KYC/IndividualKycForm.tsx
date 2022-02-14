import React, { FC, useState } from 'react'
import { Trans } from '@lingui/macro'

import Column from 'components/Column'
import { KYCProgressBar } from './KYCProgressBar'
import { ButtonText } from 'components/Button'
import { TYPE } from 'theme'
import { GradientText } from 'pages/CustodianV2/styleds'
import { RowBetween } from 'components/Row'
import { Select, TextInput, Uploader } from './common'
import { PhoneInput } from 'components/PhoneInput'
import { DateInput } from 'components/DateInput'
import { RadioButton } from 'components/RadioButton'

import { fatcaOptions, genders, initialIndividualKycFormData, optInOptions, sourceOfFunds } from './mock'
import { Grid, FormCard, FormGrid, ExtraInfoCard } from './styleds'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'

interface Props {
  goBack: () => void
}

export const IndividualKycForm: FC<Props> = ({ goBack }: Props) => {
  const [formData, setFormData] = useState(initialIndividualKycFormData)

  const { info, address, funds, investor, fatca, optInRequirement, tax, upload } = formData

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
                    label="Nationality"
                    selectedItem={info.fields.nationality}
                    items={[]}
                    onSelect={(nationality) => onChangeInfoHandler('nationality', nationality)}
                  />
                  <Select
                    label="Citizenship"
                    selectedItem={info.fields.citizenship}
                    items={[]}
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
                    label="Country"
                    selectedItem={address.fields.country}
                    items={[]}
                    onSelect={(country) => onChangeAddressHandler('country', country)}
                  />
                  <Select
                    label="City"
                    selectedItem={address.fields.city}
                    items={[]}
                    onSelect={(city) => onChangeAddressHandler('city', city)}
                  />
                </FormGrid>

                <FormGrid>
                  <Select
                    label="State"
                    selectedItem={address.fields.state}
                    items={[]}
                    onSelect={(state) => onChangeAddressHandler('state', state)}
                  />
                  <TextInput
                    onChange={(e) => onChangeAddressHandler('postalCode', e.currentTarget.value)}
                    value={address.fields.postalCode}
                    label="Postal code"
                  />
                </FormGrid>
              </Column>
            </FormCard>

            <FormCard id="funds">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{funds.title}</TYPE.title6>
                {funds.passed && <BigPassed />}
              </RowBetween>
              <FormGrid columns={4}>
                {sourceOfFunds.map(({ id, name }) => (
                  <RadioButton
                    checked={funds.fields.includes(name)}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        funds: { ...funds, fields: [...funds.fields, name] },
                      })
                    }
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

              <Column style={{ gap: '20px' }}>
                <RadioButton
                  checked={investor.value === true}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      investor: { ...investor, value: true },
                    })
                  }
                  label={`I declare that i am “individual accredited Investor"`}
                />
                <RadioButton
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
            </FormCard>

            <FormCard id="fatca">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{fatca.title}</TYPE.title6>
                {fatca.passed && <BigPassed />}
              </RowBetween>

              <ExtraInfoCard>
                <TYPE.buttonMuted>
                  Praesent sapien massa, convallis a pellentesque nec, egestas non FATCA
                </TYPE.buttonMuted>
              </ExtraInfoCard>

              <Column style={{ gap: '20px', marginTop: 20 }}>
                {fatcaOptions.map(({ id, name }) => (
                  <RadioButton
                    checked={fatca.fields.includes(name)}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        fatca: { ...fatca, fields: [...fatca.fields, name] },
                      })
                    }
                    key={`fatca-${id}`}
                    label={name}
                  />
                ))}
              </Column>
            </FormCard>

            <FormCard id="optInRequirement">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{optInRequirement.title}</TYPE.title6>
                {optInRequirement.passed && <BigPassed />}
              </RowBetween>

              <ExtraInfoCard>
                <TYPE.buttonMuted>
                  <Trans>I confirm to be treated as an “Accredited Investor” by IXSwap</Trans>
                </TYPE.buttonMuted>
              </ExtraInfoCard>

              <Column style={{ gap: '20px', marginTop: 20 }}>
                {optInOptions.map(({ id, name }) => (
                  <RadioButton
                    checked={optInRequirement.fields.includes(name)}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        optInRequirement: { ...optInRequirement, fields: [...optInRequirement.fields, name] },
                      })
                    }
                    key={`optInRequirement-${id}`}
                    label={name}
                  />
                ))}
              </Column>
            </FormCard>

            <FormCard id="tax">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{`${tax.title} {${
                  tax.value ? 'YES' : 'NO'
                }}`}</TYPE.title6>
                {tax.passed && <BigPassed />}
              </RowBetween>
              <ExtraInfoCard>
                <TYPE.buttonMuted>
                  <Trans>Click here to know why we need tax information</Trans>
                </TYPE.buttonMuted>
              </ExtraInfoCard>
              <TYPE.title6 margin="20px 0px">
                <Trans>Are you currently solely a tax resident of Singapoore?</Trans>
              </TYPE.title6>
              <Column style={{ gap: '20px' }}>
                <RadioButton
                  label="Yes"
                  checked={tax.value === true}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tax: { ...tax, value: true },
                    })
                  }
                />
                {tax.value && (
                  <TextInput
                    label="My Singapoore NRIC/FIN is:"
                    value={tax.fin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tax: { ...tax, fin: e.currentTarget.value },
                      })
                    }
                  />
                )}
                <RadioButton
                  label="No"
                  checked={tax.value === false}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tax: { ...tax, value: false },
                    })
                  }
                />
                {!tax.value && (
                  <FormGrid>
                    <TextInput
                      label="Country of tax residency"
                      value={tax.taxResidency || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tax: { ...tax, taxResidency: e.currentTarget.value },
                        })
                      }
                    />
                    <TextInput
                      label="Tax identification number"
                      value={tax.taxId || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tax: { ...tax, taxId: e.currentTarget.value },
                        })
                      }
                    />
                  </FormGrid>
                )}
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
                <TextInput value={''} label="Bank Accounts" />
                <TextInput value={''} label="Investor Status Declaration" />
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
