import { SelectionActions } from 'app/pages/authorizer/components/SelectionAction/SelectionActions'
import React from 'react'
import { render } from 'test-utils'
import { ApproveSelectionButton } from 'app/pages/authorizer/components/SelectionAction/ApproveSelectionButton'
import { RejectSelectionButton } from 'app/pages/authorizer/components/SelectionAction/RejectSelectionButton'

jest.mock(
  'app/pages/authorizer/components/SelectionAction/ApproveSelectionButton',
  () => ({
    ApproveSelectionButton: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/authorizer/components/SelectionAction/RejectSelectionButton',
  () => ({
    RejectSelectionButton: jest.fn(() => null)
  })
)

describe('SelectionActions', () => {
  beforeEach(() => {})

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct props', () => {
    const approveAction = {
      action: jest.fn(() => {}),
      disabled: false
    }

    const rejectAction = {
      action: jest.fn(() => {}),
      disabled: true
    }
    render(
      <SelectionActions
        actions={{
          approve: approveAction,
          reject: rejectAction
        }}
      />
    )

    expect(ApproveSelectionButton).toHaveBeenCalledWith(
      {
        approve: approveAction.action,
        disabled: approveAction.disabled
      },
      {}
    )

    expect(RejectSelectionButton).toHaveBeenCalledWith(
      {
        reject: rejectAction.action,
        disabled: rejectAction.disabled
      },
      {}
    )
  })
})
