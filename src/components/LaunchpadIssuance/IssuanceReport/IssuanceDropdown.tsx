import React, { useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useGetIssuancePlain } from 'state/launchpad/hooks'
import styled from 'styled-components'
import { populatePath } from 'utils/params'
import { routes } from 'utils/routes'
import { DropdownField } from '../IssuanceForm/shared/fields/DropdownField'
import { EMPTY_VALUE } from './constants'
import { useFieldsByRole } from './Table/helpers'

export const IssuanceDropdown = () => {
  const history = useHistory()

  const { issuanceId } = useParams<{ issuanceId: string }>()
  const { isAdmin } = useFieldsByRole()
  const { items } = useGetIssuancePlain({ showAll: `${isAdmin}` })
  const chooseIssuance = (_: string, value: any) => {
    history.push(populatePath({ url: routes.issuanceReport, field: 'issuanceId', value }))
  }

  const options = React.useMemo(() => items.map(({ name, id }) => ({ label: name, value: id })), [items])

  const issuance = useMemo(() => {
    const selectedIssuance = options.filter((item) => item.value.toString() === issuanceId)
    return selectedIssuance?.[0]?.value || EMPTY_VALUE.value
  }, [items.length, issuanceId])

  return (
    <Wrapper>
      <DropdownField
        span={3}
        field="issuance"
        key={options.length}
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
