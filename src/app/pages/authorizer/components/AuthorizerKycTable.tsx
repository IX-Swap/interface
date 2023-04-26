import { Viewable } from 'types/util'
import React from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { useAuthorizerFilter } from '../hooks/useAuthorizerFilter'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { AuthorizerSelectionActions } from 'app/pages/authorizer/components/SelectionAction/SelectionActions'
import { ThemeVariant } from '@mui/material/styles/overrides'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { MobileActions } from 'app/pages/issuance/components/SecondaryListingsTable/MobileActions'
import { dsoQueryKeys } from 'config/queryKeys'
import { isTablet } from 'react-device-detect'
import { Listing } from 'types/listing'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import { Actions } from './Actions'
import { compactColumns, columns } from './IndividualColumns'
import { TableViewProps } from 'components/TableWithPagination/TableView'
interface AuthorizerViewProps<T>
  extends Omit<TableViewProps<T>, 'actions'>,
    Viewable<T> {
  idKey?: string
  title: string
  selectable?: boolean
  selectionActions?: AuthorizerSelectionActions
  themeVariant?: ThemeVariant
}

export const AuthorizerKycTable = <T,>(
  props: AuthorizerViewProps<T>
): JSX.Element => {
  const selectionHelperContext = useSelectionHelperContext()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  useUnmountCallback(selectionHelperContext.resetSelection)

  const { uri } = props

  console.log(props, 'kjjjjj')

  const { filter: authFilter } = useAuthorizerFilter()
  const category = useAuthorizerCategory()

  const mergedFilters = {
    ...authFilter,
    status: category === 'commitments' ? undefined : authFilter.status,
    deploymentStatus:
      category === 'token-deployment' ? authFilter.deploymentStatus : undefined,
    isAssigned:
      category === 'virtual-accounts'
        ? authFilter.status !== 'Rejected'
        : undefined
  }
  const titleExtractor = (item: Listing) => {
    return item.tokenSymbol
  }

  return (
    <ActiveElementContextWrapper>
      <TableView<Listing>
        name={dsoQueryKeys.getDSOsByUserId(userId)}
        uri={uri}
        columns={columns}
        actionHeader={'Actions'}
        filter={mergedFilters}
        defaultRowsPerPage={5}
        actions={Actions}
        noHeader={isTablet}
      >
        {isTablet
          ? (props: TableViewRendererProps<any>) => (
              <CompactTable
                {...props}
                columns={compactColumns}
                menu={
                  <MobileMenu
                    items={props.items}
                    titleExtractor={titleExtractor}
                    actions={(item: Listing) => <MobileActions item={item} />}
                  />
                }
              />
            )
          : undefined}
      </TableView>
    </ActiveElementContextWrapper>
  )
}
