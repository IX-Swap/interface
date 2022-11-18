import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'
import _ from 'lodash'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
<<<<<<< Updated upstream
import {
  DSOBaseFormValues,
  DsoFAQItem,
  DsoTeamMember,
  DsoVideo
} from 'types/dso'
=======
<<<<<<< HEAD
import { DsoFAQItem, DSOFormValues, DsoTeamMember, DsoVideo } from 'types/dso'
=======
import {
  DsoFAQItem,
  DSOFormValues,
  DSOBaseFormValues,
  DsoTeamMember,
  DsoVideo
} from 'types/dso'
>>>>>>> 440082842 (DSO Step 1 integration)
import { array, number, object, string } from 'yup'
>>>>>>> Stashed changes
import { corporateName, lettersOrSpaces } from 'validation/regexes'
import { array, boolean, number, object, string } from 'yup'
import { dateSchema, validationMessages } from './shared'
import {
  isBeforeDate,
  pastDateValidator,
  uniqueIdentifierCodeValidator
} from './validators'
import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'

const numberTransformer = (cv: number, ov: any) => {
  return ov === '' ? undefined : cv
}

export const dsoTeamMemberSchema = object().shape<DsoTeamMember>({
  about: string(),
  name: string().required('Team Member Name is required'),
  position: string().required('Team Member Position is required'),
  photo: string().required('Team Member Photo is required')
})

export const dsoFAQItemSchema = object().shape<DsoFAQItem>(
  {
    question: string().when('answer', {
      is: answer => Boolean(answer),
      then: string().required('Question is required when answer is provided')
    }),
    answer: string().when('question', {
      is: question => Boolean(question),
      then: string().required('Answer is required when question is provided')
    })
  },
  [
    ['answer', 'question'],
    ['question', 'answer']
  ]
)

export const dsoVideoLinkSchema = object().shape<DsoVideo>(
  {
    title: string().when('link', {
      is: link => Boolean(link),
      then: string().required('Video Title is required when link is provided')
    }),
    link: string().when('title', {
      is: title => Boolean(title),
      then: string().required('Video Link is required when title is provided')
    })
  },
  [
    ['title', 'link'],
    ['link', 'title']
  ]
)

export const dsoFormBaseValidationSchema = {
  businessModel: string().required('Business Model is required'),
  capitalStructure: string().required('Capital Structure is required'),
  corporate: string()
    .max(50, 'Maximum of 50 characters')
    .required('Corporate is required')
    .matches(
      corporateName,
      "Corporate must include only letters, numbers and these special characters . , - ; & '"
    ),
  currency: string().required('Currency is required'),
  investmentPeriod: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: capitalStructure =>
        capitalStructure === 'Equity' || capitalStructure === 'Debt',
      then: number()
        .transform(numberTransformer)
        .required('Investment Period is required')
    }),
  issuerName: string().required('Issuer Name is required'),
  launchDate: dateSchema
    .required('Launch Date is is required')
    .test(
      'before-completionDate',
      'Launch Date cannot be later than Completion Date',
      function (launch) {
        const { completionDate } = this.parent
        return isBeforeDate(launch, completionDate)
      }
    )
    .test('pastDate', 'Launch Date must be future date', pastDateValidator),
  completionDate: dateSchema
    .required('Completion Date is required')
    .test('futureDate', 'Launch Date must be future date', pastDateValidator),
  minimumInvestment: number()
    .typeError('Minimum Investment must be a number')
    .nullable()
    .required('Minimum Investment is required'),
  pricePerUnit: number()
    .typeError('Unit Price must be a number')
    .nullable()
    .required('Unit Price is required'),
  subscriptionDocument: object<DataroomFile>().required(),
  tokenName: string()
    .required('Token Name is required')
    .matches(lettersOrSpaces, 'Token Name must not have special characters'),
  tokenSymbol: string()
    .required('Token Symbol is required')
    .min(2, 'Minimum 2 characters')
    .max(6, 'Maximum 6 characters'),
  totalFundraisingAmount: number()
    .required('Total Fundraising Amount is required')
    .typeError('Total Fundraising Amount must be a number')
    .nullable(),
  logo: string().required('Logo is required'),
  status: string(),
  // documents: array<FormArrayElement<DataroomFile>>()
  //   .ensure()
  //   .required('Documents are required'),
  faqs: array<DsoFAQItem>()
    .of(dsoFAQItemSchema.required(validationMessages.required))
    .required('FAQs are required'),
  videos: array<DsoVideo>()
    .of(dsoVideoLinkSchema.required('Videos are required'))
    .required(validationMessages.required),
  uniqueIdentifierCode: string()
    .test(
      'length',
      'Unique identifier code is required',

      uniqueIdentifierCodeValidator
    )
    .nullable()
}

