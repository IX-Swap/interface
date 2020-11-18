import React from 'react'
import { render, cleanup } from 'test-utils'
import { renderCommitmentMoney, renderCommitmentAvatar } from '../columns'
import { commitment } from '__fixtures__/authorizer'
import { DSOLogo } from 'v2/app/components/DSO/components/DSOLogo'

jest.mock('v2/app/components/DSO/components/DSOLogo', () => ({
  DSOLogo: jest.fn(() => null)
}))

describe('renderCommitmentMoney', () => {
  it('returns formatted amount', () => {
    expect(renderCommitmentMoney(123, commitment)).toEqual(
      `${commitment.currency.numberFormat.currency} 123.00`
    )
  })
  it('defaults amount to empty string', () => {
    expect(renderCommitmentMoney(undefined as any, commitment)).toEqual('')
    expect(renderCommitmentMoney(null as any, commitment)).toEqual('')
  })
})

describe('renderCommitmentAvatar', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<>{renderCommitmentAvatar('', commitment)}</>)
  })

  it('renders DSOLogo with correct props', () => {
    render(<>{renderCommitmentAvatar('', commitment)}</>)

    expect(DSOLogo).toHaveBeenCalledWith(
      {
        dsoId: commitment.dso._id,
        size: 40
      },
      {}
    )
  })
})
