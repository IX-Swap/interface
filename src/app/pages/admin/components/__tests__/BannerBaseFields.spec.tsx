import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import { BannerBaseFields } from 'app/pages/admin/components/BannerBaseFields'
import { Dropzone } from 'components/dataroom/Dropzone'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { Input } from '@material-ui/core'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('BannerBaseFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <BannerBaseFields />
      </Form>
    )
  })

  it('renders editable fields correctly', () => {
    render(
      <Form>
        <BannerBaseFields />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledTimes(2)
    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: '',
        name: 'title',
        fullWidth: true,
        type: 'text',
        component: Input,
        style: { marginTop: 0, minHeight: 54 }
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'banner',
        customRenderer: true,
        component: Dropzone,
        size: ['100%', '100%'],
        fullWidth: true,
        type: 'banner',
        valueExtractor: documentValueExtractor,
        accept: DataroomFileType.image
      }),
      {}
    )
  })
})
