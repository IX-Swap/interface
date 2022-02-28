import React, { FC, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { getNames } from 'country-list'
import { FileWithPath } from 'react-dropzone'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import { KYCProgressBar } from './KYCProgressBar'
import { ButtonText, ButtonIXSGradient } from 'components/Button'
import { TYPE } from 'theme'
import { GradientText, StyledBodyWrapper } from 'pages/CustodianV2/styleds'
import { RowBetween } from 'components/Row'
import { Select, TextInput, Uploader } from './common'
import { PhoneInput } from 'components/PhoneInput'
import { DateInput } from 'components/DateInput'
import { Checkbox } from 'components/Checkbox'

import {
  empleymentStatuses,
  genders,
  initialCorporateKycFormData,
  corporateSourceOfFunds,
  legalEntityTypes,
  entityTypes,
  corporateRepresentOptions,
} from './mock'
import { Grid, FormCard, FormGrid, ExtraInfoCard, Divider } from './styleds'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { ReactComponent as BigPassed } from 'assets/images/check-success-big.svg'

import { ChooseFile, BeneficialOwnersTable, DeleteRow } from './common'

export default function CorporateKycForm() {
  const [formData, setFormData] = useState(initialCorporateKycFormData)
  const history = useHistory()

  const {
    info,
    authorizedPersonnel,
    address,
    residentialAddress,
    funds,
    corporate,
    fatca,
    taxDeclaration,
    beneficialOwners,
    upload,
  } = formData

  const goBack = () => {
    history.push('/kyc')
  }

  const onChangeInfoHandler = (fieldName: string, value: string | boolean) => {
    setFormData({
      ...formData,
      info: { ...info, fields: { ...info.fields, [fieldName]: value } },
    })
  }

  const onChangeAuthorizedPersonnelHandler = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      authorizedPersonnel: { ...address, fields: { ...address.fields, [fieldName]: value } },
    })
  }

  const onChangeAddressHandler = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      address: { ...address, fields: { ...address.fields, [fieldName]: value } },
    })
  }

  const onChangeResidentialAddressHandler = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      residentialAddress: { ...residentialAddress, fields: { ...residentialAddress.fields, [fieldName]: value } },
    })
  }

  const onChangeTaxDeclarationHandler = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      taxDeclaration: { ...taxDeclaration, fields: { ...taxDeclaration.fields, [fieldName]: value } },
    })
  }

  const changeBeneficiar = (fieldName: string, value: string | FileWithPath, index: number) => {
    const beneficiar = beneficialOwners.fields[index]
    const newData = [...beneficialOwners.fields]
    newData.splice(index, 1, { ...beneficiar, [fieldName]: value })

    setFormData({
      ...formData,
      beneficialOwners: {
        ...beneficialOwners,
        fields: newData,
      },
    })
  }

  const addBeneficiar = () => {
    setFormData({
      ...formData,
      beneficialOwners: {
        ...beneficialOwners,
        fields: [
          ...beneficialOwners.fields,
          { fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null },
        ],
      },
    })
  }

  const deleteBeneficiar = (index: number) => {
    const newData = [...beneficialOwners.fields]
    newData.splice(index, 1)

    if (!newData.length) {
      newData.push({ fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null })
    }

    setFormData({
      ...formData,
      beneficialOwners: {
        ...beneficialOwners,
        fields: newData,
      },
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
    <StyledBodyWrapper>
      <ButtonText style={{ textDecoration: 'none' }} display="flex" marginBottom="64px" onClick={goBack}>
        <ArrowLeft />
        <TYPE.title4 display="flex" marginLeft="10px">
          <Trans>
            KYC as <GradientText style={{ marginLeft: 8 }}>Corporate</GradientText>
          </Trans>
        </TYPE.title4>
      </ButtonText>

      <Grid>
        <div style={{ maxHeight: '1000px', overflowY: 'scroll', gap: '35px' }}>
          <Column style={{ gap: '35px' }}>
            <FormCard id="info">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{info.title}</TYPE.title6>
                {info.passed && <BigPassed />}
              </RowBetween>

              <Column style={{ gap: '20px' }}>
                <FormGrid columns={2}>
                  <TextInput
                    onChange={(e) => onChangeInfoHandler('corporateName', e.currentTarget.value)}
                    value={info.fields.corporateName}
                    label="Corporate Name"
                  />
                  <Select
                    withScroll
                    label="Type of legal entity"
                    selectedItem={info.fields.legalEntityType}
                    items={legalEntityTypes}
                    onSelect={(type) => onChangeInfoHandler('legalEntityType', type)}
                  />
                </FormGrid>

                <FormGrid columns={info.fields.legalEntityType.id === legalEntityTypes.length ? 3 : 2}>
                  <TextInput
                    onChange={(e) => onChangeInfoHandler('registrationNumber', e.currentTarget.value)}
                    value={info.fields.registrationNumber}
                    label="Registration Number"
                  />
                  <Select
                    withScroll
                    label="Country of Incorporation"
                    selectedItem={info.fields.country}
                    items={countries}
                    onSelect={(country) => onChangeInfoHandler('country', country)}
                  />
                  {info.fields.legalEntityType.id === legalEntityTypes.length && (
                    <TextInput
                      label="Other Entity"
                      onChange={(e) => onChangeInfoHandler('otherLegalEntityType', e.currentTarget.value)}
                      value={info.fields.otherLegalEntityType}
                    />
                  )}
                </FormGrid>

                <FormGrid>
                  <TextInput
                    label="Business Activity"
                    value={info.fields.businessActivity}
                    onChange={(e) => onChangeInfoHandler('businessActivity', e.currentTarget.value)}
                  />
                  <Select
                    withScroll
                    label="Entity Type"
                    selectedItem={info.fields.entityType}
                    items={entityTypes}
                    onSelect={(entityType) => onChangeInfoHandler('entityType', entityType)}
                  />
                </FormGrid>
                <FormGrid columns={1}>
                  <Checkbox
                    checked={info.fields.isIncorporated}
                    onClick={() => onChangeInfoHandler('isIncorporated', !info.fields.isIncorporated)}
                    label="Is Incorporated"
                  />
                </FormGrid>
              </Column>
            </FormCard>

            <FormCard id="authorizedPersonnel">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{authorizedPersonnel.title}</TYPE.title6>
                {authorizedPersonnel.passed && <BigPassed />}
              </RowBetween>

              <Column style={{ gap: '20px' }}>
                <FormGrid>
                  <TextInput
                    onChange={(e) => onChangeAuthorizedPersonnelHandler('fullname', e.currentTarget.value)}
                    value={authorizedPersonnel.fields.fullname}
                    label="Full Name"
                  />
                  <TextInput
                    onChange={(e) => onChangeAuthorizedPersonnelHandler('designation', e.currentTarget.value)}
                    value={authorizedPersonnel.fields.designation}
                    label="Designation"
                  />
                </FormGrid>

                <FormGrid>
                  <TextInput
                    onChange={(e) => onChangeAuthorizedPersonnelHandler('email', e.currentTarget.value)}
                    value={address.fields.email}
                    label="Email"
                  />
                  <PhoneInput
                    onChange={(value) => onChangeAuthorizedPersonnelHandler('phone', value)}
                    value={address.fields.phone}
                    label="Phone"
                  />
                </FormGrid>
                <FormGrid columns={1}>
                  <Uploader
                    title="Authorization Document"
                    subtitle="Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus."
                    file={null}
                    onDrop={() => {
                      console.log('drop')
                    }}
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

            <FormCard id="residentialAddress">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{residentialAddress.title}</TYPE.title6>
                {residentialAddress.passed && <BigPassed />}
              </RowBetween>

              <Column style={{ gap: '20px' }}>
                <FormGrid>
                  <TextInput
                    onChange={(e) => onChangeResidentialAddressHandler('line1', e.currentTarget.value)}
                    value={residentialAddress.fields.line1}
                    label="Line 1"
                  />
                  <TextInput
                    onChange={(e) => onChangeResidentialAddressHandler('line2', e.currentTarget.value)}
                    value={residentialAddress.fields.line2}
                    label="Line 2"
                  />
                </FormGrid>

                <FormGrid>
                  <Select
                    withScroll
                    label="Country"
                    selectedItem={residentialAddress.fields.country}
                    items={countries}
                    onSelect={(country) => onChangeResidentialAddressHandler('country', country)}
                  />
                  <TextInput
                    onChange={(e) => onChangeResidentialAddressHandler('city', e.currentTarget.value)}
                    value={residentialAddress.fields.city}
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
                {corporateSourceOfFunds.map(({ id, name }: any) => (
                  <Checkbox
                    checked={funds.fields.includes(name)}
                    onClick={() => onSourceOfFundsChange(name)}
                    key={`funds-${id}`}
                    label={name}
                  />
                ))}
              </FormGrid>
              {funds.fields.includes('Others') && (
                <TextInput
                  style={{ marginTop: 20 }}
                  placeholder="Other Source of Funds...."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      funds: { ...funds, otherFunds: e.currentTarget.value },
                    })
                  }
                  value={funds.otherFunds || ''}
                />
              )}
            </FormCard>

            <FormCard id="corporate">
              <Column style={{ gap: '34px' }}>
                <Column style={{ gap: '16px' }}>
                  <Checkbox
                    scaleSize={1.4}
                    isRadio
                    checked={corporate.value === false}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        corporate: { ...corporate, value: false },
                      })
                    }
                    label={
                      <RowBetween>
                        <TYPE.title6 style={{ textTransform: 'uppercase' }}>
                          I am not an accredited investor
                        </TYPE.title6>
                        {corporate.passed && <BigPassed />}
                      </RowBetween>
                    }
                  />
                  <Checkbox
                    scaleSize={1.4}
                    isRadio
                    checked={corporate.value === true}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        corporate: { ...corporate, value: true },
                      })
                    }
                    label={
                      <TYPE.title6
                        style={{ textTransform: 'uppercase' }}
                      >{`I declare that i am “corporate accredited Investor”`}</TYPE.title6>
                    }
                  />
                </Column>
                {corporate.value && (
                  <Column style={{ gap: '24px' }}>
                    {corporateRepresentOptions.map((option, index) => (
                      <Checkbox
                        key={option}
                        isRadio
                        checked={corporate.represent === index}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            corporate: { ...corporate, represent: index },
                          })
                        }
                        label={option}
                      />
                    ))}
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
            <FormCard id="tax-declaration">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{taxDeclaration.title}</TYPE.title6>
                {taxDeclaration.passed && <BigPassed />}
              </RowBetween>

              <ExtraInfoCard>
                <TYPE.buttonMuted>
                  Please list all jurisdictions where the Entity is a resident for tax purposes and the respective TIN
                  for each jurisdiction.
                </TYPE.buttonMuted>
              </ExtraInfoCard>

              <Column style={{ gap: '20px', marginTop: 20 }}>
                <FormGrid>
                  <Select
                    withScroll
                    label="Country of tax residency"
                    selectedItem={taxDeclaration.fields.taxCountry}
                    items={countries}
                    onSelect={(country) => onChangeTaxDeclarationHandler('taxCountry', country)}
                  />
                  <TextInput
                    value={taxDeclaration.fields.identificationNumber}
                    label="Tax Indentification Number"
                    onChange={(e) => onChangeTaxDeclarationHandler('identificationNumber', e.currentTarget.value)}
                  />
                </FormGrid>
              </Column>
            </FormCard>
            <FormCard id="beneficial-owners">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{beneficialOwners.title}</TYPE.title6>
                {beneficialOwners.passed && <BigPassed />}
              </RowBetween>
              <ExtraInfoCard>
                <TYPE.buttonMuted>
                  Please upload the Proof of Identity and Proof of Address for Beneficial Owner. All account statements
                  and documents should be dated within 3 months.
                </TYPE.buttonMuted>
              </ExtraInfoCard>
              <BeneficialOwnersTable data={beneficialOwners.fields} />
              <Column style={{ gap: '20px' }}>
                {beneficialOwners.fields.map((beneficiar: Record<string, string | any>, index: number) => (
                  <>
                    <FormGrid columns={4} key={index}>
                      <DeleteRow onClick={() => deleteBeneficiar(index)}>
                        <TextInput
                          value={beneficiar.fullName}
                          onChange={(e) => changeBeneficiar('fullName', e.currentTarget.value, index)}
                        />
                      </DeleteRow>
                      <TextInput
                        type="number"
                        style={{ textAlign: 'center', fontSize: '20px' }}
                        value={beneficiar.shareholding}
                        onChange={(e) => changeBeneficiar('shareholding', e.currentTarget.value, index)}
                      />
                      <ChooseFile
                        file={beneficiar.profOfAddress}
                        onDrop={(file) => changeBeneficiar('profOfAddress', file, index)}
                      />
                      <ChooseFile
                        file={beneficiar.profOfIdentity}
                        onDrop={(file) => changeBeneficiar('profOfIdentity', file, index)}
                      />
                    </FormGrid>
                    {beneficialOwners.fields.length - 1 > index && <Divider />}
                  </>
                ))}
              </Column>
              <ButtonIXSGradient style={{ marginTop: 32, height: 40, fontSize: 16 }} onClick={addBeneficiar}>
                <Trans> Add Beneficiar</Trans>
              </ButtonIXSGradient>
            </FormCard>

            <FormCard id="upload">
              <RowBetween marginBottom="32px">
                <TYPE.title6 style={{ textTransform: 'uppercase' }}>{upload.title}</TYPE.title6>
                {upload.passed && <BigPassed />}
              </RowBetween>

              <Column style={{ gap: '40px' }}>
                <Uploader
                  title="Corporate documents"
                  subtitle="Company Registry Profile, Certificate of Incorporation, Memorandum and article association, Corporate registry profile, Company Organization Chart, Register of shareholders and directors and Partnership Deed, Trust Deed."
                  file={null}
                  onDrop={() => {
                    console.log('drop')
                  }}
                />

                <Uploader
                  title="Financial Documents"
                  subtitle="Please upload your balance sheet , P&L statement or Annual Returns"
                  file={null}
                  onDrop={() => {
                    console.log('drop')
                  }}
                />

                <Uploader
                  title="Evidence of Accreditation"
                  subtitle={
                    <ul>
                      <li>
                        <Trans>Copy of the most recent audited balance sheet of the corporation.</Trans>
                      </li>
                      <li>
                        <Trans>
                          Where the corporation is not required to prepare audited account regularly, a balance sheet of
                          the corporation certified by the corporation as giving a true and fair view of the state of
                          affairs of the corporation as of the date of the balance sheet, of which date shall be within
                          the preceding 12 months.
                        </Trans>
                      </li>
                    </ul>
                  }
                  file={null}
                  onDrop={() => {
                    console.log('drop')
                  }}
                  optional={!corporate.value}
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
    </StyledBodyWrapper>
  )
}