<<<<<<< Updated upstream
export const dsoInformationValidationSchemaStep1: any = {
  logo: string().required('Logo is required'),
=======
<<<<<<< HEAD
=======
export const dsoInformationValidationSchemaStep1 = {
>>>>>>> Stashed changes
  capitalStructure: string().required('Capital Structure is required'),
  corporate: string()
    .max(50, 'Maximum of 50 characters')
    .required('Corporate is required')
    .matches(
      corporateName,
      "Corporate must include only letters, numbers and these special characters . , - ; & '"
    ),
  currency: string().required('Currency is required'),
<<<<<<< Updated upstream
  isCampaign: boolean(),
=======
  distributionFrequency: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Distribution Frequency is required')
  }),
  dividendYield: number().when('capitalStructure', {
    is: 'Equity',
    then: number()
      .transform(numberTransformer)
      .required('Dividend Yield is required')
  }),
  equityMultiple: number().when('capitalStructure', {
    is: 'Equity',
    then: number()
      .transform(numberTransformer)
      .required('Equity Multiple is required')
  }),
  grossIRR: number().when('capitalStructure', {
    is: 'Equity',
    then: number()
      .transform(numberTransformer)
      .required('Gross IRR is required')
  }),
  interestRate: number().when('capitalStructure', {
    is: 'Debt',
    then: number()
      .transform(numberTransformer)
      .required('Interest Rate is required')
  }),
  investmentPeriod: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: capitalStructure =>
        capitalStructure === 'Equity' || capitalStructure === 'Debt',
      then: number()
        .transform(numberTransformer)
        .required('Investment Period is required')
    }),
  investmentStructure: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Investment Structure is required')
  }),
>>>>>>> Stashed changes
  issuerName: string().required('Issuer Name is required'),
  launchDate: dateSchema
    .required('Launch Date is required')
    .test(
      'before-completionDate',
<<<<<<< Updated upstream
      'Launch Date cannot be later than Completion Date',
=======
      'Launch date cannot be later than completion date',
>>>>>>> Stashed changes
      function (launch) {
        const { completionDate } = this.parent
        return isBeforeDate(launch, completionDate)
      }
    )
    .test('pastDate', 'Launch Date must be future date', pastDateValidator),
  completionDate: dateSchema
    .required('Completion Date is required')
    .test('futureDate', 'Launch Date must be future date', pastDateValidator),
<<<<<<< Updated upstream
=======
  leverage: number().when('capitalStructure', {
    is: 'Debt',
    then: number().transform(numberTransformer).required('Leverage is required')
  }),
>>>>>>> Stashed changes
  minimumInvestment: number()
    .typeError('Minimum Investment must be a number')
    .nullable()
    .required('Minimum Investment is required'),
  pricePerUnit: number()
    .typeError('Unit Price must be a number')
    .nullable()
    .required('Unit Price is required'),
  tokenName: string()
    .required('Token Name is required')
    .matches(lettersOrSpaces, 'Token Name must not have special characters'),
<<<<<<< Updated upstream
  tokenSymbol: string()
    .required('Token Symbol is required')
    .min(2, 'Minimum 2 characters')
    .max(6, 'Maximum 6 characters'),
=======
  tokenSymbol: string().required('Token Symbol is required'),
>>>>>>> Stashed changes
  totalFundraisingAmount: number()
    .required('Total Fundraising Amount is required')
    .typeError('Total Fundraising Amount must be a number')
    .nullable(),
<<<<<<< Updated upstream
  status: string(),
  uniqueIdentifierCode: string()
    .test(
      'length',
      'Unique identifier code is required',
      uniqueIdentifierCodeValidator
    )
    .nullable(),
  decimalPlaces: number()
    .required('Decimal Places value is required')
    .typeError('Decimal Places must be a number'),
  step: number()
}

