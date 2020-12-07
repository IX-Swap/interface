import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOLogo,
  DSOLogoProps
} from 'app/pages/invest/components/DSOTable/DSOLogo'

const sampleProps: DSOLogoProps = {
  dsoId: 'id001',
  alt: 'company name'
}

const mockFileData = 'blob:filestring'

jest.mock('hooks/useRawFile', () => ({
  __esModule: true,
  useRawDataroomFile: jest.fn(() => ({
    data: mockFileData
  }))
}))

describe('DSO Logo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without any errors', () => {
    render(<DSOLogo {...sampleProps} />)
  })

  it('renders with the fetched data correctly', () => {
    const { container } = render(<DSOLogo {...sampleProps} />)
    expect(container.querySelector("img[src='blob:filestring']")).toBeTruthy()
  })
})
