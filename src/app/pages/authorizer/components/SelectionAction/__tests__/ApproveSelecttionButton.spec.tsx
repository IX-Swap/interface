import { ApproveSelectionButton } from 'app/pages/authorizer/components/SelectionAction/ApproveSelectionButton'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import * as useSelectionHelperContext from 'components/SelectionHelper'
import { commitment } from '__fixtures__/authorizer'

jest.mock('app/pages/authorizer/components/ApproveButton', () => ({
  ApproveButton: jest.fn(() => null)
}))

describe('ApproveSelectionButton', () => {
  const approveAction = jest.fn(() => {})

  beforeEach(() => {
    const objResponse = { hasSelected: true, selected: [commitment] }

    jest
      .spyOn(useSelectionHelperContext, 'useSelectionHelperContext')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ApproveSelectionButton approve={approveAction} disabled={false} />)
  })

  it('renders ApproveButton with correct props', () => {
    render(<ApproveSelectionButton approve={approveAction} disabled={false} />)

    expect(ApproveButton).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: false }),
      {}
    )
  })
})
