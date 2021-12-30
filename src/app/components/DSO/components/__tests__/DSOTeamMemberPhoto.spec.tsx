import React from 'react'
import { render } from 'test-utils'
import {
  DSOTeamMemberPhoto,
  DSOTeamMemberPhotoProps
} from 'app/components/DSO/components/DSOTeamMemberPhoto'
import * as useRawDataroomFileHook from 'hooks/useRawFile'

describe('DSOTeamMemberPhoto', () => {
  const props: DSOTeamMemberPhotoProps = {
    dsoId: '',
    size: 12
  }

  beforeEach(() => {
    jest
      .spyOn(useRawDataroomFileHook, 'useRawDataroomFile')
      .mockReturnValue({ data: '' } as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSOTeamMemberPhoto {...props} />)
  })
})
