import React from 'react'
import { HeadCellWithSort } from 'ui/UIKit/TablesKit/components/HeadCellWithSort/HeadCellWithSort'
import { Status } from 'ui/Status/Status'
import { Link, Box } from '@mui/material'
import { tenantThemes } from 'config/defaults'

export const columns: any[] = [
  {
    key: 'companyName',
    label: <HeadCellWithSort label={'Company Name'} field={'companyName'} />
  },
  {
    key: 'email',
    label: <HeadCellWithSort label={'Email'} field={'email'} />
  },
  {
    key: 'url',
    label: <HeadCellWithSort label={'URL'} field={'url'} />,
    render: (url: string) => (
      <Link href={url} target='_blank' rel='noopener noreferrer'>
        {url}
      </Link>
    )
  },
  {
    key: 'theme',
    label: 'Theme',
    render: (theme: string) => {
      const selectedTheme = tenantThemes.find(t => t.name === theme)

      return (
        <Box
          fontSize={'sm'}
          sx={{
            width: 30,
            height: 30,
            backgroundImage:
              selectedTheme !== undefined ? selectedTheme.hex : '#000',
            borderRadius: '5px'
          }}
          title={theme}
        />
      )
    }
  },
  {
    key: 'active',
    label: 'Status',
    render: (active: boolean | string) => {
      let statusType = 'approved'
      let statusLabel = 'Live'

      switch (active) {
        case 'underReview':
          statusType = 'submitted'
          statusLabel = 'Under Review'
          break
        case 'approved':
          statusType = 'passed'
          statusLabel = 'Approved'
          break
        case 'disabled':
          statusType = 'rejected'
          statusLabel = 'Disabled'
          break

        default:
          break
      }

      return <Status type={statusType} label={statusLabel} />
    }
  }
]

export const compactColumns = [...columns]
