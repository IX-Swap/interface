/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOView, DSOViewProps } from 'v2/app/components/DSO/DSOView'
import { dso } from '__fixtures__/authorizer'

describe('DSOView', () => {
  const props: DSOViewProps = { data: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  window.URL.revokeObjectURL = jest.fn()
  it('renders without error', () => {
    render(<DSOView {...props} />)
  })
})
