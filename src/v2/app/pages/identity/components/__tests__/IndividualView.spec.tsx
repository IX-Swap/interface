import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualView,
  IndividualViewProps
} from 'v2/app/pages/identity/components/IndividualView'
import { individual } from '__fixtures__/identity'
import { IndividualInfoView } from 'v2/app/pages/identity/components/IndividualInfoView'

jest.mock('v2/app/pages/identity/components/IndividualInfoView', () => ({
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

  it('renders IndividualInfoView with correct props', () => {
    render(<IndividualView {...props} />)

    expect(IndividualInfoView).toHaveBeenCalledWith({ data: individual }, {})
  })
})
