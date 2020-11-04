/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { renderCommitmentMoney, renderCommitmentAvatar } from '../columns'
import { commitment } from '__fixtures__/authorizer'
import { Avatar } from 'v2/components/Avatar'

jest.mock('v2/components/Avatar', () => ({ Avatar: jest.fn(() => null) }))

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

  it('renders Avatar with correct props', () => {
    render(<>{renderCommitmentAvatar('', commitment)}</>)

    expect(Avatar).toHaveBeenCalledTimes(1)
    expect(Avatar).toHaveBeenCalledWith(
      {
        documentId: commitment.dso.logo,
        ownerId: commitment.dso.user,
        size: 40,
        variant: 'circle'
      },
      {}
    )
  })
})
