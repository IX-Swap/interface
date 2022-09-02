import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { videoLink } from '__fixtures__/issuance'
import { DSOVideoItem } from 'app/components/DSO/components/DSOVideoItem'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { TextInput } from 'ui/TextInput/TextInput'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('app/components/DSO/components/DSOTeamRemoveButton', () => ({
  DSOTeamRemoveButton: jest.fn(() => null)
}))

describe('DSOVideoItem', () => {
  const removeFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders inputs with correct props ', () => {
    render(
      <Form>
        <DSOVideoItem
          defaultValue={videoLink}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(2)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        fullWidth: true,
        component: TextInput,
        defaultValue: videoLink.title,
        label: 'Video Title',
        name: ['videos', 1, 'title'],
        variant: 'outlined'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        fullWidth: true,
        component: TextInput,
        defaultValue: videoLink.link,
        name: ['videos', 1, 'link'],
        variant: 'outlined'
      }),
      {}
    )
  })

  it('renders remove button component if index equal or more than 3', () => {
    render(
      <Form>
        <DSOVideoItem
          defaultValue={videoLink}
          index={3}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledTimes(1)
    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      expect.objectContaining({
        remove: removeFn,
        index: 3
      }),
      {}
    )
  })

  it('renders remove button component if isNew is false', () => {
    render(
      <Form>
        <DSOVideoItem
          defaultValue={videoLink}
          index={1}
          fieldId={'213'}
          remove={removeFn}
        />
      </Form>
    )

    expect(DSOTeamRemoveButton).toHaveBeenCalledTimes(1)
    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      expect.objectContaining({
        remove: removeFn,
        index: 1
      }),
      {}
    )
  })
})
