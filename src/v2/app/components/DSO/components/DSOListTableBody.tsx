import React from 'react'
import { TableBody, TableRow, TableCell } from '@material-ui/core'
import { DSOCard } from 'v2/app/components/DSO/components/DSOCard'
import { DigitalSecurityOffering } from 'v2/types/dso'

export interface DSOListTableBodyProps {
  viewURL: string
  items: DigitalSecurityOffering[]
}

export const DSOListTableBody = (props: DSOListTableBodyProps) => {
  return (
    <TableBody>
      {props.items.map(dso => (
        <TableRow key={dso._id}>
          <TableCell style={{ borderBottom: 'none' }}>
            <DSOCard dso={dso} viewURL={props.viewURL} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
