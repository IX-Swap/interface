import { DsoFAQItem, DSOFormValues, DsoTeamMember, DsoVideo } from 'types/dso'
import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { string, number, array, object } from 'yup'
import { dateSchema } from './shared'
import { pastDateValidator } from './validators'

const numberTransformer = (cv: number, ov: any) => {
  return ov === '' ? undefined : cv
}

export const dsoTeamMemberSchema = object().shape<DsoTeamMember>({
  about: string(),
  name: string().required('Required'),
  position: string().required('Required'),
  photo: string().required('Required')
})

export const dsoFAQItemSchema = object().shape<DsoFAQItem>({
  question: string().required('Required'),
  answer: string().required('Required')
})

export const dsoVideoLinkSchema = object().shape<DsoVideo>({
  title: string().required('Required'),
  link: string().required('Required')
})

export const dsoFormBaseValidationSchema = {
  businessModel: string().required('Required'),
  capitalStructure: string().required('Required'),
  corporate: string()
    .max(50, 'Maximum of 50 characters')
    .required('This field is required')
    .matches(
      /^[a-zA-Z0-9.,-;]+([a-zA-Z0-9.,-; ]+)*$/,
      'Must include only letters, numbers and this special characters . , -'
    ),
  currency: string().required('Required'),
  distributionFrequency: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Required')
  }),
  dividendYield: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number().transform(numberTransformer).required('Required')
    }),
  equityMultiple: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number().transform(numberTransformer).required('Required')
    }),
  fundraisingMilestone: string().required('Required'),
  grossIRR: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Equity',
      then: number().transform(numberTransformer).required('Required')
    }),
  interestRate: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Debt',
      then: number().transform(numberTransformer).required('Required')
    }),
  introduction: string().required('Required'),
  investmentPeriod: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: capitalStructure =>
        capitalStructure === 'Equity' || capitalStructure === 'Debt',
      then: number().transform(numberTransformer).required('Required')
    }),
  investmentStructure: string().when('capitalStructure', {
    is: capitalStructure =>
      capitalStructure === 'Equity' || capitalStructure === 'Debt',
    then: string().required('Required')
  }),
  issuerName: string().required('Required'),
  launchDate: dateSchema
    .required('Required')
    .test('pastDate', 'Launch Date must be future date', pastDateValidator),
  completionDate: dateSchema
    .required('Required')
    .test('futureDate', 'Launch Date must be future date', pastDateValidator),
  leverage: number()
    .transform(numberTransformer)
    .when('capitalStructure', {
      is: 'Debt',
      then: number().transform(numberTransformer).required('Required')
    }),
  minimumInvestment: number().nullable().required('Required'),
  pricePerUnit: number().nullable().required('Required'),
  subscriptionDocument: object<DataroomFile>(),
  tokenName: string()
    .required('Required')
    .matches(
      /(?<=\s+|^)[a-zA-Z]+(?=\s+|$)/g,
      'Token name must not have special characters'
    ),
  tokenSymbol: string().required('Required'),
  totalFundraisingAmount: number().nullable().required('Required'),
  useOfProceeds: string().required('Required'),
  logo: string().required('Required'),
  policyBuilder: object(),
  status: string(),
  documents: array<FormArrayElement<DataroomFile>>()
    .ensure()
    .required('Required'),
  team: array<DsoTeamMember>()
    .of(dsoTeamMemberSchema.required('Required'))
    .ensure()
    .required('Required'),
  faqs: array<DsoFAQItem>()
    .of(dsoFAQItemSchema.required('Required'))
    .ensure()
    .required('Required'),
  videos: array<DsoVideo>()
    .of(dsoVideoLinkSchema.required('Required'))
    .ensure()
    .required('Required'),
  uniqueIdentifierCode: string()
    .max(32)
    .test('isValidUIDCode', 'Invalid ISIN or CUSIP number', value => {
      if (
        value === undefined ||
        value?.length === 12 ||
        value?.length === 32 ||
        value?.length === 0
      ) {
        return true
      }
      return false
    })
}

export const createDSOValidationSchema = object()
  .shape<DSOFormValues>({
    network: string().required('Required'),
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
