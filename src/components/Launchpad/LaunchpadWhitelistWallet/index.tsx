import React, { useEffect, useState } from 'react'

import { SearchFilter } from 'components/LaunchpadIssuance/IssuanceDashboard/SearchFilter'
import { FormBody } from 'components/LaunchpadIssuance/IssuanceForm/shared/styled'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { IssuanceTextField } from 'components/LaunchpadIssuance/utils/TextField'
import { OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ErrorText, Row } from 'components/LaunchpadMisc/styled'
import { Formik, FormikProps } from 'formik'
import { Plus } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import { WhiteListType } from 'services/types'
import { AppDispatch } from 'state'
import { useAppSelector } from 'state/hooks'
import { setFilterValue } from 'state/issuance/actions'
import { useGetWhitelisted, useWhitelistWallet } from 'state/issuance/hooks'
import styled, { useTheme } from 'styled-components'
import { Pagination } from '../Pagination'
import { schema } from './validationSchema'

export interface WhitelistWalletFormValues {
  wallet: string
  fullName: string
}
const initialValues = {
  wallet: '',
  fullName: '',
}
const placeholders = {
  wallet: '0x7C527e86fA464370BdFE8d1BEB5EF4C5E0081bf0',
  fullName: 'John Doe',
}
const tabs = [
  { name: 'Manually Whitelisted Wallets', id: 0, type: WhiteListType.MANUAL },
  { name: 'All Whitelisted Wallets', id: 1, type: WhiteListType.ALL },
]
export const LaunchpadWhitelistWallet = () => {
  const [showWhitelistPopup, setShowWhitelistPopup] = useState(true)
  const toggleDialog = React.useCallback(() => setShowWhitelistPopup((state) => !state), [])
  const form = React.useRef<FormikProps<WhitelistWalletFormValues>>(null)
  const whitelistWallet = useWhitelistWallet()
  const getWhitelistedWallets = useGetWhitelisted()
  const { whitelisted, filter, loadingGet, getError } = useAppSelector((state) => state.issuance)
  const dispatch = useDispatch<AppDispatch>()
  const { items, ...rest } = whitelisted
  const container = React.useRef<HTMLDivElement>(null)

  const submit = (values: WhitelistWalletFormValues) => {
    console.log(values)
    // whitelistWallet('132', values)
  }

  useEffect(() => {
    console.log('filter changed')
    getWhitelistedWallets('0fbd6179-8766-4de3-a484-e6300cba1dbc', filter)
  }, [filter?.search, filter?.type, filter?.page])

  // write a reducer for change page
  // write a use effect for change page, when page is changed get whitelisted

  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  return (
    <IssuanceDialog show={showWhitelistPopup} title="Whitelist Wallet" onClose={toggleDialog} width="600px">
      <Formik innerRef={form} initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
        {({ values, errors, setFieldValue, submitForm }) => (
          <>
            <FormBody>
              <IssuanceTextField
                label="Wallet"
                placeholder={placeholders.wallet}
                value={values.wallet}
                onChange={(v) => setFieldValue('wallet', v)}
                error={errors.wallet}
              />
              <IssuanceTextField
                label="Full Name"
                placeholder={placeholders.fullName}
                value={values.fullName}
                onChange={(v) => setFieldValue('fullName', v)}
                error={errors.fullName}
              />
              <Row>
                <Box width="0.5">
                  <OutlineButton onClick={submitForm} padding="0 1.5rem">
                    <Plus size="15" color={theme.launchpad.colors.primary} /> Add Wallet
                  </OutlineButton>
                </Box>
              </Row>
            </FormBody>
          </>
        )}
      </Formik>
      <Tabs>
        {tabs.map((tab) => (
          <Tab
            key={`whitelist-wallet-tab-${tab.name}`}
            active={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              dispatch(setFilterValue({ filter: { type: tab.type } }))
            }}
          >
            {tab.name}
          </Tab>
        ))}
      </Tabs>
      <SearchFilter onFilter={({ search }) => dispatch(setFilterValue({ filter: { search } }))} />
      {loadingGet && 'Loading'}
      {!loadingGet && JSON.stringify(whitelisted)}
      {getError && <ErrorText>{getError}</ErrorText>}
      <Pagination
        {...rest}
        container={container}
        onChangePage={(page) => dispatch(setFilterValue({ filter: { page } }))}
      />
    </IssuanceDialog>
  )
}

const Tabs = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  height: 100%;
`

const Tab = styled.div<{ active: boolean }>`
  display: grid;
  place-content: center;

  padding: 0.25rem 1rem;

  height: 100%;

  cursor: pointer;

  ${(props) =>
    props.active
      ? `
    border-bottom: 1px solid ${props.theme.launchpad.colors.primary};
  `
      : `
    border-bottom: 1px solid ${props.theme.launchpad.colors.border.default};
  `}

  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  width: 50%;
  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${(props) =>
    props.active ? props.theme.launchpad.colors.text.title : props.theme.launchpad.colors.text.bodyAlt};
`
const TabContainer = styled.div``
