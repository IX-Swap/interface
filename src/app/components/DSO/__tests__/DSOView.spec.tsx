import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOView, DSOViewProps } from 'app/components/DSO/DSOView'
import { dso } from '__fixtures__/authorizer'
import { DSOToken } from 'app/components/DSO/components/DSOToken'

window.URL.revokeObjectURL = jest.fn()

jest.mock('app/components/DSO/components/DSOToken', () => ({
  DSOToken: jest.fn(() => null)
}))

describe('DSOView', () => {
  const props: DSOViewProps = { data: dso }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOView {...props} />)
  })

  it('renders DSOToken', () => {
    render(<DSOView {...props} />)

    expect(DSOToken).toHaveBeenCalled()
  })
})
