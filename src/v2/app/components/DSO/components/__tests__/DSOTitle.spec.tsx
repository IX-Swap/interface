import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOTitle,
  DsoTitleProps
} from 'v2/app/components/DSO/components/DSOTitle'
import { dso } from '__fixtures__/authorizer'

describe('DSOTitle', () => {
  const props: DsoTitleProps = { dso: dso }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    window.URL.revokeObjectURL = jest.fn()

    render(<DSOTitle {...props} />)
  })
})
