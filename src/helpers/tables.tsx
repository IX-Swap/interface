import { Box, Theme, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ThemeVariant } from '@mui/material/styles/overrides'
import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'
import {
  CorporateIdentity,
  IndividualIdentity,
  Personnel
} from 'app/pages/identity/types/forms'
import { ReactComponent as SGDIcon } from 'assets/icons/flags/sgd.svg'
import { ReactComponent as USDIcon } from 'assets/icons/flags/usd.svg'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import React from 'react'
import { Asset } from 'types/asset'
import { AssetBalance, ConvertedAssetBalance } from 'types/balance'
import { CashDeposit } from 'types/cashDeposit'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { Commitment } from 'types/commitment'
import { DigitalSecurityOffering } from 'types/dso'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { Status } from 'ui/Status/Status'
import { FirstTableItem } from 'ui/UIKit/TablesKit/FirstTable/FirstTable'
import { PersonName } from './types'
import { ReactComponent as ViewIcon } from 'app/pages/issuance/components/SecondaryListingsTable/icons/view.svg'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import useStyles from 'app/pages/issuance/components/SecondaryListingsTable/Actions/Actions.styles'

export const renderMinimumInvestment = (
  amount: number,
  row: DigitalSecurityOffering
): string => formatMoney(amount, row.tokenSymbol)

export const renderClosureMinimumInvestment = (
  amount: number,
  row: Closure
): string => formatMoney(amount, row.dso?.tokenSymbol)

export const renderIncome = (i: string): string => `SGD ${i}`

export const renderAssetName = (a: Asset): string => a.name

export const renderAssetBalance = (val: string, row: AssetBalance): string =>
  `${row.name} (${val})`

export const renderName = (val: string, row: PersonName) => {
  const names = [row.firstName, row.middleName, row.lastName]
  return names.filter(s => s !== undefined).join(' ')
}

export const renderRepresentativeName = (
  val: string,
  row: CorporateIdentity
) => {
  if (row.representatives.length === 0) {
    return ''
  }

  return row.representatives
    .map(({ fullName }: Personnel) => fullName)
    .join(', ')
}

type RenderLastNameRow =
  | CorporateIdentity
  | DSWithdrawal
  | IndividualIdentity
  | Commitment
  | any

export const renderLastName = (val: string, row: RenderLastNameRow): string => {
  let lastName: string

  if ('lastName' in row) {
    lastName = row.lastName
  } else if ('identity' in row) {
    lastName = row.identity.individual.lastName
  } else {
    const representative = row.representatives?.[0]
    lastName = representative?.lastName ?? ''
  }

  return `${val} ${lastName}`
}

export const ViewButton = ({
  href = '#',
  title = 'View',
  target = '',
  sx = {}
}: {
  href?: string
  title?: string
  target?: string
  sx?: object
}) => {
  const { button } = useStyles()

  return (
    <Link href={href} target={target}>
      <Tooltip title={title}>
        <IconButton className={button}>
          <ViewIcon sx={sx} />
        </IconButton>
      </Tooltip>
    </Link>
  )
}

export const renderRiskReport = (val: object) => {
  if (typeof val !== 'undefined' && 'customerId' in val) {
    const cynopsisUrl =
      process.env.CYNOPSIS_URL ??
      'https://investaxdigital.artemisuat.cynopsis.co'
    const customerId = val.customerId as string
    const href = `${cynopsisUrl}/app/customers/${customerId}`

    return (
      <ViewButton
        href={href}
        title='View Risk Report'
        target='_blank'
        sx={{ padding: 0 }}
      />
    )
  }

  return <Box px={1}>N/A</Box>
}

export const getIndividualLastName = (
  individual: IndividualIdentity
): string => {
  if (individual !== undefined) {
    return individual.lastName
  }
  return ''
}

export const getCorporateLegalName = (corporate: CorporateIdentity): string => {
  if (corporate !== undefined) {
    return corporate.companyLegalName
  }
  return ''
}

export const getCorporateRepresentativeName = (corporate: any): string => {
  if (corporate !== undefined) {
    return corporate.representatives?.[0]?.lastName ?? ''
  }
  return ''
}
type NameRenderRow =
  | CorporateIdentity
  | DSWithdrawal
  | IndividualIdentity
  | Commitment
  | CashDeposit
  | CashWithdrawal
  | WithdrawalAddress

