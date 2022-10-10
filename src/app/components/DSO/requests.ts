export const getDSOInformationRequestPayload = (data: any) => {
  const dsoTermDefaults = {
    investmentPeriod: data.investmentPeriod === '' ? 0 : data.investmentPeriod,
    dividendYield: data.dividendYield === '' ? 0 : data.dividendYield,
    interestRate: data.interestRate === '' ? 0 : data.interestRate,
    grossIRR: data.grossIRR === '' ? 0 : data.grossIRR,
    leverage: data.leverage === '' ? 0 : data.leverage,
    equityMultiple: data.equityMultiple === '' ? 0 : data.equityMultiple,
    distributionFrequency:
      data.distributionFrequency === ''
        ? 'Not Applicable'
        : data.distributionFrequency
  }

  return {
    ...data,
    ...dsoTermDefaults,
    step: 1
  }
}
