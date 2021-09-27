import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useSelectionHelperContext from 'components/SelectionHelper'
import { commitment } from '__fixtures__/authorizer'
import { RejectSelectionButton } from 'app/pages/authorizer/components/SelectionAction/RejectSelectionButton'
import { RejectButton } from 'app/pages/authorizer/components/RejectButton'

jest.mock('app/pages/authorizer/components/RejectButton', () => ({
  RejectButton: jest.fn(() => null)
}))

describe('ApproveSelectionButton', () => {
  const rejectAction = jest.fn(() => {})

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
    render(<RejectSelectionButton reject={rejectAction} disabled={false} />)
  })

  it('renders ApproveButton with correct props', () => {
    render(<RejectSelectionButton reject={rejectAction} disabled={false} />)

    expect(RejectButton).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: false }),
      {}
    )
  })
})