export const renderIndividualOrCompanyName = (
  val: string | undefined,
  row: NameRenderRow
): string => {
  let lastName = ''
  let companyName = ''

  if ('lastName' in row) {
    lastName = getIndividualLastName(row)
  } else if ('representatives' in row) {
    lastName = getCorporateRepresentativeName(row)
    companyName = getCorporateLegalName(row)
  } else if ('individual' in row || 'corporates' in row) {
    lastName = getIndividualLastName(row.individual)
    companyName = getCorporateLegalName(row.corporates[0])
  } else if (row.identity !== undefined && 'identity' in row) {
    lastName = getIndividualLastName(row.identity.individual)
    companyName = getCorporateLegalName(row.identity.corporates[0])
  }

  if (val === undefined || lastName === '') {
    return companyName
  }
  return `${val} ${lastName}`
}

type RenderAmountRow =
  | CashDeposit
  | CashWithdrawal
  | Commitment
  | DSWithdrawal
  | DigitalSecurityOffering
  | AssetBalance
  | ConvertedAssetBalance

export const renderAmount = (
  val: string | undefined,
  row: RenderAmountRow
): string => {
  const amount = Number.isNaN(val) || val === undefined ? 0 : parseFloat(val)
  let symbol

  if ('currency' in row) {
    if (Array.isArray(row.currency)) {
      symbol = row.currency[0]?.numberFormat?.currency ?? ''
    } else if (typeof row.currency === 'string') {
      symbol = row.currency
    } else {
      symbol = row.currency?.numberFormat.currency
    }
  } else if ('onHold' in row) {
    symbol = ''
  } else {
    symbol = row.asset?.symbol
  }

  return formatMoney(amount, symbol)
}

export const renderClosureAmount = (val: string, row: Closure): string => {
  const amount = Number.isNaN(val) ? 0 : parseFloat(val)
  const symbol = row.dso?.currency?.symbol
  return formatMoney(amount, symbol)
}

export const renderLatestDate = (val: string, row: any): string => {
  const latest = row.lastTransaction ?? row.updatedAt ?? row.createdAt ?? val

  return typeof latest === 'string' ? formatDateToMMDDYY(latest) : ''
}

export const useHeaderColor = (themeVariant?: ThemeVariant) => {
  const theme = useTheme()
  if (themeVariant === 'primary') {
    return theme.palette.mode === 'light'
      ? '#141272'
      : theme.palette.primary.main
  }
  if (themeVariant === 'error') {
    return '#DF5A72'
  }
  if (themeVariant === 'success') {
    return theme.palette.backgrounds.alternative
  }
  return 'initial'
}

interface RowColorArgs {
  theme: Theme
  themeVariant?: ThemeVariant
  count: number
}

export const getRowColor = ({ theme, themeVariant, count }: RowColorArgs) => {
  if (themeVariant === 'default') {
    return 'initial'
  }
  if (count % 2 === 0) {
    return theme.palette.backgrounds.default
  }
  return theme.palette.mode === 'light' ? '#F8F8FD' : theme.palette.grey[900]
}

export const renderRowAmount = (value: any, _row: any) =>
  Number.isInteger(value) ? formatMoney(value, '') : value

export const renderTicker = (value: string, _row: any) => (
  <Typography variant='subtitle1'>{value}</Typography>
)

export const renderBalance = (price: string, item: FirstTableItem) => {
  return (
    <>
      {RenderBolderText(price)}&ensp;
      {item.currency}
    </>
  )
}

export const renderSGDPrice = (price: string) => {
  return <>{RenderBolderText(price)}&ensp; SGD</>
}

export const renderUSDPrice = (price: string) => {
  return <>{RenderBolderText(price)}&ensp; USD</>
}

export const renderCurrencyLabel = (currency: string) => {
  const Icon = currency === 'USD' ? USDIcon : SGDIcon
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Icon style={{ marginRight: 16 }} />
      {RenderBolderText(currency)}
    </Box>
  )
}

export const RenderBolderText = (text: string) => {
  return <Typography fontWeight={500}>{text}</Typography>
}

export const renderStatus = (status: string) => {
  const getType = () => {
    switch (status) {
      case 'Connected':
        return 'approved'
      case 'In progress':
        return 'submitted'
      default:
        return 'rejected'
    }
  }

  return <Status type={getType()} label={status} />
}

export const renderListingStatus = (status: string) => {
  return <Status type={status} label={status} />
}
