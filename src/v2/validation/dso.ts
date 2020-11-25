import { DSOFormValues, DsoTeamMember } from 'v2/types/dso'
import { DataroomFile, FormArrayElement } from 'v2/types/dataroomFile'
import { string, number, array, object } from 'yup'
import { dateSchema } from './shared'

export const dsoTeamMemberSchema = object().shape<DsoTeamMember>({
  about: string(),
  name: string().required('Required'),
  position: string().required('Required'),
  photo: string().required('Required')
})

export const dsoFormBaseValidationSchema = {
  businessModel: string().required('Required'),
  capitalStructure: string().required('Required'),
  corporate: string().required('Required'),
  currency: string().required('Required'),
  distributionFrequency: string(),
  dividendYield: number(),
  equityMultiple: number(),
  fundraisingMilestone: string().required('Required'),
  grossIRR: number(),
  interestRate: number(),
  introduction: string().required('Required'),
  investmentPeriod: number(),
  investmentStructure: string(),
  issuerName: string().required('Required'),
  launchDate: dateSchema.required('Required'),
  leverage: number(),
  minimumInvestment: number().nullable().required('Required'),
  pricePerUnit: number().nullable().required('Required'),
  subscriptionDocument: object<DataroomFile>().nullable().required('Required'),
  tokenName: string().required('Required'),
  tokenSymbol: string().required('Required'),
  totalFundraisingAmount: number().nullable().required('Required'),
  useOfProceeds: string().required('Required'),
  logo: string().required('Required'),
  policyBuilder: object(),
  status: string(),
  documents: array<FormArrayElement<DataroomFile>>().required('Required'),
  team: array<DsoTeamMember>()
    .of(dsoTeamMemberSchema.required('Required'))
    .required('Required')
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
