import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOView, DSOViewProps } from 'app/components/DSO/DSOView'
import { dso } from '__fixtures__/authorizer'

window.URL.revokeObjectURL = jest.fn()

describe('DSOView', () => {
  const props: DSOViewProps = { data: dso }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOView {...props} />)
  })
})
