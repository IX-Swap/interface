import { getPersonName } from 'helpers/strings'
import { getCorporateLegalName } from 'helpers/tables'
import { activity, faqItem, videoLink } from '__fixtures__/issuance'
import {
  fakeAssetsUnderManagement,
  sortedFakeAssetsUnderManagement
} from '__fixtures__/vccDashboard'
import {
  getActivityUserInfo,
  getCreateDSOPayload,
  getFAQsFieldsPayload,
  getUpdateDSOPayload,
  getVideosFieldsPayload,
  numberToPercentage,
  percentageToNumber,
  sortAssetsByAmount
} from '../utils'

describe('getActivityUserInfo', () => {
  it('returns photo and name of the person if individual identity is present', () => {
    expect(getActivityUserInfo(activity)).toEqual({
      imageId: activity.identity.individual.photo,
      name: getPersonName(activity.identity.individual)
    })
  })

  it('returns company logo and company name of the first corporate identity if corporate identity is present', () => {
    expect(
      getActivityUserInfo({
        ...activity,
        identity: {
          ...activity.identity,
          individual: undefined as any
        }
      })
    ).toEqual({
      imageId: activity.identity.corporates[0].logo,
      name: getCorporateLegalName(activity.identity.corporates[0])
    })
  })

  it('returns imageId and name as empty strings if nor individual nor corporate identity is present', () => {
    expect(
      getActivityUserInfo({
        ...activity,
        identity: {
          individual: undefined as any,
          corporates: []
        }
      })
    ).toEqual({
      imageId: '',
      name: ''
    })
  })
})

describe('getFAQsFieldsPayload', () => {
  it('returns only not empty faqs items', () => {
    expect(
      getFAQsFieldsPayload([
        faqItem,
        { question: '', answer: '' },
        { question: '', answer: '1' }
      ])
    ).toEqual([faqItem, { question: '', answer: '1' }])
  })
})

describe('getVideosFieldsPayload', () => {
  it('returns only not empty videos items', () => {
    expect(
      getVideosFieldsPayload([
        videoLink,
        { title: '', link: '' },
        { title: '', link: 'url' }
      ])
    ).toEqual([videoLink, { title: '', link: 'url' }])
  })
})

describe('percentageToNumber', () => {
  it('returns undefined when value is null', () => {
    expect(percentageToNumber(null)).toEqual(undefined)
  })

  it('returns undefined when value is undefined', () => {
    expect(percentageToNumber(undefined)).toEqual(undefined)
  })

  it('returns undefined when value is empty string', () => {
    expect(percentageToNumber('')).toEqual(undefined)
  })

  it('returns correct result when value is number', () => {
    expect(percentageToNumber(2)).toEqual(200)
  })

  it('returns correct result when value is string', () => {
    expect(percentageToNumber('2')).toEqual(200)
  })
})

describe('getCreateDSOPayload', () => {
  it('returns correct result for subscriptionDocument', () => {
    expect(
      getCreateDSOPayload({
        subscriptionDocument: { _id: '2' }
      } as any)
    ).toEqual({ subscriptionDocument: '2' })
  })

  it('returns correct result for documents', () => {
    expect(
      getCreateDSOPayload({
        documents: [{ value: { _id: '2' } } as any, {}]
      } as any)
    ).toEqual({ documents: ['2'] })
  })

  it('returns correct result for dividendYield, grossIRR, equityMultiple, interestRate, leverage', () => {
    const testPayload = {
      dividendYield: 2,
      grossIRR: 3,
      equityMultiple: 4,
      interestRate: 5,
      leverage: 6
    }
    const result = {
      dividendYield: numberToPercentage(testPayload.dividendYield),
      grossIRR: numberToPercentage(testPayload.grossIRR),
      equityMultiple: numberToPercentage(testPayload.equityMultiple),
      interestRate: numberToPercentage(testPayload.interestRate),
      leverage: numberToPercentage(testPayload.leverage)
    }

    expect(getCreateDSOPayload(testPayload as any)).toEqual(result)
  })

  it('returns correct result for faqs', () => {
    const testPayload = [faqItem, { question: '', answer: '' }]
    expect(
      getCreateDSOPayload({
        faqs: testPayload
      } as any)
    ).toEqual({ faqs: getFAQsFieldsPayload(testPayload) })
  })

  it('returns correct result for videos', () => {
    const testPayload = [videoLink, { title: '', link: '' }]
    expect(
      getCreateDSOPayload({
        videos: testPayload
      } as any)
    ).toEqual({ videos: getVideosFieldsPayload(testPayload) })
  })
})

describe('getUpdateDSOPayload', () => {
  it('returns payload with videos and faqs fields', () => {
    console.log(getUpdateDSOPayload({}))
    expect(getUpdateDSOPayload({})).toEqual({ faqs: [], videos: [] })
  })
})

describe('sortAssetsByAmount', () => {
  it('Sorts Assets under management by decreasing amount', () => {
    expect(sortAssetsByAmount(fakeAssetsUnderManagement)).toEqual(
      sortedFakeAssetsUnderManagement
    )
  })
})
