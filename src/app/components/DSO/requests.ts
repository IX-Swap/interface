import _ from 'lodash'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { UseCorporateUserId } from 'app/pages/identity/hooks/useCorporateUserId'

export const getDSOInformationRequestPayload = (data: any) => {
  const issuerId: any = sessionStorage.getItem('issuerId')
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { corporateData } = UseCorporateUserId({ userId })
  const dsoTermDefaults = {
    corporate: issuerId ? issuerId : corporateData?.data[0]?._id,
    investmentPeriod: data.investmentPeriod === '' ? 0 : data.investmentPeriod,
    dividendYield: data.dividendYield === '' ? 0 : data.dividendYield,
    interestRate: data.interestRate === '' ? 0 : data.interestRate,
    grossIRR: data.grossIRR === '' ? 0 : data.grossIRR,
    leverage: data.leverage === '' ? 0 : data.leverage,
    equityMultiple: data.equityMultiple === '' ? 0 : data.equityMultiple,
    distributionFrequency:
      data.distributionFrequency === ''
        ? 'Not Applicable'
        : data.distributionFrequency,
    uniqueIdentifierCode:
      data.uniqueIdentifierCode === '' ? null : data.uniqueIdentifierCode
  }
  return {
    ...data,
    ...dsoTermDefaults,
    step: 1
  }
}

export const getDSOCompanyInformationPayload = (data: any) => {
  const dsoTeamDefaults = {
    photo: undefined,
    name: '',
    position: '',
    about: '<p></p>\n'
  }
  let team = []
  if ('team' in data) {
    team = data.team.filter((val: any) => {
      return !_.isEqual(val, dsoTeamDefaults)
    })
  }

  return {
    ...data,
    step: 2,
    team
  }
}

export const getDSODocumentsPayload = (data: any) => {
  const videosDefaults = { title: '', link: '' }
  const faqsDefaults = { question: '', answer: '' }

  let videos = []
  let faqs = []

  const documents: any[] =
    data.documents !== undefined
      ? data?.documents?.map((item: any) => item.value._id)
      : []

  if ('videos' in data) {
    videos = data.videos.filter((val: any) => {
      return !_.isEqual(val, videosDefaults)
    })
  }
  if ('faqs' in data) {
    faqs = data.faqs.filter((val: any) => {
      return !_.isEqual(val, faqsDefaults)
    })
  }

  return {
    subscriptionDocument: data.subscriptionDocument?._id,
    documents,
    step: 3,
    videos,
    faqs
  }
}
