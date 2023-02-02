import React, { useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGetIssuancePlain } from 'state/launchpad/hooks'
import styled from 'styled-components'
import { populatePath } from 'utils/params'
import { routes } from 'utils/routes'
import { DropdownField } from '../IssuanceForm/shared/fields/DropdownField'

const EMPTY_VALUE = { label: 'All', value: 'all' }
export const IssuanceDropdown = () => {
  const history = useHistory()
  const { offerId } = useParams<{ offerId: string }>()
  // for admin we use showAll, for issuer we don't
  const { items } = useGetIssuancePlain({ showAll: 'true' })
  const chooseIssuance = (_: string, value: any) => {
    history.push(populatePath({ url: routes.issuanceReport, field: 'offerId', value }))
  }

  const options = React.useMemo(() => items.map(({ name, id }) => ({ label: name, value: id })), [items])

  const issuance = useMemo(() => {
    const selectedIssuance = options.filter((item) => item.value.toString() === offerId)
    return selectedIssuance?.[0]?.value || EMPTY_VALUE.value
  }, [items.length, offerId])

  return (
    <Wrapper>
      <DropdownField
        span={3}
        field="issuance"
        key={issuance}
        setter={chooseIssuance}
        options={options}
        label="Choose issuance"
        placeholder="All"
        disabled={options.length === 0}
        value={issuance}
        error={undefined}
        emptyOption={EMPTY_VALUE}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(12, 1fr);
`
