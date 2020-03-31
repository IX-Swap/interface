import * as yup from 'yup'
import {
  MARITAL_STATUSES,
  GENDERS,
  COUNTRIES,
  ALPHA_NUMERIC_OR_EMPTY_REGEX
} from 'const'
import createDate18YearsAgo from 'pages/identity/helpers/createDate18YearsAgo'

const REQUIRED_ERR_MSG = 'This field is required'

export const createIDBasic = () =>
  yup.object().shape({
    firstName: yup.string().required(REQUIRED_ERR_MSG),
    middleName: yup.string(),
    lastName: yup.string().required(REQUIRED_ERR_MSG),
    dob: yup
      .date(REQUIRED_ERR_MSG)
      .max(createDate18YearsAgo(), 'You must be at least 18 years old')
      .required(REQUIRED_ERR_MSG),
    maritalStatus: yup
      .mixed()
      .oneOf(MARITAL_STATUSES, REQUIRED_ERR_MSG)
      .required(REQUIRED_ERR_MSG),
    gender: yup
      .mixed()
      .oneOf(GENDERS, REQUIRED_ERR_MSG)
      .required(REQUIRED_ERR_MSG),
    contactNumber: yup.string().required(REQUIRED_ERR_MSG),
    nationality: yup
      .mixed()
      .oneOf(COUNTRIES, REQUIRED_ERR_MSG)
      .required(REQUIRED_ERR_MSG)
  })

export const createIDAddressSchema = () =>
  yup.object().shape({
    unit: yup.string(),
    line1: yup.string().required(REQUIRED_ERR_MSG),
    line2: yup.string(),
    city: yup.string().required('This field required'),
    postalCode: yup
      .string()
      .matches(
        ALPHA_NUMERIC_OR_EMPTY_REGEX,
        'This field may only contain alphabet or numbers'
      ),
    state: yup.string(),
    country: yup
      .mixed()
      .oneOf(COUNTRIES, REQUIRED_ERR_MSG)
      .required(REQUIRED_ERR_MSG),
    countryOfResidence: yup
      .mixed()
      .oneOf(COUNTRIES, REQUIRED_ERR_MSG)
      .required(REQUIRED_ERR_MSG)
  })

export const createIDDocumentsSchema = () =>
  yup.object().shape({
    idFile: yup.mixed().required(REQUIRED_ERR_MSG),
    utilityBillFile: yup.mixed().required(REQUIRED_ERR_MSG)
  })

export const createIDOccupationSchema = () =>
  yup.object().shape({
    occupation: yup.string().required(REQUIRED_ERR_MSG),
    employmentStatus: yup.string().required(REQUIRED_ERR_MSG),
    employer: yup.string().required(REQUIRED_ERR_MSG),
    industryOfEmployment: yup.string().required(REQUIRED_ERR_MSG)
  })

export const createIDBankAccount = () =>
  yup.object().shape({
    bankName: yup.string().required('This field is required'),
    bankAccountName: yup.string().required('This field is required'),
    bankAccountNumber: yup.string().required('This field is required')
  })

export const createIDIncomeSchema = () =>
  yup.object().shape({
    annualIncome: yup.string().required('This field is required'),
    houseHoldIncome: yup.string().required('This field is required'),
    sourceOfWealth: yup.string().required('This field is required'),
    politicallyExposed: yup.boolean().required('This field is required')
  })

const TRUE_OR_FALSE_YUP = yup
  .mixed()
  .oneOf(['true', 'false'], 'This field is required')
export const createIDAcrdInvestorSchema = () =>
  yup.object().shape({
    selfAccreditedInvestor: TRUE_OR_FALSE_YUP
  })

export const createIDAcrdInfoSchema = () =>
  yup.object().shape({
    totalPersonalAssetExceedsTwoMillionSGD: TRUE_OR_FALSE_YUP,
    lastTwelveMonthIncomeGreatherThanThreeHundredThousands: TRUE_OR_FALSE_YUP,
    personalFinancialAssetsExceedsOneMillion: TRUE_OR_FALSE_YUP,
    jointlyHeldAccountMeetingAnyAbove: TRUE_OR_FALSE_YUP
  })

export const createIDProofOfWealthSchema = () =>
  yup.object().shape({
    proofOfWealth: yup.mixed().required('This field is required')
  })

export const createIndividualSchema = () =>
  mergeSchemas(
    createIDBasic(),
    createIDAddressSchema(),
    createIDDocumentsSchema(),
    createIDOccupationSchema(),
    createIDBankAccount(),
    createIDIncomeSchema(),
    createIDAcrdInvestorSchema(),
    createIDAcrdInfoSchema(),
    createIDProofOfWealthSchema()
  )

const mergeSchemas = (...schemas) => {
  const [first, ...rest] = schemas
  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  )

  return merged
}
