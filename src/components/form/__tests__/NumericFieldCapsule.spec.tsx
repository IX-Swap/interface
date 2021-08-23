import { NumericFieldCapsule } from 'components/form/NumericFieldCapsule'
import { moneyNumberFormat } from 'config/numberFormat'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NumericFieldCapsule', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <NumericFieldCapsule
        numberFormat={moneyNumberFormat}
        capsuleLabel='SGD'
      />
    )
  })
})
