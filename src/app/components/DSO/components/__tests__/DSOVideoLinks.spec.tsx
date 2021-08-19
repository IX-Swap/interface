import React from 'react'
import { render, cleanup } from 'test-utils'
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ videoLinks: [] }}>
        <DSOVideoLinks />
      </Form>
    )
  })

  it('renders DSOTeamAddButton', () => {
    render(
      <Form defaultValues={{ faq: [] }}>
        <DSOVideoLinks />
      </Form>
    )

    expect(DSOChapterAddButton).toHaveBeenCalled()
  })

  it('calls DSOVideoItem for each element in the array', () => {
    render(
      <Form defaultValues={{ videoLinks: [videoLink, videoLink, videoLink] }}>
        <DSOVideoLinks />
      </Form>
    )

    expect(DSOVideoItem).toBeCalledTimes(3)
  })

  it('does not call DSOVideoItem if array is empty', () => {
    render(
      <Form defaultValues={{ faq: [] }}>
        <DSOVideoLinks />
      </Form>
    )

    expect(DSOVideoItem).toBeCalledTimes(0)
  })
})
