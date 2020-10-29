/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOForm, DSOFormProps } from 'v2/app/components/DSO/DSOForm'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { dso } from '__fixtures__/authorizer'
import { history } from 'v2/history'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'

jest.mock('v2/app/components/DSO/components/DSOContainer', () => ({
  DSOContainer: jest.fn(() => <input />)
}))

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('DSOForm', () => {
  const props: DSOFormProps = {
    isEditing: false,
    isNew: false,
    data: dso
  }

  beforeEach(() => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOForm {...props} />)
  })

  it('renders DSOContainer with correct props', () => {
    render(<DSOForm {...props} />)

    expect(DSOContainer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'Introduction',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ title: 'Status', children: expect.anything() }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        title: 'Subscription Document',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        title: 'Offering Terms',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        title: 'Business Model',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({ title: 'Token', children: expect.anything() }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        title: 'Use of Proceeds',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        title: 'Dataroom',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      9,
      expect.objectContaining({
        title: 'Fund Raising Milestone',
        children: expect.anything()
      }),
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      10,
      expect.objectContaining({ title: 'Team', children: expect.anything() }),
      {}
    )
  })
})
