import React from 'react'
// import { TableView } from 'components/TableWithPagination/TableView'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { authorizerURL, issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
// import { columns } from './columns'
import { Actions } from 'app/pages/issuance/components/Actions'
// import { VSpacer } from 'components/VSpacer'
import { useIsAuthorizer } from 'helpers/acl'
import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { Listing } from 'types/listing'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { compactColumns, columns } from './columns'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import { MobileActions } from 'app/pages/issuance/components/SecondaryListingsTable/MobileActions'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
export const MyDSOsTable = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const isAuthorizer = useIsAuthorizer()
  // const { isTablet } = useAppBreakpoints()
  const uri = isAuthorizer
    ? authorizerURL.offerings
    : issuanceURL.dso.getByUserId(userId)

  const { getFilterValue } = useQueryFilter()
  const filter = {
    searchKeyword: getFilterValue('search'),
    sortField: getFilterValue('sortBy'),
    sortOrder: getFilterValue('orderBy') === 'ASC' ? 1 : -1
  }

  const { isTablet } = useAppBreakpoints()
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
        filter={
          {
            ...filter,
            status: 'Draft,Submitted,Approved,Rejected' as any
          } as any
        }
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
    // <>
    //   <VSpacer size='medium' />
    //   <TableView
    //     name={dsoQueryKeys.getDSOsByUserId(userId)}
    //     uri={uri}
    //     columns={columns}
    //     hasActions
    //     actions={Actions}
    //     filter={{
    //       status: 'Draft,Approved,Submitted,Rejected' as any // TODO: fix typings
    //     }}
    //   />
    // </>
  )
}
