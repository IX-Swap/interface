import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOCard,
  DSOfferingCardProps
} from 'app/components/DSO/components/DSOCard'
import { dso } from '__fixtures__/authorizer'

describe('DSOCard', () => {
  const props: DSOfferingCardProps = { dso: dso, viewURL: '/view' }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    window.URL.revokeObjectURL = jest.fn()

    render(<DSOCard {...props} />)
  })
})
