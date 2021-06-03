import {
  DSOActivity,
  DSOFormValues,
  DSORequestArgs,
  DsoTeamMember
} from 'types/dso'
import { getPersonName } from 'helpers/strings'
import { hasValue } from 'helpers/forms'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { ListingFormValues } from 'app/pages/exchange/types/listings'

export const numberToPercentage = (value: any) => {
  if (value === null || value === undefined || value === '') {
    return undefined
  }

  return Number(value) / 100
}

export const percentageToNumber = (value: any) => {
  if (value === null || value === undefined || value === '') {
    return undefined
  }

  return Number(value) * 100
}

export const getDocumentsFieldPayload = (
  documents: FormArray<DataroomFile>
) => {
  return documents?.map(d => d.value?._id ?? null).filter(d => d !== null) ?? []
}

export const getCreateDSOPayload = (values: Partial<DSOFormValues>) => {
  return Object.keys(values).reduce((acc, key) => {
    let value = values[key as keyof DSOFormValues]

    if (key === 'subscriptionDocument') value = (value as DataroomFile)?._id
    if (key === 'documents') {
      value = getDocumentsFieldPayload(value as FormArray<DataroomFile>)
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

    return {
      ...acc,
      ...(hasValue(value) ? { [key]: value } : {})
    }
  }, {}) as DSORequestArgs
}

export const getUpdateDSOPayload = (values: Partial<DSOFormValues>) => {
  const { status, ...payload } = getCreateDSOPayload(values)

  return payload
}

export const getIdFromDSOSelectValue = (value: string) => value.split(':')[0]
export const getIssuerIdFromDSOSelectValue = (value: string) =>
  value.split(':')[1]

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

export const validateTeamField = (
  formData: DSOFormValues | ListingFormValues
) => {
  const { team } = formData
  if (team !== undefined && team.length > 0) {
    const filteredTeam: DsoTeamMember[] = team.reduce(
      (ac: DsoTeamMember[], t) => {
        if (hasValue(t.name) && hasValue(t.photo) && hasValue(t.position))
          ac.push(t)
        return ac
      },
      []
    )

    return { ...formData, team: filteredTeam }
  }

  return formData
}
