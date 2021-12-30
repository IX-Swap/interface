import React from 'react'
import { render } from 'test-utils'
import { DSOTitle, DsoTitleProps } from 'app/components/DSO/components/DSOTitle'
import { dso } from '__fixtures__/authorizer'

describe('DSOTitle', () => {
  const props: DsoTitleProps = { dso: dso }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    window.URL.revokeObjectURL = jest.fn()

    render(<DSOTitle {...props} />)
  })
})
