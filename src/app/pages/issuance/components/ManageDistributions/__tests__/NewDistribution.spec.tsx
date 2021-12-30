import { fireEvent } from '@testing-library/react'
import { NewDistribution } from 'app/pages/issuance/components/ManageDistributions/NewDistribution'
import React from 'react'
import { render } from 'test-utils'

describe('NewDistribution', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NewDistribution />)
  })

  it('renders from when New Distribution button is clicked', () => {
    const { getByRole } = render(<NewDistribution />)
    const newDistributionButton = getByRole('button') as HTMLButtonElement

    fireEvent.click(newDistributionButton, {
      cancellable: true,
      bubbles: true
    })
    expect(/create new distribution/i).toBeTruthy()
  })
})
