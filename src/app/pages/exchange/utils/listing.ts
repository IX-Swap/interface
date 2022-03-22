import {
  numberToPercentage,
  percentageToNumber
} from 'app/pages/issuance/utils'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { DataroomFile } from 'types/dataroomFile'
import { hasValue } from 'helpers/forms'
import { Listing, ListingFormValues } from 'app/pages/exchange/types/listings'
import { initialListingFormValues } from 'app/pages/exchange/consts/listing'

export const transformDataFromDSOToListingFormValue = (
  data: DigitalSecurityOffering | undefined
): ListingFormValues => {
  if (data === undefined) {
    return initialListingFormValues
  }

  return {
    logo: data.logo,
    corporate: data.corporate?._id !== undefined ? data.corporate._id : '',
    network: data.network?._id ?? '',
    tokenName: data.tokenName,
    tokenSymbol: data.tokenSymbol,
    decimals: data.decimals,
    minimumTradeUnits: data.pricePerUnit,
    maximumTradeUnits: null,
    raisedAmount: data.totalFundraisingAmount,
    capitalStructure: data.capitalStructure,
    investmentPeriod: data.investmentPeriod ?? null,
    dividendYield: percentageToNumber(data.dividendYield),
    interestRate: percentageToNumber(data.interestRate),
    grossIRR: percentageToNumber(data.grossIRR),
    investmentStructure: data.investmentStructure ?? '',
    distributionFrequency: data.distributionFrequency,
    leverage: percentageToNumber(data.leverage),
    equityMultiple: percentageToNumber(data.equityMultiple),
    currency: '',
    team: data.team.map(({ _id, ...person }) => person),
    incomeStatement: [],
    cashFlow: [],
    balanceSheet: [],
    launchDate: data.launchDate,
    completionDate: data.completionDate ?? null,
    introduction: data.introduction,
    marketType: 'Exchange',
    asset: data.asset,
    dso: data._id
  }
}

export const transformListingToListingFormValue = (
  data: Listing | undefined
): ListingFormValues => {
  if (data === undefined) {
    return initialListingFormValues
  }

  return {
    logo: data.logo,
    corporate: data.corporate._id,
    network: data.network._id,
    tokenName: data.tokenName,
    tokenSymbol: data.tokenSymbol,
    decimals: data.decimals,
    minimumTradeUnits: data.minimumTradeUnits,
    maximumTradeUnits: data.maximumTradeUnits,
    raisedAmount: data.raisedAmount,
    capitalStructure: data.capitalStructure,
    investmentPeriod: data.investmentPeriod,
    dividendYield: percentageToNumber(data.dividendYield),
    interestRate: percentageToNumber(data.interestRate),
    grossIRR: percentageToNumber(data.grossIRR),
    investmentStructure: data.investmentStructure,
    distributionFrequency: data.distributionFrequency,
    leverage: percentageToNumber(data.leverage),
    equityMultiple: percentageToNumber(data.equityMultiple),
    currency: data.markets[0].currency,
    team: data.team.map(({ _id, ...person }) => person),
    incomeStatement: data.documents.filter(
      item => item.type === 'Income Statement'
    ) as any,
    cashFlow: data.documents.filter(item => item.type === 'Cash Flow'),
    balanceSheet: data.documents.filter(
      item => item.type === 'Balance Sheet'
    ) as any,
    launchDate: data.launchDate,
    completionDate: data.completionDate,
    introduction: data.introduction,
    marketType: 'Exchange',
    asset: data.asset,
    dso: data.dso?._id
  }
}

export const getUpdateListingPayload = (values: Partial<ListingFormValues>) => {
  const { status, ...payload } = getCreateListingPayload(values)

  return payload
}

export const getCreateListingPayload = (values: Partial<ListingFormValues>) => {
  return Object.keys(values).reduce((acc, key) => {
    let value = values[key as keyof ListingFormValues]

    if (
      key === 'incomeStatement' ||
      key === 'cashFlow' ||
      key === 'balanceSheet'
    ) {
      return {
        ...acc,
        documents: [
          ...((acc as any).documents ?? []),
          ...getDocumentsFieldPayload(value as any)
        ]
      }
    }

    if (key === 'currency') {
      return {
        ...acc,
        markets: getMarketsFieldPayload(value as any)
      }
    }

    if (
      key === 'dividendYield' ||
      key === 'grossIRR' ||
      key === 'equityMultiple' ||
      key === 'interestRate' ||
      key === 'leverage'
    ) {
      value = numberToPercentage(value as number)
    }

    if (key === 'marketType') {
      return {
        ...acc
      }
    }

    return {
      ...acc,
      ...(hasValue(value) ? { [key]: value } : {})
    }
  }, {}) as DSORequestArgs
}

export const getDocumentsFieldPayload = (documents: DataroomFile[]) => {
  return documents.map(d => d._id)
}

export const getMarketsFieldPayload = (currency: string) => {
  return [
    {
      currency: currency
    }
  ]
}
