/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOForm, DSOFormProps } from 'v2/app/components/DSO/DSOForm'
import { DSOBaseFields } from 'v2/app/components/DSO/components/DSOBaseFields'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { DSOStatusFields } from 'v2/app/components/DSO/components/DSOStatusFields'
import { dso } from '__fixtures__/authorizer'
import { history } from 'v2/history'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'

jest.mock('v2/app/components/DSO/components/DSOStatusFields', () => ({
  DSOStatusFields: jest.fn(() => null)
}))
jest.mock('v2/app/components/DSO/components/DSOContainer', () => ({
  DSOContainer: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/components/DSO/components/DSOBaseFields', () => ({
  DSOBaseFields: jest.fn(() => null)
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

  it('renders submit button if isEditing is true', () => {
    const { getByText } = render(<DSOForm {...props} isEditing />)
    const submitButton = getByText(/submit/i)

    expect(submitButton).toBeTruthy()
  })

  it('renders DSOBaseFields with correct props', () => {
    render(<DSOForm {...props} />)

    expect(DSOBaseFields).toHaveBeenCalledTimes(1)
    expect(DSOBaseFields).toHaveBeenCalledWith(
      {
        isEditing: props.isEditing,
        dsoOwnerId: props.data?.user
      },
      {}
    )
  })

  it('renders DSOBaseFields with correct default values if isEditing is not defined', () => {
    render(<DSOForm {...props} isEditing={undefined} />)

    expect(DSOBaseFields).toHaveBeenCalledTimes(1)
    expect(DSOBaseFields).toHaveBeenCalledWith(
      {
        isEditing: false,
        dsoOwnerId: props.data?.user
      },
      {}
    )
  })

  it('renders DSOStatusFields with correct props', () => {
    render(<DSOForm {...props} />)

    expect(DSOStatusFields).toHaveBeenCalledTimes(1)
    expect(DSOStatusFields).toHaveBeenCalledWith(
      {
        isEditing: props.isEditing,
        isNew: props.isNew,
        dsoOwnerId: props.data?.user
      },
      {}
    )
  })

  it('renders DSOStatusFields with correct props if data is undefined', () => {
    render(<DSOForm {...props} data={undefined} />)

    expect(DSOStatusFields).toHaveBeenCalledTimes(1)
    expect(DSOStatusFields).toHaveBeenCalledWith(
      {
        isEditing: props.isEditing,
        isNew: props.isNew,
        dsoOwnerId: ''
      },
      {}
    )
  })

  it('renders DSOStatusFields with correct default values if isNew is undefined', () => {
    render(<DSOForm {...props} isNew={undefined} />)

    expect(DSOStatusFields).toHaveBeenCalledTimes(1)
    expect(DSOStatusFields).toHaveBeenCalledWith(
      {
        isEditing: props.isEditing,
        isNew: false,
        dsoOwnerId: props.data?.user
      },
      {}
    )
  })

  it('renders DSOContainer with correct props', () => {
    render(<DSOForm {...props} />)

    expect(DSOContainer).toHaveBeenCalledTimes(10)
    expect(DSOContainer).toHaveBeenNthCalledWith(
      1,
      { title: 'Introduction', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      2,
      { title: 'Status', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      3,
      { title: 'Subscription & Documents', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      4,
      { title: 'Offering Terms', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      5,
      { title: 'Business Model', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      6,
      { title: 'Token', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      7,
      { title: 'Use of Proceeds', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      8,
      { title: 'Dataroom', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      9,
      { title: 'Fund Raising Milestone', children: expect.anything() },
      {}
    )
    expect(DSOContainer).toHaveBeenNthCalledWith(
      10,
      { title: 'Team', children: expect.anything() },
      {}
    )
  })
})
