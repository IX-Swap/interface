import React from 'react'
import {
  DigitalSecurityOffering,
  DSOFormValues,
  DSOLaunchStatus,
  DSOBaseFormValues,
  NewBaseDigitalSecurityOffering,
  RedirectArgs,
  RedirectSaveArgs,
  RedirectOnSaveArgs
} from 'types/dso'
import { DataroomFile } from 'types/dataroomFile'
import { getIdFromObj } from 'helpers/strings'
import { calculatePercent } from 'helpers/numbers'
import isPast from 'date-fns/isPast'
import { Network, Urls } from 'types/networks'
import { sanitize } from 'dompurify'
import { generatePath } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { CreateModeRedirect } from '../FormStepper/FormStepper'

export const redirectCallback = (
  createModeRedirect: CreateModeRedirect,
  data: any,
  history: any,
  dsoId: any,
  issuerId: any
) => {
  redirect({ createModeRedirect, data, history, dsoId, issuerId })
}
export const redirectOnSave = ({
  createModeRedirect,
  nextLocation,
  data,
  setIsRedirecting,
  history
}: RedirectOnSaveArgs | any) => {
  redirectSave({
    createModeRedirect,
    nextLocation,
    data,
    dsoId: data?.data.id,
    history,
    setIsRedirecting,
    issuerId: data?.data.createdBy
  })
}

export const getCreateModeRedirect = (dsoId: string) => {
  if (dsoId !== undefined) {
    return IssuanceRoute.edit
  }

  return IssuanceRoute.create
}

export const redirect = ({
  createModeRedirect,
  dsoId,
  history,
  issuerId
}: RedirectArgs) => {
  if (createModeRedirect !== undefined && issuerId !== '' && dsoId !== '') {
    const redirect =
      typeof createModeRedirect === 'function'
        ? createModeRedirect('dso')
        : createModeRedirect

    history.replace(
      generatePath(redirect, {
        issuerId,
        dsoId
      })
    )
  }
}

export const redirectSave = ({
  createModeRedirect,
  nextLocation,
  dsoId,
  issuerId,
  history,
  setIsRedirecting,
  data
}: RedirectSaveArgs) => {
  if (
    createModeRedirect !== undefined &&
    nextLocation !== undefined &&
    issuerId !== '' &&
    dsoId !== ''
  ) {
    const redirect =
      typeof createModeRedirect === 'function'
        ? createModeRedirect(dsoId)
        : createModeRedirect
    history.replace(
      generatePath(`${redirect}${nextLocation.search}`, {
        issuerId,
        dsoId
      })
    )
    setIsRedirecting(false)
  }
}

export const transformDSOToFormValuesStep1 = (
  dso: NewBaseDigitalSecurityOffering | undefined
): DSOBaseFormValues => {
  if (dso === undefined) {
    return {
      capitalStructure: '',
      currency: '',
      tokenSymbol: '',
      tokenName: '',
      network: '',
      corporate: '',
      logo: undefined,
      issuerName: '',
      uniqueIdentifierCode: '',
      minimumInvestment: '',
      totalFundraisingAmount: '',
      pricePerUnit: '',
      equityMultiple: '',
      leverage: '',
      distributionFrequency: '',
      investmentStructure: '',
      grossIRR: '',
      interestRate: '',
      dividendYield: '',
      investmentPeriod: '',
      productSpecification: '',
      isCampaign: false,
      decimalPlaces: 18
    } as any
  }

  return {
    capitalStructure: dso.capitalStructure,
    logo: dso.logo,
    tokenName: dso.tokenName,
    tokenSymbol: dso.tokenSymbol,
    issuerName: dso.issuerName,
    corporate: dso.corporate,
    currency: getIdFromObj({ _id: dso.currency }),
    uniqueIdentifierCode: dso.uniqueIdentifierCode,
    network: dso.network,
    dividendYield: dso.dividendYield,
    grossIRR: dso.grossIRR,
    investmentStructure: dso.investmentStructure,
    equityMultiple: dso.equityMultiple,
    interestRate: dso.interestRate,
    leverage: dso.leverage,
    totalFundraisingAmount: dso.totalFundraisingAmount,
    pricePerUnit: dso.pricePerUnit,
    distributionFrequency: dso.distributionFrequency,
    investmentPeriod: dso.investmentPeriod,
    minimumInvestment: dso.minimumInvestment,
    launchDate: dso.launchDate ?? null,
    completionDate: dso.completionDate ?? null,
    isCampaign: dso.isCampaign,
    decimalPlaces: dso.decimalPlaces
  }
}

