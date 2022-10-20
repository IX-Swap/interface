import { render } from 'test-utils'
import { getIdFromObj } from 'helpers/strings'
import { baseDSOFormValues, formValues } from '__fixtures__/issuance'
import { dsoFormSteps } from 'app/components/DSO/steps'
import { percentageToNumber } from 'app/pages/issuance/utils/utils'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSOBaseFormValues } from 'types/dso'

jest.mock('app/components/DSO/components/DSOInformationFields', () => ({
  DSOInformationFields: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOCompanyInformationFields', () => ({
  DSOCompanyInformationFields: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSODocumentsFields', () => ({
  DSODocumentsFields: jest.fn(() => null)
}))

describe('steps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  const formVal: any = formValues
  it('has the correct labels', () => {
    expect(dsoFormSteps[0].label).toEqual('DSO Information')
    expect(dsoFormSteps[1].label).toEqual('Company Information')
    expect(dsoFormSteps[2].label).toEqual('Documents')
  })

  it('steps have the form value getters', () => {
    // expect(dsoFormSteps[0].getFormValues(formVal as any)).toEqual({
    //   capitalStructure: formVal.capitalStructure,
    //   logo: formVal.logo,
    //   tokenName: formVal.tokenName,
    //   tokenSymbol: formVal.tokenSymbol,
    //   issuerName: formVal.issuerName,
    //   corporate: formVal.corporate,
    //   currency: getIdFromObj({ _id: formVal.currency }),
    //   uniqueIdentifierCode: formVal.uniqueIdentifierCode,
    //   network: formVal.network,
    //   dividendYield: formVal.dividendYield,
    //   grossIRR: formVal.grossIRR,
    //   investmentStructure: formVal.investmentStructure,
    //   equityMultiple: formVal.equityMultiple,
    //   interestRate: formVal.interestRate,
    //   isCampaign: formVal.isCampaign,
    //   leverage: formVal.leverage,
    //   totalFundraisingAmount: formVal.totalFundraisingAmount,
    //   pricePerUnit: formVal.pricePerUnit,
    //   distributionFrequency: formVal.distributionFrequency,
    //   investmentPeriod: formVal.investmentPeriod,
    //   minimumInvestment: formVal.minimumInvestment,
    //   launchDate: formVal.launchDate ?? null,
    //   completionDate: formVal.completionDate ?? null,
    //   step: 1,
    //   decimalPlaces: formVal.decimalPlaces
    // })
    // expect(dsoFormSteps[1].getFormValues(formValues as any)).toEqual({
    //   team: formValues.team ?? [{}],
    //   introduction: formValues.introduction,
    //   businessModel: formValues.businessModel,
    //   useOfProceeds: formValues.useOfProceeds,
    //   fundraisingMilestone: formValues.fundraisingMilestone,
    //   step: 2
    // })
    // expect(dsoFormSteps[2].getFormValues(formValues as any)).toEqual({
    //   subscriptionDocument: formValues.subscriptionDocument,
    //   documents: formValues.documents,
    //   videos: formValues.videos ?? [{}],
    //   faqs: formValues.faqs ?? [{}],
    //   step: 3
    // })
  })

  it('returns form step component', () => {
    render(dsoFormSteps[0].component())
    expect(DSOInformationFields).toHaveBeenCalled()

    render(dsoFormSteps[1].component())
    expect(DSOCompanyInformationFields).toHaveBeenCalled()

    render(dsoFormSteps[2].component())
    expect(DSODocumentsFields).toHaveBeenCalled()
  })
})
