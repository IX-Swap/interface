import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { DsoFAQItem, DSOFormValues, DsoTeamMember, DsoVideo } from 'types/dso'
import { array, number, object, string } from 'yup'
import { dateSchema } from './shared'
import {
  isBeforeDate,
  pastDateValidator,
  uniqueIdentifierCodeValidator
} from './validators'

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
      then: string().required(
        'Video Link is required when Video Title is provided'
      )
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
      /^[a-zA-Z0-9.,-;]+([a-zA-Z0-9.,-; ]+)*$/,
      'Corporate must include only letters, numbers and this special characters . , -'
    ),
  currency: string().required('Currency is required'),
  distributionFrequency: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Distribution Frequency is required')
  }),
  dividendYield: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number()
        .transform(numberTransformer)
        .required('Dividend Yield is required')
    }),
  equityMultiple: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number()
        .transform(numberTransformer)
        .required('Equity Multiple is required')
    }),
  fundraisingMilestone: string().required('Fundraising Milestone is required'),
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
        .required('Interest Rate is required')
    }),
  introduction: string().required('Introduction is required'),
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
  issuerName: string().required('Issuer Name is required'),
  launchDate: dateSchema
    .required('Launch Date is is required')
    .test(
      'before-completionDate',
      'Launch date cannot be later than completion date',
      function (launch) {
        const { completionDate } = this.parent
        return isBeforeDate(launch, completionDate)
      }
    )
    .test('pastDate', 'Launch Date must be future date', pastDateValidator),
  completionDate: dateSchema
    .required('Completion Date is required')
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
    .typeError('Minimum Investment must be a number')
    .nullable()
    .required('Minimum Investment is required'),
  pricePerUnit: number()
    .typeError('Unit Price must be a number')
    .nullable()
    .required('Unit Price is required'),
  subscriptionDocument: object<DataroomFile>(),
  tokenName: string()
    .required('Token Name is required')
    .matches(/^[a-zA-Z\s]*$/g, 'Token Name must not have special characters'),
  tokenSymbol: string().required('Token Symbol is required'),
  totalFundraisingAmount: number()
    .required('Total Fundraising Amount is required')
    .typeError('Total Fundraising Amount must be a number')
    .nullable(),
  useOfProceeds: string().required('Use of Proceeds is required'),
  logo: string().required('Logo is required'),
  policyBuilder: object(),
  status: string(),
  documents: array<FormArrayElement<DataroomFile>>()
    .ensure()
    .required('Documents are required'),
  team: array<DsoTeamMember>()
    .of(dsoTeamMemberSchema.required('Team Member Details are required'))
    .ensure()
    .required('Team Member is required'),
  faqs: array<DsoFAQItem>()
    .of(dsoFAQItemSchema.required('Required'))
    .required('FAQs are required'),
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
