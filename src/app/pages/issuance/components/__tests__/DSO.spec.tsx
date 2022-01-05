import React from 'react'
import { render } from 'test-utils'
import { DSO, DSOProps } from 'app/pages/issuance/components/DSO'
import { dso } from '__fixtures__/authorizer'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { DSOView } from 'app/components/DSO/DSOView'

jest.mock('app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
}))

jest.mock('app/components/DSO/DSOView', () => ({
  DSOView: jest.fn(() => null)
}))

describe('DSO', () => {
  const props: DSOProps = {
    dsoId: dso._id,
    issuerId: dso.user,
    isEditing: true,
    showAuthorizations: false,
    showSidebar: false
  }

  afterEach(async () => {
    jest.clearAllMocks()
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

  it('renders DSOForm with correct props in edit mode', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<DSO {...props} />)

    expect(DSOForm).toHaveBeenCalledWith(
      {
        data: dso
      },
      {}
    )
  })

  it('renders DSOView with correct props in view mode', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<DSO {...props} isEditing={false} />)

    expect(DSOView).toHaveBeenCalledWith(
      {
        data: dso,
        showAuthorizations: props.showAuthorizations,
        showSidebar: props.showSidebar
      },
      {}
    )
  })
})
