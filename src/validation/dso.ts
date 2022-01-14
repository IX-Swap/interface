import { DsoFAQItem, DSOFormValues, DsoTeamMember, DsoVideo } from 'types/dso'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { string, number, array, object } from 'yup'
import { dateSchema } from './shared'
import { pastDateValidator, uniqueIdentifierCodeValidator } from './validators'

const numberTransformer = (cv: number, ov: any) => {
  return ov === '' ? undefined : cv
}

export const dsoTeamMemberSchema = object().shape<DsoTeamMember>({
  about: string(),
  name: string().required('Team member name is required'),
  position: string().required('Team member position is required'),
  photo: string().required('Team member photo is required')
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
      then: string().required('Video title is required when link is provided')
    }),
    link: string().when('title', {
      is: title => Boolean(title),
      then: string().required(
        'Video link is required when video title is provided'
      )
    })
  },
  [
    ['title', 'link'],
    ['link', 'title']
  ]
)

export const dsoFormBaseValidationSchema = {
  businessModel: string().required('Business model is required'),
  capitalStructure: string().required('Capital structure is required'),
  corporate: string()
    .max(50, 'Maximum of 50 characters')
    .required('Corporate is required')
    .matches(
      /^[a-zA-Z0-9.,-;]+([a-zA-Z0-9.,-; ]+)*$/,
      'Corporate must include only letters, numbers and this special characters . , -'
    ),
  currency: string().required('Currency is required'),
  distributionFrequency: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Distribution frequency is required')
  }),
  dividendYield: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number()
        .transform(numberTransformer)
        .required('Dividend yield is required')
    }),
  equityMultiple: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number()
        .transform(numberTransformer)
        .required('Equity multiple is required')
    }),
  fundraisingMilestone: string().required('Fundraising milestone is required'),
  grossIRR: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number()
        .transform(numberTransformer)
        .required('Gross IRR is required')
    }),
  interestRate: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Debt',
      then: number()
        .transform(numberTransformer)
        .required('Interest rate is required')
    }),
  introduction: string().required('Introduction is required'),
  investmentPeriod: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: capitalStructure =>
        capitalStructure === 'Equity' || capitalStructure === 'Debt',
      then: number()
        .transform(numberTransformer)
        .required('Investment period is required')
    }),
  investmentStructure: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Investment structure is required')
  }),
  issuerName: string().required('Issuer name is required'),
  launchDate: dateSchema
    .required('Launch date is is required')
    .test('pastDate', 'Launch Date must be future date', pastDateValidator),
  completionDate: dateSchema
    .required('Completion date is required')
    .test('futureDate', 'Launch Date must be future date', pastDateValidator),
  leverage: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Debt',
      then: number()
        .transform(numberTransformer)
        .required('Leverage is required')
    }),
  minimumInvestment: number()
    .typeError('Minimum investment must be a number')
    .nullable()
    .required('Minimum investment is required'),
  pricePerUnit: number()
    .typeError('Price per unit must be a number')
    .nullable()
    .required('Price per unit is required'),
  subscriptionDocument: object<DataroomFile>(),
  tokenName: string()
    .required('Token name is required')
    .matches(/^[a-zA-Z\s]*$/g, 'Token name must not have special characters'),
  tokenSymbol: string().required('Token symbol is required'),
  totalFundraisingAmount: number()
    .required('Total fundraising amount is required')
    .typeError('Total fundraising amount must be a number')
    .nullable(),
  useOfProceeds: string().required('Use of proceeds is required'),
  logo: string().required('Logo is required'),
  policyBuilder: object(),
  status: string(),
  documents: array<FormArrayElement<DataroomFile>>()
    .ensure()
    .required('Documents are required'),
  team: array<DsoTeamMember>()
    .of(dsoTeamMemberSchema.required('Team member details are required'))
    .ensure()
    .required('Team member is required'),
  faqs: array<DsoFAQItem>()
    .of(dsoFAQItemSchema.required('Required'))
    .required('Faqs are required'),
  videos: array<DsoVideo>()
    .of(dsoVideoLinkSchema.required('Videos are required'))
    .required('Required'),
  uniqueIdentifierCode: string().test(
    'length',
    'Unique identifier code is required',
    uniqueIdentifierCodeValidator
  )
}

export const createDSOValidationSchema = object()
  .shape<DSOFormValues>({
    network: string().required('Network is required'),
    ...dsoFormBaseValidationSchema
  })
  .notRequired()

export const editDSOValidationSchema = object()
  .shape<DSOFormValues>({
    network: string(),
    ...dsoFormBaseValidationSchema
  })
  .notRequired()

export const editLiveDSOValidationSchema = object()
  .shape<DSOFormValues>({
    ...dsoFormBaseValidationSchema,
    network: string(),
    launchDate: string().required(),
    completionDate: string().required()
  })
  .notRequired()

export const getDSOValidationSchema = (isNew: boolean, isLive: boolean) => {
  if (isNew) {
    return createDSOValidationSchema
  }

  return isLive ? editLiveDSOValidationSchema : editDSOValidationSchema
}
