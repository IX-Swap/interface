import * as yup from 'yup'
import {
  CorporateDeclarations,
  DeclarationValue,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import {
  corporateAccreditedInvestorValidator,
  individualAccreditedInvestorValidator
} from 'validation/validators'

const required = yup
  .mixed()
  .oneOf([DeclarationValue.Yes])
  .required('This field is required')

const optional = yup
  .mixed()
  .oneOf([DeclarationValue.Yes, DeclarationValue.No])
  .required('This field is required')

export const individualDeclarationsSchema = yup
  .object()
  .shape<IndividualDeclarations>({
    InformAnyChanges: required,
    InvestaXPrivacyPolicy: required,
    InvestaXTermsOfUse: required,
    PrimaryIssuancePlatform: required,
    TreatAsAccreditedInvestor: required,
    TrueAndCorrectInformation: required,
    IndividualFinancialAsset: optional,
    IndividualIncome: optional,
    JointlyHeldAccount: optional,
    NetPersonalAssets: optional,
    USPerson: optional
  })
  .test(
    'individualAccreditedInvestor',
    'At least one must be checked',
    individualAccreditedInvestorValidator
  )

export const corporateDeclarationsSchema = yup
  .object()
  .shape<CorporateDeclarations>({
    InformAnyChanges: required,
    InvestaXPrivacyPolicy: required,
    InvestaXTermsOfUse: required,
    PrimaryIssuancePlatform: required,
    TreatAsAccreditedInvestor: required,
    TrueAndCorrectInformation: required,
    AuthorizeAccountOpening: required,
    NetAssets: optional,
    ShareholderIsAccreditedInvestor: optional,
    AllBeneficiariesAreAccreditedInvestors: optional,
    AllPartnersAreAccreditedInvestors: optional,
    USPerson: optional
  })
  .test(
    'corporateAccreditedInvestor',
    'At least one must be checked',
    corporateAccreditedInvestorValidator
  )
