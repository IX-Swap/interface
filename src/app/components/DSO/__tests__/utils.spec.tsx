import React from 'react'
import { render } from 'test-utils'
import {
  documentValueExtractor,
  transformDSOToFormValues,
  renderStringToHTML,
  isDSOLive,
  isDSOCompleted
} from 'app/components/DSO/utils'
import { document } from '__fixtures__/identity'
import { dso } from '__fixtures__/issuance'

describe('documentValueExtractor', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns id of the document if document is defined', () => {
    expect(documentValueExtractor(document)).toBe(document._id)
  })

  it('returns undefined if document is not defined', () => {
    expect(documentValueExtractor()).toBe(undefined)
  })
})

describe('transformDSOToFormValues', () => {
  it('returns empty form values if dso is undefined', () => {
    expect(transformDSOToFormValues(undefined)).toEqual({
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
    })
  })
})

describe('isDSOLive when dso is undefined', () => {
  it('isDSOLive returns false when dso is undefined', () => {
    expect(isDSOLive(undefined)).toBe(false)
  })
})
describe('isDSOCompleted  when dso is undefined', () => {
  it('isDSOCompleted returns false when dso is undefined', () => {
    expect(isDSOCompleted(undefined)).toBe(false)
  })
})

describe('isDSOLive when dso has data', () => {
  it('isDSOLive returns false when dso status is Approved but is not past launch date', () => {
    expect(dso).toHaveProperty('authorizations', [])
    expect(isDSOLive(dso)).toBe(false)
  })
})

describe('renderStringToHTML', () => {
  it('renders string as html', () => {
    const { getByTestId } = render(
      <>{renderStringToHTML('<div data-testid="test"/>')}</>
    )
    expect(getByTestId('test')).toBeTruthy()
  })
})
