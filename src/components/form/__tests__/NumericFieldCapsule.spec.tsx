import { NumericFieldCapsule } from 'components/form/NumericFieldCapsule'
import { moneyNumberFormat } from 'config/numberFormat'
import React from 'react'
import { render } from 'test-utils'

describe('NumericFieldCapsule', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <NumericFieldCapsule
        numberFormat={moneyNumberFormat}
        capsuleLabel='SGD'
      />
    )
  })
})
