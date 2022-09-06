import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { videoLink } from '__fixtures__/issuance'
import {
  DSOVideoItem,
  getRemoveButtonWidth,
  getRemoveButtonWrapperWidth,
  getWrapValue
} from 'app/components/DSO/components/DSOVideoItem'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { TextInput } from 'ui/TextInput/TextInput'
import { Divider } from 'ui/Divider'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock('ui/Divider', () => ({
  Divider: jest.fn(() => null)
}))

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

  it('renders inputs with correct props when defaultValue is undefined ', () => {
    render(
      <Form>
        <DSOVideoItem
          defaultValue={undefined as any}
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
        defaultValue: '',
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
        defaultValue: '',
        name: ['videos', 1, 'link'],
        variant: 'outlined'
      }),
      {}
    )
  })

  it('renders remove button and Divider components', () => {
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

    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      {
        disabled: false,
        sx: { width: 50, height: 50 },
        remove: removeFn,
        index: 1
      },
      {}
    )
    expect(Divider).toHaveBeenCalledTimes(0)
  })

  it('renders remove button and Divider components when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)

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

    expect(DSOTeamRemoveButton).toHaveBeenCalledWith(
      {
        disabled: false,
        sx: { width: '100%', height: 50 },
        remove: removeFn,
        index: 1
      },
      {}
    )

    expect(Divider).toHaveBeenCalledTimes(1)
  })

  it('returns correct style values for nested components', () => {
    expect(getWrapValue(true)).toBe('wrap')
    expect(getWrapValue(false)).toBe('nowrap')
    expect(getRemoveButtonWidth(true)).toBe('100%')
    expect(getRemoveButtonWidth(false)).toBe(50)
    expect(getRemoveButtonWrapperWidth(true)).toBe('100%')
    expect(getRemoveButtonWrapperWidth(false)).toBe('initial')
  })
})
