/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSWithdrawalPreview,
  DSWithdrawalPreviewProps
} from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { dsWithdrawal } from '__fixtures__/authorizer'

describe('DSWithdrawalPreview', () => {
  const props: DSWithdrawalPreviewProps = { data: dsWithdrawal }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSWithdrawalPreview {...props} />)
  })
})
