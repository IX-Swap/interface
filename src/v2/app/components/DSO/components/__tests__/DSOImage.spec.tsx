/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOImage,
  DSOImageProps
} from 'v2/app/components/DSO/components/DSOImage'
import { dso } from '__fixtures__/authorizer'
import ImageUploader from 'v2/components/form/ImageUploader'

jest.mock('v2/components/form/ImageUploader', () => jest.fn(() => null))

describe('DSOImage', () => {
  const props: DSOImageProps = { dsoId: dso._id, editMode: false }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOImage {...props} />)
  })

  it('renders without error if editMode is true', () => {
    render(<DSOImage {...props} editMode />)
  })

  it('renders without error if dsoId is undefined', () => {
    render(<DSOImage {...props} dsoId={(undefined as unknown) as string} />)
  })

  it('renders ImageUploader with correct props', () => {
    render(<DSOImage {...props} />)

    expect(ImageUploader).toHaveBeenCalledTimes(1)
    expect(ImageUploader).toHaveBeenCalledWith(
      {
        editMode: props.editMode,
        hasDelete: false,
        variant: 'circle',
        name: 'logo',
        defaultValue: props.dsoId,
        getter: expect.any(Function),
        width: 50,
        guide: {
          title: 'DSO Logo',
          label: 'DSO Logo',
          type: 'dsoLogo'
        }
      },
      {}
    )
  })
})
