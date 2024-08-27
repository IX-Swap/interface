import React from 'react'

import { FormWrapper, Label } from './styleds'
import { Select as ReactSelect } from './TokenSelect'

interface TokenProps {
  formik: any
  activeTokens: any
}

const Token: React.FC<TokenProps> = ({ formik, activeTokens }) => {
  const handleSelectChange = (selectedOptions: any) => {
    // Update the formik value directly
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : []
    formik.setFieldValue('tokens', values)
  }

  const items = activeTokens.map((token: any) => ({
    value: token.id,
    label: token.name,
    logo: token.logo,
  }))

  console.log('items', items)
  return (
    <>
      <h1 className="title">Tokens</h1>
      <FormWrapper>
        <Label>RWAs</Label>
        <ReactSelect
          id="tokens"
          name="tokens"
          options={items}
          isDisabled={false}
          isMulti
          isClearable={false}
          value={formik.values.tokens}
          onSelect={handleSelectChange}
          placeholder="Choose RWAs"
        />
      </FormWrapper>
    </>
  )
}

export default Token
