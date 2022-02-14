import React from 'react'
import { render } from 'test-utils'
import {
  renderCommitmentMoney,
  renderCommitmentAvatar
} from 'helpers/rendering'
import { commitment } from '__fixtures__/authorizer'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'

jest.mock('app/components/DSO/components/DSOLogo', () => ({
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
    jest.clearAllMocks()
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
