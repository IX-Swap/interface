import React from 'react'
import { Table, TableContainer, TableBody } from '@material-ui/core'
import { DataroomBanner } from 'types/dataroomBanner'
import { BannerTableRow } from 'app/pages/admin/components/BannerTableRow'

export interface DocumentTableProps {
  banners: DataroomBanner[]
}

export const BannerTable = ({ banners }: DocumentTableProps) => {
  return (
    <TableContainer style={{ overflow: 'hidden' }}>
      <Table>
        <TableBody>
          {banners.map(banner => (
            <BannerTableRow key={banner._id} banner={banner} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
