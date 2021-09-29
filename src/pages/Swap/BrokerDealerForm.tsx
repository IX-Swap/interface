/* eslint-disable react/prop-types */
import React from 'react'
import { BrokerDealerSwapDto } from 'state/swap-helpers/actions'
import styled from 'styled-components/macro'

const FormWrapper = styled.form`
  position: absolute;
  visibility: hidden;
  top: 0;
  left: 0;
`
interface Props {
  dto: BrokerDealerSwapDto | null
}

// eslint-disable react/prop-types
export const BrokerDealerForm = React.forwardRef<any, Props>(({ dto }, ref) => {
  const endpoint = dto?.endpoint
  const callbackEndpoint = dto?.callbackEndpoint
  const data = dto?.encryptedData
  const hash = dto?.hash
  const action = `${endpoint}`
  console.log({ action })
  return (
    <FormWrapper action={action} method="POST" ref={ref}>
      <input name="callbackEndpoint" value={callbackEndpoint} />
      <input name="hash" value={hash} />
      <input type="data" value={data} />
    </FormWrapper>
  )
})

BrokerDealerForm.displayName = 'BrokerDealerForm'
