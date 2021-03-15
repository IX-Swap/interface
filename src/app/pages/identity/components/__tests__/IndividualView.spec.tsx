import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualView,
  IndividualViewProps
} from 'app/pages/identity/components/IndividualView'
import { individual } from '__fixtures__/identity'

jest.mock('app/pages/identity/components/IndividualInfoView', () => ({
  IndividualInfoView: jest.fn(() => null)
}))

describe('IndividualView', () => {
  const props: IndividualViewProps = { data: individual }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualView {...props} />)
  })
})
