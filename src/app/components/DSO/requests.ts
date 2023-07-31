import _ from 'lodash'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { UseCorporateUserId } from 'app/pages/identity/hooks/useCorporateUserId'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'

export const getDSOInformationRequestPayload = (payloadData: any) => {
  const corporateId: any = sessionStorage.getItem('corporateId')
  const corporateIdIndex: any = sessionStorage.getItem('corporateIdIndex')
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { corporateData } = UseCorporateUserId({ userId })
  const { data } = useAllCorporates({ all: true, status: 'Approved' })
  let issuerName = sessionStorage?.getItem('corpoName')?.split('-')[0]
  const dsoTermDefaults = {
    issuerName: issuerName
      ? issuerName
      : corporateData?.data[0]?.companyLegalName,
    corporate: corporateId ? corporateId : corporateData?.data[0]?._id,
    investmentPeriod:
      payloadData.investmentPeriod === '' ? 0 : payloadData.investmentPeriod,
    dividendYield:
      payloadData.dividendYield === '' ? 0 : payloadData.dividendYield,
    interestRate:
      payloadData.interestRate === '' ? 0 : payloadData.interestRate,
    grossIRR: payloadData.grossIRR === '' ? 0 : payloadData.grossIRR,
    leverage: payloadData.leverage === '' ? 0 : payloadData.leverage,
    equityMultiple:
      payloadData.equityMultiple === '' ? 0 : payloadData.equityMultiple,
    distributionFrequency:
      payloadData.distributionFrequency === ''
        ? 'Not Applicable'
        : payloadData.distributionFrequency,
    uniqueIdentifierCode:
      payloadData.uniqueIdentifierCode === ''
        ? null
        : payloadData.uniqueIdentifierCode
  }

  return {
    ...payloadData,
    ...dsoTermDefaults,
    step: 1
  }
}

export const getDSOCompanyInformationPayload = (
  data: any,
  payloadOnly: boolean = false
) => {
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

  if (payloadOnly)
    return {
      team
    }

  return {
    ...data,
    step: 2,
    team
  }
}

export const getDSODocumentsPayload = (
  data: any,
  payloadOnly: boolean = false
) => {
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

  const payload = {
    subscriptionDocument: data.subscriptionDocument?._id,
    documents,
    videos,
    faqs
  }

  if (payloadOnly) return payload

  return {
    ...payload,
    step: 3
  }
}
