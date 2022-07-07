import { SelectionIdentityCard } from 'app/pages/identity/components/SelectionIdentityCard/SelectionIdentityCard'
import React from 'react'
import { render } from 'test-utils'

describe('SelectionIdentityCard', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Shows title and description', () => {
    const { getByText } = render(
      <SelectionIdentityCard
        title='Jest Test'
        description='testing component'
      />
    )
    expect(getByText(/testing component/i)).toBeTruthy()
    expect(getByText(/Jest Test/i)).toBeTruthy()
  })
})