export const createDSOInformationSchema = object()
  .shape<DSOBaseFormValues>({
=======
  logo: string().required('Logo is required'),
  status: string(),
  uniqueIdentifierCode: string().test(
    'length',
    'Unique identifier code is required',
    uniqueIdentifierCodeValidator
  )
}

>>>>>>> 440082842 (DSO Step 1 integration)
export const createDSOValidationSchema = object()
  .shape<DSOFormValues>({
>>>>>>> Stashed changes
    network: string().required('Network is required'),
    ...dsoInformationValidationSchemaStep1
  })
  .notRequired()

<<<<<<< Updated upstream
export const editDSOValidationSchemaStep1 = object()
  .shape<DSOBaseFormValues>({
=======
<<<<<<< HEAD
=======
export const createDSOInformationSchema = object()
  .shape<DSOBaseFormValues>({
    network: string().required('Network is required'),
    ...dsoInformationValidationSchemaStep1
  })
  .notRequired()

>>>>>>> 440082842 (DSO Step 1 integration)
export const editDSOValidationSchema = object()
  .shape<DSOFormValues>({
>>>>>>> Stashed changes
    network: string(),
    ...dsoInformationValidationSchemaStep1
  })
  .notRequired()

<<<<<<< Updated upstream
export const editLiveDSOValidationSchemaStep1 = object()
  .shape<DSOBaseFormValues>({
    ...dsoInformationValidationSchemaStep1,
=======
<<<<<<< HEAD
=======
export const editDSOValidationSchemaStep1 = object()
  .shape<DSOBaseFormValues>({
    network: string(),
    ...dsoInformationValidationSchemaStep1
  })
  .notRequired()

>>>>>>> 440082842 (DSO Step 1 integration)
export const editLiveDSOValidationSchema = object()
  .shape<DSOFormValues>({
    ...dsoFormBaseValidationSchema,
>>>>>>> Stashed changes
    network: string(),
    launchDate: string().required(validationMessages.required),
    completionDate: string().required(validationMessages.required)
  })
  .notRequired()

<<<<<<< Updated upstream
export const getDSOInformationSchema = (data: any) => {
  const isNew = _.isEqual(data, transformDSOToFormValues())
  const isLive = isDSOLive(data)

=======
<<<<<<< HEAD
=======
export const editLiveDSOValidationSchemaStep1 = object()
  .shape<DSOBaseFormValues>({
    ...dsoFormBaseValidationSchema,
    network: string(),
    launchDate: string().required(validationMessages.required),
    completionDate: string().required(validationMessages.required)
  })
  .notRequired()

export const getDSOInformationSchema = (data: any) => {
  const isNew = data === transformDSOToFormValues(undefined)
  const isLive = isDSOLive(data)

  if (isNew) {
    return createDSOInformationSchema
  }

  return isLive
    ? editLiveDSOValidationSchemaStep1
    : editDSOValidationSchemaStep1
}

>>>>>>> 440082842 (DSO Step 1 integration)
export const getDSOValidationSchema = (isNew: boolean, isLive: boolean) => {
>>>>>>> Stashed changes
  if (isNew) {
    return createDSOInformationSchema
  }

  return isLive
    ? editLiveDSOValidationSchemaStep1
    : editDSOValidationSchemaStep1
}

export const getDSOCompanyInformationSchema = object().shape<any>({
  // introduction: string()
  //   // eslint-disable-next-line
  //   .test('default_values', 'Introduction is required', introductionValidator)
  //   .required('Introduction is required'),
  // useOfProceeds: string()
  //   // eslint-disable-next-line
  //   .test('default_values', 'Use of Proceeds is required', proceedsValidator)
  //   .required('Use of Proceeds is required'),
  // businessModel: string()
  //   // eslint-disable-next-line
  //   .test(
  //     'default_values',
  //     'Business Model is required',
  //     businessModelValidation
  //   )
  //   .required('Business Model is required'),
  // fundraisingMilestone: string()
  //   // eslint-disable-next-line
  //   .test(
  //     'default_values',
  //     'Fundraising Milestone is required',
  //     fundraisingValidation
  //   )
  //   .required('Fundraising Milestone is required'),
  step: number()
})

export const getDSODocumentschema = object().shape<any>({
  subscriptionDocument: object<DataroomFile>()
    .required('Subscription Document is required')
    .nullable(),
  documents: array<FormArrayElement<DataroomFile>>()
    .ensure()
    .required('Documents are required'),
  faqs: array<DsoFAQItem>().of(dsoFAQItemSchema),
  videos: array<DsoVideo>().of(dsoVideoLinkSchema),
  step: number()
})
