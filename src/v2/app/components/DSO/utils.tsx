import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'v2/types/dso'
import { Document } from 'v2/types/document'

export const transformDSOToFormValues = (
  dso: DigitalSecurityOffering | undefined
): DSOFormValues => {
  if (dso === undefined) {
    return {
      businessModel: '',
      introduction: '',
      useOfProceeds: '',
      fundraisingMilestone: '',
      team: undefined,
      documents: undefined
    } as any
  }

  return {
    ...dso,
    currency: dso.currency?._id ?? '',
    documents:
      dso.documents?.map(document => ({
        title: '',
        label: '',
        type: '',
        document
      })) ?? null
  }
}

export const documentValueExtractor = (value?: Document) => {
  return value?._id
}

export const moneyNumberFormat = {
  decimalScale: 2,
  inputMode: 'numeric' as const,
  thousandSeparator: true,
  allowEmptyFormatting: true,
  isNumericString: true
}

export const renderStringToHTML = (value: string) => (
  <div dangerouslySetInnerHTML={{ __html: value }} />
)
