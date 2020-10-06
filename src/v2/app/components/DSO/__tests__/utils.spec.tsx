/**  * @jest-environment jsdom-sixteen  */
import { cleanup } from 'test-utils'

import { documentValueExtractor } from 'v2/app/components/DSO/utils'
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