export const transformDSOToFormValues = (
  dso?: DigitalSecurityOffering | undefined
): DSOFormValues => {
  if (dso === undefined) {
    return {
      businessModel: '',
      introduction: '',
      useOfProceeds: '',
      fundraisingMilestone: '',
      team: [{}],
      faqs: [{}, {}, {}],
      videos: [{}, {}, {}],
      documents: [],
      capitalStructure: '',
      minimumInvestment: '',
      totalFundraisingAmount: '',
      pricePerUnit: '',
      currency: '',
      tokenSymbol: '',
      tokenName: '',
      network: '',
      corporate: '',
      logo: undefined,
      equityMultiple: '',
      leverage: '',
      distributionFrequency: '',
      investmentStructure: '',
      grossIRR: '',
      interestRate: '',
      dividendYield: '',
      investmentPeriod: '',
      issuerName: '',
      uniqueIdentifierCode: '',
      decimalPlaces: 18,
      step: 0,
      launchDate: '',
      completionDate: '',
      subscriptionDocument: undefined
    } as any
  }

  return {
    capitalStructure: dso.capitalStructure,
    totalFundraisingAmount: dso.totalFundraisingAmount,
    pricePerUnit: dso.pricePerUnit,
    distributionFrequency: dso.distributionFrequency,
    logo: dso.logo,
    investmentPeriod: dso.investmentPeriod,
    launchDate: dso.launchDate ?? null,
    completionDate: dso.completionDate ?? null,
    introduction: dso.introduction,
    businessModel: dso.businessModel,
    useOfProceeds: dso.useOfProceeds,
    fundraisingMilestone: dso.fundraisingMilestone,
    subscriptionDocument: dso.subscriptionDocument,
    tokenName: dso.tokenName,
    tokenSymbol: dso.tokenSymbol,
    minimumInvestment: dso.minimumInvestment,
    issuerName: dso.issuerName,
    corporate: dso.corporate?._id,
    investmentStructure: dso.investmentStructure,
    currency: getIdFromObj(dso.currency),
    network: getIdFromObj(dso.network),
    dividendYield: dso.dividendYield,
    grossIRR: dso.grossIRR,
    equityMultiple: dso.equityMultiple,
    interestRate: dso.interestRate,
    leverage: dso.leverage,
    documents: dso.documents.map(document => ({ value: document })),
    team: dso.team.map(({ _id, ...person }) => person),
    faqs: dso.faqs.map(({ _id, ...faqItem }) => faqItem),
    videos: dso.videos.map(({ _id, ...video }) => video),
    uniqueIdentifierCode: dso.uniqueIdentifierCode,
    decimalPlaces: dso.decimalPlaces,
    step: dso.step
  }
}

export const getDSOInformationFormValues = (data: any) => {
  return {
    capitalStructure: data.capitalStructure,
    logo: data.logo,
    tokenName: data.tokenName,
    tokenSymbol: data.tokenSymbol,
    issuerName: data.issuerName,
    corporate: data.corporate,
    currency: getIdFromObj({ _id: data.currency }),
    uniqueIdentifierCode: data.uniqueIdentifierCode,
    isCampaign: data.isCampaign,
    network: data.network,
    dividendYield: data.dividendYield,
    grossIRR: data.grossIRR,
    investmentStructure: data.investmentStructure,
    equityMultiple: data.equityMultiple,
    interestRate: data.interestRate,
    leverage: data.leverage,
    totalFundraisingAmount: data.totalFundraisingAmount,
    pricePerUnit: data.pricePerUnit,
    distributionFrequency: data.distributionFrequency,
    investmentPeriod: data.investmentPeriod,
    minimumInvestment: data.minimumInvestment,
    launchDate: data.launchDate ?? null,
    completionDate: data.completionDate ?? null,
    step: 1,
    decimalPlaces: data.decimalPlaces
  }
}

export const documentValueExtractor = (
  value?: DataroomFile | DataroomFile[]
) => {
  return Array.isArray(value) ? value : value?._id
}

const dsoStatusColors = {
  live: '#8995FC',
  completed: '#5cc72a',
  upcoming: '#eb9a05'
}

export const getDSOStats = (dso: DigitalSecurityOffering) => {
  const { insight, totalFundraisingAmount } = dso

  const percentRaised = calculatePercent(
    insight.raisedTotal,
    totalFundraisingAmount ?? 0
  )

  let status: DSOLaunchStatus = 'upcoming'

  if (isDSOCompleted(dso)) {
    // completionDate < today
    status = 'completed'
  } else if (isDSOLive(dso)) {
    // launchDate  < today
    status = 'live'
  }

  const color = dsoStatusColors[status]

  return { status, percentRaised, color }
}

export const renderStringToHTML = (value: string) => {
  return <div dangerouslySetInnerHTML={{ __html: sanitize(value) }} />
}

export const isDSOLive = (dso: DigitalSecurityOffering | undefined) => {
  if (dso === undefined) {
    return false
  }

  const { authorizations } = dso

  if (authorizations === undefined) {
    return false
  }

  const wasApproved = authorizations.some(({ status }) => status === 'Approved')
  const pastLaunchDate = isPast(new Date(dso.launchDate))

  return wasApproved && pastLaunchDate
}

export const isDSOCompleted = (dso: DigitalSecurityOffering | undefined) => {
  if (dso === undefined) {
    return false
  }

  const { authorizations, completionDate } = dso

  if (
    authorizations === undefined ||
    completionDate === undefined ||
    completionDate === null
  ) {
    return false
  }

  const wasApproved = authorizations.some(({ status }) => status === 'Approved')

  const pastCompletionDate = isPast(new Date(completionDate))

  return wasApproved && pastCompletionDate
}

export const getBlockchainUrl = (
  value?: string,
  network?: Network,
  type: keyof Urls = 'address'
) => {
  const url =
    network?.explorer.urls[type] ?? `https://ropsten.etherscan.io/${type}/%s`

  return url.replace(/%s/g, value ?? '')
}
