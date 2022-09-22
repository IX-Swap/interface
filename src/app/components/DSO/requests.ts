import { DSOBaseFormValues } from 'types/dso'

export const getDSOInformationRequestPayload = (data: DSOBaseFormValues) => {
  const dsoTermDefaults = {
    investmentPeriod:
      data.investmentPeriod === undefined ? 0 : data.investmentPeriod,
    dividendYield: data.dividendYield === undefined ? 0 : data.dividendYield,
    interestRate: data.interestRate === undefined ? 0 : data.interestRate,
    grossIRR: data.grossIRR === undefined ? 0 : data.grossIRR,
    leverage: data.leverage === undefined ? 0 : data.leverage,
    equityMultiple: data.equityMultiple === undefined ? 0 : data.equityMultiple
  }

  return {
    ...data,
    ...dsoTermDefaults
  }
}
