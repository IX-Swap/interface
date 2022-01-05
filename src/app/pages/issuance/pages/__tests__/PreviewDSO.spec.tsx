import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PreviewDSO } from 'app/pages/issuance/pages/PreviewDSO'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'

jest.mock('app/components/DSO/DSOPreview/DSOPreview', () => ({
  DSOPreview: jest.fn(() => null)
}))

jest
  .spyOn(useDSOByIdHook, 'useDSOById')
  .mockReturnValue({ isLoading: false, data: dso } as any)

describe('PreviewDSO', () => {
  beforeEach(() => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('renders DSOPreview with correct props', () => {
    render(<PreviewDSO />)

    expect(DSOPreview).toHaveBeenCalledWith(
      { data: dso, showAuthorizations: true },
      {}
    )
  })

  it('renders nothing if it is loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)

    const { container } = render(<PreviewDSO />)

    expect(container).toBeEmptyDOMElement()
  })
})
