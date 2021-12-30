import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { videoLink } from '__fixtures__/issuance'
import { DSOVideoLinks } from 'app/components/DSO/components/DSOVideoLinks'
import { DSOVideoItem } from 'app/components/DSO/components/DSOVideoItem'

jest.mock('app/components/DSO/components/DSOChapterAddButton', () => ({
  DSOChapterAddButton: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOVideoItem', () => ({
  DSOVideoItem: jest.fn(() => null)
}))

describe('DSOVideoLinks', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form defaultValues={{ videos: [] }}>
        <DSOVideoLinks />
      </Form>
    )
  })

  it('renders DSOTeamAddButton', () => {
    render(
      <Form defaultValues={{ videos: [] }}>
        <DSOVideoLinks />
      </Form>
    )

    expect(DSOChapterAddButton).toHaveBeenCalled()
  })

  it('calls DSOVideoItem for each element in the array', () => {
    render(
      <Form defaultValues={{ videos: [videoLink, videoLink, videoLink] }}>
        <DSOVideoLinks />
      </Form>
    )

    expect(DSOVideoItem).toBeCalledTimes(3)
  })

  it('does not call DSOVideoItem if array is empty', () => {
    render(
      <Form defaultValues={{ videos: [] }}>
        <DSOVideoLinks />
      </Form>
    )

    expect(DSOVideoItem).toBeCalledTimes(0)
  })
})
