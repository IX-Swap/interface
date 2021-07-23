import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import * as useSecurities from 'app/pages/home/hooks/useSecurities'
import { SecurityView } from 'app/pages/home/pages/SecurityView'
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
})
