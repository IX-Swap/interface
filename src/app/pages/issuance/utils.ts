import { DSOActivity, DSOFormValues, DSORequestArgs } from 'types/dso'
import omit from 'lodash/omit'
import { getPersonName } from 'helpers/strings'

export const numberToPercentage = (number: number | null | undefined) =>
  Number(number ?? 0) / 100

export const percentageToNumber = (number: number | null | undefined) =>
  Number(number ?? 0) * 100

export const transformDSOFormValuesToRequestArgs = (
  values: DSOFormValues,
  isUpdating = false
): DSORequestArgs => {
  let dso = omit(values, ['status'])

  if (isUpdating) {
    dso = omit(dso, ['tokenName', 'tokenSymbol', 'issuerName']) as any
  }

  return {
    ...dso,
    subscriptionDocument: dso.subscriptionDocument?._id,
    dividendYield: numberToPercentage(dso.dividendYield),
    grossIRR: numberToPercentage(dso.grossIRR),
    equityMultiple: numberToPercentage(dso.equityMultiple),
    interestRate: numberToPercentage(dso.interestRate),
    leverage: numberToPercentage(dso.leverage),
    documents:
      dso.documents?.map(d => d.value?._id ?? null).filter(d => d !== null) ??
      []
  }
}

export const getActivityUserInfo = (activity: DSOActivity) => {
  const {
    identity: { individual, corporates }
  } = activity
  const hasIndividual = individual !== undefined
  const hasCorporate = corporates.length > 0

  if (hasIndividual) {
    return {
      imageId: individual.photo,
      name: getPersonName(individual)
    }
  }

  if (hasCorporate) {
    return {
      imageId: corporates[0].logo,
      name: corporates[0].companyLegalName
    }
  }

  return {
    imageId: '',
    name: ''
  }
}
