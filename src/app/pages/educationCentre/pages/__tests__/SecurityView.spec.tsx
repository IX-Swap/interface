import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import * as useSecurities from 'app/pages/educationCentre/hooks/useSecurities'
import { SecurityView } from 'app/pages/educationCentre/pages/SecurityView'
import { history } from 'config/history'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('SecurityView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = generateQueryResult({ data: [sampleSecurity] })

    jest
      .spyOn(useSecurities, 'useSecurities')
      .mockImplementation(() => objResponse as any)
    render(<SecurityView />)
  })

  it('renders null when data is undefined', () => {
    history.push('/app?ticker=REALTOKEN-S-3432-HARDING-ST-DETROIT-MI')
    const objResponse = generateQueryResult({ data: undefined })

    jest
      .spyOn(useSecurities, 'useSecurities')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<SecurityView />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when security is undefined', () => {
    history.push('/app?ticker=notreal')
    const objResponse = generateQueryResult({ data: [sampleSecurity] })

    jest
      .spyOn(useSecurities, 'useSecurities')
      .mockImplementation(() => objResponse as any)
    const { container } = render(<SecurityView />)
    expect(container).toBeEmptyDOMElement()
  })
})
