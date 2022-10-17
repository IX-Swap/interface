import _ from 'lodash'

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
  console.log('dso documents payload', data)
  let videos = []
  let faqs = []
  const documents: any[] = []
  const dataroomProperties = Object.keys(data).filter(property =>
    property.includes('dataroom_')
  )
  dataroomProperties.forEach(item => {
    const id: number = parseInt(item.slice(9))

    if (data[item] !== undefined) {
      documents[id] = data[item]
    }
  })

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
    subscriptionDocument: data.subscriptionDocument,
    documents,
    step: 3,
    videos,
    faqs
  }
}
