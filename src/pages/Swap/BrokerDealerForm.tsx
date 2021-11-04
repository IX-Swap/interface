/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components/macro'

const FormWrapper = styled.form`
  position: absolute;
  visibility: hidden;
  top: 0;
  left: 0;
`
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable react/prop-types
export const BrokerDealerForm = React.forwardRef<any, Props>(({}, ref) => {
  return (
    <FormWrapper method="POST" ref={ref}>
      <input type="submit" />
    </FormWrapper>
  )
})

BrokerDealerForm.displayName = 'BrokerDealerForm'
