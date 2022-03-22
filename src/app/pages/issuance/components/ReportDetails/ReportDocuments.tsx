import React from 'react'
import { Table, TableBody, TableContainer, TableRow } from '@mui/material'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { FinancialReport } from 'types/financitalReport'

export interface ReportDocumentsProps {
  report: FinancialReport
}

export const ReportDocuments = ({ report }: ReportDocumentsProps) => {
  return (
    <TableContainer>
      <Table>
        <DataroomHeader />
        <TableBody>
          {report.reportDocuments.map((document, index) => (
            <TableRow key={index}>
              <DataroomViewRow
                showDivider={false}
                title={document?.title ?? ''}
                document={document}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
