import React from 'react'

import { CorporateKyc, IndividualKyc } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { Field } from '../molecules/Field'

interface Props {
  data: IndividualKyc | CorporateKyc
}

export const Referral = ({ data }: Props) => {
  return (
    <Block title="Referral">
        <Field label='Referral Code' value={data.referralCode ?? 'Not provided'} />
    </Block>
  )
}
