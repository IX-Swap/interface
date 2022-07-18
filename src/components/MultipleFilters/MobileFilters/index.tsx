import React, { useMemo, useState } from 'react'
import { AccordionDetails, AccordionSummary } from '@material-ui/core'
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
}: Props) => {
  const [isOpen, handleIsOpen] = useState(false)

  const { tokensOptions, secTokensOptions } = useTokensList()

  const selectedFilters = useMemo(() => {
    const formattedValues = Object.entries(values).reduce((acc: Record<string, any>, [key, value]) => {
      if (!value || value?.length === 0) return acc

      if (['startDate', 'endDate'].includes(key)) {
        return { ...acc, period: acc.period || value }
      }

      return { ...acc, [key]: value }
    }, {})
    return Object.keys(formattedValues)
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
        placeholder={t`${searchPlaceholder}`}
        style={{ margin: 0 }}
      />
    ),
    [FILTERS.ROLES]: (
      <FilterDropdown
        placeholder="Role"
        selectedItems={values[FILTERS.ROLES]}
        onSelect={(item) => onSelectValueChange(FILTERS.ROLES, item.value)}
        items={rolesOptions}
      />
    ),
    [FILTERS.SEC_TOKENS]: (
      <FilterDropdown
        placeholder="Security token"
        selectedItems={values[FILTERS.SEC_TOKENS]}
        onSelect={(item) => onSelectValueChange(FILTERS.SEC_TOKENS, item.value)}
        items={forManager ? managerSecTokensOptions : secTokensOptions}
      />
    ),
    [FILTERS.STATUS]: (
      <FilterDropdown
        placeholder="Status"
        selectedItems={values[FILTERS.STATUS]}
        onSelect={(item) => onSelectValueChange(FILTERS.STATUS, item.value)}
        items={statusOptionsFormatted}
      />
    ),
    [FILTERS.PAYOUT_TYPE]: (
      <FilterDropdown
        placeholder="Payout type"
        selectedItems={values[FILTERS.PAYOUT_TYPE]}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TYPE, item.value)}
        items={payoutTypeOptions}
      />
    ),
    [FILTERS.PAYOUT_TOKEN]: (
      <FilterDropdown
        placeholder="Payout token"
        selectedItems={values[FILTERS.PAYOUT_TOKEN]}
        onSelect={(item) => onSelectValueChange(FILTERS.PAYOUT_TOKEN, item.value)}
        items={tokensOptions}
      />
    ),
    [FILTERS.PAYOUT_PERIOD]: (
      <DateRangePickerInput
        placeholder="MMM DD, YYYY"
        label=""
        value={[values.startDate, values.endDate]}
        onChange={(value) => {
          const format = 'YYYY-MM-DDTHH:mm:ss'
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
          setFieldValue(FILTERS.RECORD_DATE, dayjs(value).toISOString())
        }}
      />
    ),
    [FILTERS.DATE_OF_CLAIM]: (
      <DateInput
        label=""
        placeholder="MMM DD, YYYY"
        value={values[FILTERS.DATE_OF_CLAIM]}
        onChange={(value) => {
          setFieldValue(FILTERS.DATE_OF_CLAIM, dayjs(value).toISOString())
        }}
      />
    ),
  } as Record<string, JSX.Element>

  return (
    <>
      <FiltersButton have-value={Boolean(selectedFilters.length)} onClick={toggle}>
        Filters
        {Boolean(selectedFilters.length) && <FiltersCounter>{selectedFilters.length}</FiltersCounter>}
      </FiltersButton>
      <RedesignedWideModal isOpen={isOpen} onDismiss={toggle}>
        <ModalBlurWrapper data-testid="filtersModal" style={{ minWidth: '320px', width: '100%' }}>
          <ModalContent>
            <Header>
              Filters <CloseIcon onClick={toggle} />
            </Header>
            <Hr />
            <FiltersContainer>
              {filters.map(
                (filter, index) =>
                  filter !== FILTERS.SEARCH && (
                    <React.Fragment key={`${filter}-${index}`}>
                      <StyledAccordion elevation={0}>
                        <AccordionSummary expandIcon={<ExpandIcon />}>{filterLabels[filter]}</AccordionSummary>

                        <AccordionDetails>{filterComponents[filter]}</AccordionDetails>
                      </StyledAccordion>
                      <Hr />
                    </React.Fragment>
                  )
              )}
            </FiltersContainer>
            <ButtonsContainer>
              <ButtonGradientBorder>
                <Trans>Clear All</Trans>
              </ButtonGradientBorder>
              <ButtonIXSGradient onClick={apply}>
                <Trans>Apply</Trans>
              </ButtonIXSGradient>
            </ButtonsContainer>
            {/* <StyledAccordion elevation={0}>
              <AccordionSummary expandIcon={<ExpandIcon />}>Status</AccordionSummary>
              <AccordionDetails>list</AccordionDetails>
            </StyledAccordion>
            <Hr />
            <StyledAccordion elevation={0}>
              <AccordionSummary expandIcon={<ExpandIcon />}>Payout Type</AccordionSummary>
              <AccordionDetails>TYPER</AccordionDetails>
            </StyledAccordion>
            <Hr /> */}
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}
