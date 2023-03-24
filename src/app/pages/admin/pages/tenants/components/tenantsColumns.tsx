import React from 'react'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { Status } from 'ui/Status/Status'
import { Button } from '@mui/material'

export const columns: any[] = [
  {
    key: 'company',
    label: <HeadCellWithSort label={'Company'} field={'company'} />,
    render: () => <p>Company</p>
  },
  {
    key: 'name',
    label: <HeadCellWithSort label={'Name'} field={'name'} />,
    render: () => <p>Marvin McKnight</p>
  },
  {
    key: 'email',
    label: <HeadCellWithSort label={'Email'} field={'email'} />,
    render: () => <p>marvin.mcknight@investax.io</p>
  },
  {
    key: 'url',
    label: <HeadCellWithSort label={'URL'} field={'url'} />,
    render: () => <p>tenant1.investax.io</p>
  },
  {
    key: 'offers',
    label: <HeadCellWithSort label={'No. of Offers'} field={'offers'} />,
    render: () => <p>999</p>
  },
  {
    key: 'status',
    label: <HeadCellWithSort label={'Status'} field={'status'} />,
    render: () => <Status type={'draft'} label={'Incomplete'} />
  },
  {
    key: 'action',
    label: <HeadCellWithSort label={'Action'} field={'action'} />,
    render: () => (
      <Button color='primary' variant='text'>
        Customize
      </Button>
    )
  }
]

export const compactColumns = [...columns]
