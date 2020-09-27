import {
  DeploymentInfoFormValues,
  DSOFormValues,
  DsoTeamMember
} from 'v2/types/dso'
import { DocumentWithGuide } from 'v2/types/document'
import { string, number, array, object } from 'yup'

export const deploymentInfoValidationSchema = object().shape<
  DeploymentInfoFormValues
>({
  controller: string().required(),
  decimals: number().required(),
  documentController: string().required(),
  name: string().required(),
  owner: string().required(),
  storageEngine: string().required(),
  policyBuilder: string().required(),
  symbol: string().required(),
  token: string().required(),
  transactionHash: string().required()
})

export const dsoFormValidationSchema = object()
  .shape<DSOFormValues>({
    businessModel: string().required(),
    capitalStructure: string().required(),
    corporate: string().required(),
    currency: string().required(),
    distributionFrequency: string().required(),
    dividendYield: number().nullable().required(),
    equityMultiple: string().required(),
    fundraisingMilestone: string().required(),
    grossIRR: number().nullable().required(),
    interestRate: number().nullable().required(),
    introduction: string().required(),
    investmentPeriod: number().nullable().required(),
    investmentStructure: string().required(),
    issuerName: string().required(),
    launchDate: string().required(),
    leverage: string().required(),
    minimumInvestment: number().nullable().required(),
    pricePerUnit: number().nullable().required(),
    subscriptionDocument: string().required(),
    tokenName: string().required(),
    tokenSymbol: string().required(),
    totalFundraisingAmount: number().nullable().required(),
    useOfProceeds: string().required(),
    logo: string().required(),
    policyBuilder: object(),
    status: string(),
    documents: array<DocumentWithGuide>().required(),
    team: array<DsoTeamMember>().required()
  })
  .notRequired()
