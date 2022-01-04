import {
  DSOActivity,
  DsoFAQItem,
  DSOFormValues,
  DSORequestArgs,
  DsoTeamMember,
  DsoVideo
} from 'types/dso'
import { getPersonName } from 'helpers/strings'
import { hasValue } from 'helpers/forms'
import { DataroomFile, FormArray } from 'types/dataroomFile'
import { ListingFormValues } from 'app/pages/exchange/types/listings'
import * as yup from 'yup'
import { AssetUnderManagement } from 'types/vccDashboard'

export const numberToPercentage = (value: any) => {
  if (value === null || value === undefined || value === '') {
    return undefined
  }

  return Number(value) / 100
}

export const percentageToNumber = (value?: any) => {
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

export const getFAQsFieldsPayload = (faqs: DsoFAQItem[]) => {
  return faqs?.filter(item => item.question !== '' || item.answer !== '')
}

export const getVideosFieldsPayload = (videos: DsoVideo[]) => {
  return videos?.filter(item => item.link !== '' || item.title !== '')
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
    if (key === 'faqs') {
      value = getFAQsFieldsPayload(value as DsoFAQItem[])
    }
    if (key === 'videos') {
      value = getVideosFieldsPayload(value as DsoVideo[])
    }

    return { ...acc, ...(hasValue(value) ? { [key]: value } : {}) }
  }, {}) as DSORequestArgs
}

export const getUpdateDSOPayload = (values: Partial<DSOFormValues>) => {
  const { status, ...payload } = getCreateDSOPayload(values)
  let result = payload

  if (!('videos' in result)) {
    result = {
      ...result,
      videos: []
    }
  }

  if (!('faqs' in result)) {
    result = {
      ...result,
      faqs: []
    }
  }

  return result
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

export const newDistributionValidationSchema = yup.object().shape({
  pricePerToken: yup.number().required('This is a required field'),
  dateOfDistribution: yup.string().required('This is a required field'),
  otp: yup.string().required('This is a required field')
})

export const sortAssetsByAmount = (assets?: AssetUnderManagement[]) => {
  if (assets == null || assets === undefined) {
    return assets
  }
  return [...assets].sort((first, second) => second.amount - first.amount)
}
