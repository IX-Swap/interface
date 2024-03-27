import React, { useMemo, useState } from 'react'
import { AccordionDetails, AccordionSummary, capitalize } from '@material-ui/core'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'

import { ModalBlurWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { Search } from 'components/Search'
import { DateRangePickerInput } from 'components/DateRangePicker'
import { DateInput } from 'components/DateInput'
import { Option, useTokensList } from 'hooks/useTokensList'
import { StatusCell } from 'components/TmPayoutEvents/StatusCell'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

import { FILTERS, rolesOptions, payoutTypeOptions } from '../constants'
import {
  FiltersButton,
  Header,
  CloseIcon,
  Hr,
  StyledAccordion,
  ExpandIcon,
  ModalContent,
  FiltersContainer,
  ButtonsContainer,
  FiltersCounter,
  CollapsedValueContainer,
} from './styleds'
import { FilterDropdown } from './FilterDropdown'

interface Props {
  values: Record<string, any>
  applyFilters: () => void
  setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void
  onSelectValueChange: (name: string, value: any) => void
  haveValues: boolean
  filters: FILTERS[]
  forManager?: boolean
  searchPlaceholder?: string
  managerSecTokensOptions: Option[]
  statusOptionsSorted: Option[]
  onResetFilters: () => void
}

export const MobileFilters = ({
  values,
  applyFilters,
  filters,
  setFieldValue,
  onSelectValueChange,
  forManager = false,
  searchPlaceholder = 'Search for Wallet',
  managerSecTokensOptions,
  statusOptionsSorted,
  onResetFilters,
}: Props) => {
  const [isOpen, handleIsOpen] = useState(false)
  const [expanded, handleExpanded] = useState<string[]>([])

  const { tokensOptions, secTokensOptions } = useTokensList()

  const selectedFilters = useMemo(() => {
    const formattedValues = Object.entries(values).reduce((acc: Record<string, any>, [key, value]) => {
      if (!value || value?.length === 0) return acc

      if (key === ' startDate') {
        acc[FILTERS.PAYOUT_PERIOD] = `${value} - `
        return acc
      }

      if (key === 'endDate') {
        acc[FILTERS.PAYOUT_PERIOD] = `${acc[FILTERS.PAYOUT_PERIOD] || ' - '}${value}`
        return acc
      }

      if (key === 'status') {
        return { ...acc, [key]: value.map((el: Option) => capitalize(`${el.value}`)).join(', ') }
      }

      if (Array.isArray(value)) {
        return { ...acc, [key]: value.map(({ label }) => label).join(', ') }
      }

      return { ...acc, [key]: value }
    }, {})
    return formattedValues
  }, [values])

  const statusOptionsFormatted = useMemo(
    () =>
      statusOptionsSorted.map(({ value, ...rest }) => ({ ...rest, label: <StatusCell status={`${value}`} />, value })),
    [statusOptionsSorted]
  )

  const toggle = () => handleIsOpen((state) => !state)

  const apply = () => {
    applyFilters()
    toggle()
    handleExpanded([])
  }

  const reset = () => {
    onResetFilters()
    applyFilters()
    toggle()
    handleExpanded([])
  }

  const filterLabels = {
    [FILTERS.SEARCH]: '',
    [FILTERS.ROLES]: 'Role',
    [FILTERS.SEC_TOKENS]: 'Security token',
    [FILTERS.STATUS]: 'Status',
    [FILTERS.PAYOUT_TYPE]: 'Payout type',
    [FILTERS.PAYOUT_TOKEN]: 'Payout token',
    [FILTERS.PAYOUT_PERIOD]: 'Payment period',
    [FILTERS.RECORD_DATE]: 'Record date',
    [FILTERS.DATE_OF_CLAIM]: 'Date of claim',
  } as Record<string, string>

  const filterComponents = {
    [FILTERS.SEARCH]: (
      <Search
        value={values[FILTERS.SEARCH]}
        setSearchValue={(value: string) => setFieldValue(FILTERS.SEARCH, value)}
        placeholder={`${searchPlaceholder}`}
        style={{ margin: 0 }}
      />
    ),
    [FILTERS.ROLES]: (
      <FilterDropdown
        placeholder="Role"
        selectedItems={values[FILTERS.ROLES]}
        onSelect={(item) => onSelectValueChange(FILTERS.ROLES, item)}
        items={rolesOptions}
      />
    ),
    [FILTERS.SEC_TOKENS]: (
      <FilterDropdown
        placeholder="Security token"
        selectedItems={values[FILTERS.SEC_TOKENS]}
        onSelect={(item) => onSelectValueChange(FILTERS.SEC_TOKENS, item)}
        items={forManager ? managerSecTokensOptions : secTokensOptions}
      />
    ),
    [FILTERS.STATUS]: (
      <FilterDropdown
        placeholder="Status"
        selectedItems={values[FILTERS.STATUS]}
        onSelect={(item) => onSelectValueChange(FILTERS.STATUS, item)}
        items={statusOptionsFormatted}
      />
    ),
    [FILTERS.PAYOUT_TYPE]: (
      <FilterDropdown
        placeholder="Payout type"
        selectedItems={values[FILTERS.PAYOUT_TYPE]}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TYPE, item)}
        items={payoutTypeOptions}
      />
    ),
    [FILTERS.PAYOUT_TOKEN]: (
      <FilterDropdown
        placeholder="Payout token"
        selectedItems={values[FILTERS.PAYOUT_TOKEN]}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TOKEN, item)}
        items={tokensOptions}
      />
    ),
    [FILTERS.PAYOUT_PERIOD]: (
      <DateRangePickerInput
        placeholder="MMM DD, YYYY"
        label=""
        value={[values.startDate, values.endDate]}
        onChange={(value) => {
          const format = 'MMM DD, YYYY'
          setFieldValue('startDate', value[0] ? dayjs(value[0]).format(format) : value[0])
          setFieldValue('endDate', value[1] ? dayjs(value[1]).format(format) : value[1])
        }}
      />
    ),
    [FILTERS.RECORD_DATE]: (
      <DateInput
        label=""
        placeholder="MMM DD, YYYY"
        value={values[FILTERS.RECORD_DATE]}
        onChange={(value) => {
          setFieldValue(FILTERS.RECORD_DATE, dayjs(value).format('MMM DD, YYYY'))
        }}
      />
    ),
    [FILTERS.DATE_OF_CLAIM]: (
      <DateInput
        label=""
        placeholder="MMM DD, YYYY"
        value={values[FILTERS.DATE_OF_CLAIM]}
        onChange={(value) => {
          setFieldValue(FILTERS.DATE_OF_CLAIM, dayjs(value).format('MMM DD, YYYY'))
        }}
      />
    ),
  } as Record<string, JSX.Element>

  const onExpand = (filter: string) => {
    const tempExpanded = [...expanded]
    const index = expanded.findIndex((el) => el === filter)

    if (index > -1) {
      tempExpanded.splice(index, 1)
    } else {
      tempExpanded.push(filter)
    }

    handleExpanded(tempExpanded)
  }

  const filtersLength = Object.keys(selectedFilters).length

  return (
    <>
      <FiltersButton have-value={Boolean(filtersLength)} onClick={toggle}>
        Filters
        {Boolean(filtersLength) && <FiltersCounter>{filtersLength}</FiltersCounter>}
      </FiltersButton>
      <RedesignedWideModal isOpen={isOpen} onDismiss={toggle}>
        <ModalBlurWrapper data-testid="filtersModal" style={{ minWidth: '320px', width: '100%', maxWidth: '320px' }}>
          <ModalContent>
            <Header>
              Filters <CloseIcon onClick={toggle} />
            </Header>
            <Hr />
            <FiltersContainer>
              {filters.map((filter, index) =>
                filter === FILTERS.SEARCH ? (
                  <React.Fragment key={`${filter}-${index}`}>
                    {filterComponents[filter]}
                    <Hr />
                  </React.Fragment>
                ) : (
                  <React.Fragment key={`${filter}-${index}`}>
                    <StyledAccordion
                      elevation={0}
                      onChange={() => onExpand(filter)}
                      withBorder={Boolean(!expanded.includes(filter) && selectedFilters[filter])}
                    >
                      <AccordionSummary expandIcon={<ExpandIcon />}>
                        <CollapsedValueContainer>
                          <div>{filterLabels[filter]}</div>
                          {!expanded.includes(filter) && selectedFilters[filter] && (
                            <div className="value">{selectedFilters[filter]}</div>
                          )}
                        </CollapsedValueContainer>
                      </AccordionSummary>
                      <AccordionDetails>{filterComponents[filter]}</AccordionDetails>
                    </StyledAccordion>
                    <Hr />
                  </React.Fragment>
                )
              )}
            </FiltersContainer>
            <ButtonsContainer>
              <ButtonGradientBorder onClick={reset}>
                <Trans>Clear All</Trans>
              </ButtonGradientBorder>
              <ButtonIXSGradient onClick={apply}>
                <Trans>Apply</Trans>
              </ButtonIXSGradient>
            </ButtonsContainer>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}
