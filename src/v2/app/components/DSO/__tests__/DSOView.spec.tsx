/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOView, _DSOView_Props } from 'v2/app/components/DSO/DSOView'
import { DSOToken } from 'v2/app/components/DSO/components/DSOToken'
import { dso } from '__fixtures__/authorizer'

jest.mock('v2/app/components/DSO/components/DSOToken', () => ({
  DSOToken: jest.fn(() => null)
}))

describe('DSOView', () => {
  const props: _DSOView_Props = { data: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  window.URL.revokeObjectURL = jest.fn()
  it('renders without error', () => {
    render(<DSOView {...props} />)
  })

  it('renders DSOToken with correct props', () => {
    render(<DSOView {...props} />)

    expect(DSOToken).toHaveBeenCalled()
  })
})
