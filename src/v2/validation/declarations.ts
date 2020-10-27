import * as yup from 'yup'
import {
  CorporateDeclarations,
  DeclarationValue,
  IndividualDeclarations
} from 'v2/app/pages/identity/const/declarations'

const required = yup.mixed().oneOf([DeclarationValue.Yes]).required()

const optional = yup
  .mixed()
  .oneOf([DeclarationValue.Yes, DeclarationValue.No])
  .required()

export const individualDeclarationsSchema = yup
  .object()
  .shape<IndividualDeclarations>({
    InformAnyChanges: required,
    InvestaXPrivacyPolicy: required,
    InvestaXTermsOfUse: required,
    PrimaryIssuancePlatform: required,
    SecondaryTradingPlatform: required,
    TreatAsAccreditedInvestor: required,
    TrueAndCorrectInformation: required,
    IndividualFinancialAsset: optional,
    IndividualIncome: optional,
    JointlyHeldAccount: optional,
    NetPersonalAssets: optional,
    USPerson: optional
  })

export const corporateDeclarationsSchema = yup
  .object()
  .shape<CorporateDeclarations>({
    InformAnyChanges: required,
    InvestaXPrivacyPolicy: required,
    InvestaXTermsOfUse: required,
    PrimaryIssuancePlatform: required,
    SecondaryTradingPlatform: required,
    TreatAsAccreditedInvestor: required,
    TrueAndCorrectInformation: required,
    AuthorizeAccountOpening: required,
    NetAssets: optional,
    ShareholderIsAccreditedInvestor: optional,
    AllBeneficiariesAreAccreditedInvestors: optional,
    AllPartnersAreAccreditedInvestors: optional,
    USPerson: optional
  })
