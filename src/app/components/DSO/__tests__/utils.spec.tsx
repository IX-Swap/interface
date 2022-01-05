import React from 'react'
import { render } from 'test-utils'
import {
  documentValueExtractor,
  transformDSOToFormValues,
  renderStringToHTML
} from 'app/components/DSO/utils'
import { document } from '__fixtures__/identity'

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
      logo: null,
      equityMultiple: '',
      leverage: '',
      distributionFrequency: '',
      investmentStructure: '',
      grossIRR: '',
      interestRate: '',
      dividendYield: '',
      investmentPeriod: '',
      issuerName: '',
      uniqueIdentifierCode: ''
    })
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
