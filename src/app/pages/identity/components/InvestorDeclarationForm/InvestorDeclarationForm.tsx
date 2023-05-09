import React, { useState, useEffect, useRef } from 'react'
import { Grid, Typography, RadioGroup, FormControlLabel } from '@mui/material'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { DeclarationsListFields } from 'app/pages/identity/components/InvestorDeclarationForm/DeclarationsList/DeclartionsListFields'
import {
  OptInAgreements,
  OptInAgreementsIndividual
} from 'app/pages/identity/components/InvestorDeclarationForm/OptInAgreements/OptInAgreements'
import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { useFormContext } from 'react-hook-form'
import { IdentityType, InvestorRole } from 'app/pages/identity/utils/shared'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { CorporateDocuments } from 'app/pages/identity/components/InvestorDeclarationForm/CorporateDocuments/CorporateDocuments'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'
import { SafeguardAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardsAgreements/SafeguardAgreements'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import classnames from 'classnames'
import { IndividualUploadDocumentsForm } from '../UploadDocumentsForm/IndividualUploadDocumentsForm'
import { TypedField } from 'components/form/TypedField'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface InvestorDeclarationFormProps {
  identityType?: IdentityType
  corporateType?: 'investor' | 'issuer'
}

export const InvestorDeclarationForm = ({
  identityType = 'individual',
  corporateType = 'issuer'
}: InvestorDeclarationFormProps) => {
  const { formState, trigger, control, setValue } = useFormContext()
  const classes = useStyles()
  const investorRoles = ['accredited', 'expert', 'institutional']
  const [investorRole, setInvestorRole] = useState('accredited')
  const isCorporate = identityType === 'corporate'
  const radioButtonRef = useRef<any>()

  if (!isCorporate) {
    investorRoles.pop()
  }

  const declaredInvestorRole = `I declare that I am an ${capitalizeFirstLetter(
    investorRole
  )} Investor.`

  const hasDeclaredInstitutionalInvestor = investorRole === 'institutional'

  const getOptInData = (type: IdentityType) => {
    if (type === 'individual') {
      return [
        {
          name: 'optInAgreementsSafeguards',
          label: (
            <SafeguardAgreements
              investorRole={capitalizeFirstLetter(investorRole)}
            />
          )
        },
        {
          name: 'optInAgreementsOptOut',
          label: (
            <OptInAgreementsIndividual
              investorRole={capitalizeFirstLetter(investorRole)}
              showOptOutDialog
            />
          )
        }
      ]
    }

    return [
      {
        name: 'optInAgreements',
        label: (
          <OptInAgreements
            investorRole={capitalizeFirstLetter(investorRole)}
            showOptOutDialog
          />
        )
      }
    ]
  }

  const {
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors,
    optInAgreements,
    digitalSecurities,
    primaryOfferingServices,
    digitalSecuritiesIssuance,
    allServices,
    isInstitutionalInvestor,
    isIntermediaryInvestor,
    financialAsset,
    income,
    personalAssets,
    jointlyHeldAccount,
    expertInvestorAgreement,
    optInAgreementsOptOut,
    optInAgreementsSafeguards
  } = formState.dirtyFields

  useEffect(() => {
    const role = control.defaultValuesRef.current.applyingAs
    const index = role === 'expert' ? 1 : role === 'institutional' ? 2 : 0

    radioButtonRef?.current?.children[index]?.click()
  }, [control])

  useEffect(() => {
    void trigger()
  }, [
    assets,
    trustee,
    accreditedShareholders,
    partnership,
    accreditedBeneficiaries,
    accreditedSettlors,
    optInAgreements,
    digitalSecurities,
    primaryOfferingServices,
    digitalSecuritiesIssuance,
    allServices,
    isInstitutionalInvestor,
    isIntermediaryInvestor,
    financialAsset,
    income,
    personalAssets,
    jointlyHeldAccount,
    expertInvestorAgreement,
    optInAgreementsOptOut,
    optInAgreementsSafeguards,
    trigger
  ])

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid
        item
        data-testid='investorStatusDeclaration'
        container
        spacing={2}
        direction={'column'}
      >
        <Grid item xs={12}>
          <FieldContainer>
            <Grid container spacing={3} direction={'column'}>
              <Grid item>
                <FormSectionHeader title='Investor Role Declaration' />
              </Grid>
              <Grid item>
                <TypedField
                  customRenderer
                  component={RadioGroup}
                  name='applyingAs'
                  label=''
                  control={control}
                  defaultValue={'accredited'}
                >
                  <Grid
                    container
                    display={'flex'}
                    gap={1.5}
                    ref={radioButtonRef}
                  >
                    {investorRoles.map(role => {
                      return (
                        <Grid
                          item
                          data-testid={'buttonWrapper'}
                          flexGrow={1}
                          flexBasis={0}
                          className={classnames(classes.button, {
                            [classes.active]: investorRole === role
                          })}
                          onClick={() => {
                            setInvestorRole(role)
                            setValue('applyingAs', role)
                          }}
                        >
                          <FormControlLabel
                            label={`${capitalizeFirstLetter(role)} Investor`}
                            value={role}
                            control={<UIRadio />}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
                </TypedField>
              </Grid>

              {!hasDeclaredInstitutionalInvestor && (
                <Grid item>
                  <Typography>{declaredInvestorRole}</Typography>
                </Grid>
              )}

              <Grid item>
                <InvestorAgreements
                  type={identityType}
                  role={investorRole as InvestorRole}
                />
              </Grid>
            </Grid>
          </FieldContainer>
        </Grid>

        {!hasDeclaredInstitutionalInvestor ? (
          <>
            {' '}
            <Grid item xs={12}>
              <FieldContainer>
                <Grid container direction={'column'} spacing={5}>
                  <Grid item container spacing={3} direction={'column'}>
                    <Grid item>
                      <FormSectionHeader title={'Opt-In Requirement'} />
                    </Grid>
                    <Grid item>
                      <DeclarationsListFields
                        data={getOptInData(identityType)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </FieldContainer>
            </Grid>
            {isCorporate ? (
              <CorporateDocuments corporateType={corporateType} />
            ) : (
              <Grid item xs={12}>
                <FieldContainer>
                  <IndividualUploadDocumentsForm />
                </FieldContainer>
              </Grid>
            )}
          </>
        ) : (
          <Grid item xs={12}>
            <FieldContainer>
              <Grid item container direction={'column'}>
                <Grid item>
                  <FormSectionHeader
                    title={'Institutional Investor Documents'}
                  />
                </Grid>
                <Grid item>
                  <Grid item>
                    <UploadDocumentField
                      name='institutionalInvestorDocuments'
                      label='Institutional Investor Documents'
                      hideLabel
                      helperElement={
                        <Typography
                          color={'text.secondary'}
                          mt={1.5}
                          fontWeight={400}
                        >
                          Institutional Investor Documents - License issued by
                          Regulator
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </FieldContainer>
          </Grid>
        )}
      </Grid>
      <ValidateOnMount />
    </Grid>
  )
}