/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  documentValueExtractor,
  transformDSOToFormValues,
  renderStringToHTML
} from 'v2/app/components/DSO/utils'
import { document } from '__fixtures__/identity'

describe('documentValueExtractor', () => {
  afterEach(async () => {
    await cleanup()
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
      team: [],
      documents: []
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
