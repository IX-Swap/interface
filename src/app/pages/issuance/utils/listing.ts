import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { DataroomFile } from 'types/dataroomFile'
import { hasValue } from 'helpers/forms'
import {
  Listing,
  ListingFormValues,
  SecondaryListingFormValues
} from 'app/pages/issuance/types/listings'
import { initialListingFormValues } from 'app/pages/issuance/consts/listing'

export const transformDataFromDSOToListingFormValue = (
  data: DigitalSecurityOffering | undefined
): SecondaryListingFormValues => {
  if (data === undefined) {
    return initialListingFormValues
  }

  return {
    corporate: data.corporate?._id !== undefined ? data.corporate._id : '',
    network: data.network?._id ?? '',
    tokenName: data.tokenName,
    tokenSymbol: data.tokenSymbol,
    decimals: data.decimals ?? data.decimalPlaces,
    capitalStructure: data.capitalStructure,
    currency: '',
    launchDate: data.launchDate,
    dso: data._id,
    documents: data?.documents?.map(document => ({ value: document }))
  }
}

export const transformListingToListingFormValue = (
  data: Listing | undefined
): SecondaryListingFormValues => {
  if (data === undefined) {
    return initialListingFormValues
  }

  return {
    corporate: data.corporate?._id,
    network: data.network?._id,
    tokenName: data.tokenName,
    tokenSymbol: data.tokenSymbol,
    decimals: data.decimals,
    capitalStructure: data.capitalStructure,
    currency: data.markets[0]?.currency,
    launchDate: data.launchDate,
    dso: data.dso?._id,
    documents: data?.documents?.map(document => ({ value: document }))
  }
}

export const getUpdateListingPayload = (values: Partial<ListingFormValues>) => {
  const { status, ...payload } = getCreateListingPayload(values)

  return payload
}

export const getCreateListingPayload = (values: Partial<ListingFormValues>) => {
  return Object.keys(values).reduce((acc, key) => {
    const value = values[key as keyof ListingFormValues]

    if (key === 'currency') {
      return {
        ...acc,
        markets: getMarketsFieldPayload(value as any)
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
