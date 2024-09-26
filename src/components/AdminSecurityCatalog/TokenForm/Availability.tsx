import { FormGrid } from 'pages/KYC/styleds'
import React from 'react'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import { Checkbox } from 'components/Checkbox'
import { defaultKycType } from '../mock'
import Toggle from 'components/Toggle'

const options = [
  { label: 'Individuals - Accredited Investors', value: 'individualAccredited' },
  { label: 'Individuals - NOT Accredited Investors', value: 'individualAccreditedNot' },
  { label: 'Corporate - Accredited Investors', value: 'corporateAccredited' },
  { label: 'Corporate - NOT Accredited Investors', value: 'corporateAccreditedNot' },
]

interface AvailabilityProps {
  formik: any
}

const Availability: React.FC<AvailabilityProps> = ({ formik }) => {
  const kycType = defaultKycType as any

  return (
    <>
      <h1 className="title">Availability</h1>

      <FormGrid columns={2} style={{ marginTop: 24 }}>
        <div>
          <Options>
            {options.map(({ value, label }) => (
              <Checkbox key={value} label={label} onClick={() => {}} checked={kycType[value]} />
            ))}
          </Options>
        </div>

        <Box>
          <Flex alignItems="center" mb="24px">
            <Toggle isActive={true} toggle={() => {}} showLabel={false} /> <LabelRadio>Active</LabelRadio>
          </Flex>
          <Flex alignItems="center" mb="24px">
            <Toggle isActive={true} toggle={() => {}} showLabel={false} /> <LabelRadio>Featured</LabelRadio>
          </Flex>
          <Flex alignItems="center" mb="24px">
            <Toggle isActive={true} toggle={() => {}} showLabel={false} /> <LabelRadio>Allow Withdrawal</LabelRadio>
          </Flex>
          <Flex alignItems="center" mb="24px">
            <Toggle isActive={true} toggle={() => {}} showLabel={false} /> <LabelRadio>Allow Deposit</LabelRadio>
          </Flex>
        </Box>
      </FormGrid>
    </>
  )
}

export default Availability

const ErrorText = styled.span`
  color: #f44336;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.36px;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const LabelRadio = styled.div`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  margin-left: 10px;
`
