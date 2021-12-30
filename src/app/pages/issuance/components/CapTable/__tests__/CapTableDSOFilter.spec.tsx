import { CapTableDSOFilter } from 'app/pages/issuance/components/CapTable/CapTableDSOFilter'
import * as useDSOFilter from 'app/pages/issuance/hooks/useDSOFilter'
import React from 'react'
import { render } from 'test-utils'

describe('CapTableDSOFilter', () => {
  beforeEach(() => {
    const objResponse = { isLoading: false, data: { list: [] } }

    jest
      .spyOn(useDSOFilter, 'useDSOFilter')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CapTableDSOFilter />)
  })

  it('renders nul when isLoading', () => {
    const objResponse = { isLoading: true, data: { list: [] } }

    jest
      .spyOn(useDSOFilter, 'useDSOFilter')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<CapTableDSOFilter />)
    expect(container).toBeEmptyDOMElement()
  })
})
