import React from 'react'
import { render } from 'test-utils'
import { ViewIndividual } from 'app/pages/identity/pages/ViewIndividual/ViewIndividual'

describe('ViewIndividual', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<ViewIndividual />)
    expect(container).toMatchSnapshot()
  })
})
