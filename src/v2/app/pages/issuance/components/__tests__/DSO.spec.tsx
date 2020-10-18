/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSO, DSOProps } from 'v2/app/pages/issuance/components/DSO'
import { dso } from '__fixtures__/authorizer'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'

jest.mock('v2/app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
}))

describe('DSO', () => {
  const props: DSOProps = { dsoId: dso._id }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSO {...props} />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)
    const { container } = render(<DSO {...props} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<DSO {...props} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders DSOForm with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<DSO {...props} />)

    expect(DSOForm).toHaveBeenCalledTimes(1)
    expect(DSOForm).toHaveBeenCalledWith(
      {
        isEditing: false,
        data: dso,
        onSubmit: expect.any(Function),
        submitButtonLabel: 'Save'
      },
      {}
    )
  })
})
