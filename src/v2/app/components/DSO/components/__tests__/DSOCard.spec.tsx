/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOCard,
  DSOfferingCardProps
} from 'v2/app/components/DSO/components/DSOCard'
import { dso } from '__fixtures__/authorizer'

describe('DSOCard', () => {
  const props: DSOfferingCardProps = { dso: dso, viewURL: '/view' }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOCard {...props} />)
  })
})
