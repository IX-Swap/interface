import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'v2/types/dso'
import { DataroomFile } from 'v2/types/dataroomFile'
import { percentageToNumber } from 'v2/app/pages/issuance/utils'
import { getIdFromObj } from 'v2/helpers/strings'

export const transformDSOToFormValues = (
  dso: DigitalSecurityOffering | undefined
): DSOFormValues => {
  if (dso === undefined) {
    return {
      businessModel: '',
      introduction: '',
      useOfProceeds: '',
      fundraisingMilestone: '',
      team: [],
      documents: []
    } as any
  }

  return {
    ...dso,
    corporate: dso.corporate._id,
    currency: getIdFromObj(dso.currency),
    dividendYield: percentageToNumber(dso.dividendYield),
    grossIRR: percentageToNumber(dso.grossIRR),
    equityMultiple: percentageToNumber(dso.equityMultiple),
    interestRate: percentageToNumber(dso.interestRate),
    leverage: percentageToNumber(dso.leverage),
    documents:
      dso.documents?.map(document => ({
        title: '',
        label: '',
        type: '',
        document
      })) ?? null
  }
}

export const documentValueExtractor = (value?: DataroomFile) => {
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
