import {
  DeploymentInfoFormValues,
  DSOFormValues,
  DsoTeamMember
} from 'v2/types/dso'
import { DataroomFile, FormArrayElement } from 'v2/types/dataroomFile'
import { string, number, array, object } from 'yup'

export const deploymentInfoValidationSchema = object().shape<
  DeploymentInfoFormValues
>({
  controller: string().required('Required'),
  decimals: number().required('Required'),
  documentController: string().required('Required'),
  name: string().required('Required'),
  owner: string().required('Required'),
  storageEngine: string().required('Required'),
  policyBuilder: string().required('Required'),
  symbol: string().required('Required'),
  token: string().required('Required'),
  transactionHash: string().required('Required')
})

export const dsoFormValidationSchema = object()
  .shape<DSOFormValues>({
    businessModel: string().required('Required'),
    capitalStructure: string().required(),
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
    launchDate: string().required('Required'),
    leverage: number(),
    minimumInvestment: number().nullable().required('Required'),
    pricePerUnit: number().nullable().required('Required'),
    subscriptionDocument: object<DataroomFile>()
      .nullable()
      .required('Required'),
    tokenName: string().required('Required'),
    tokenSymbol: string().required('Required'),
    totalFundraisingAmount: number().nullable().required('Required'),
    useOfProceeds: string().required('Required'),
    logo: string().required('Required'),
    policyBuilder: object(),
    status: string(),
    documents: array<FormArrayElement<DataroomFile>>().required('Required'),
    team: array<DsoTeamMember>().required('Required')
  })
  .notRequired()
