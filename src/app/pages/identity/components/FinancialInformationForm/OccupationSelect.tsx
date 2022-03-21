import React from 'react'
import { MenuItem, Select } from '@mui/material'

const occupationList = [
  'Accountant',
  'Adminstration Professional',
  'Architect',
  'Armed Forces',
  'Art/Antique Dealer',
  'Artiste/Musician/Crew/Producer',
  'Auctioneer',
  'Banker',
  'Building Construction Labourer',
  'Business Owner/Sole Proprietor',
  'C-suite Officer',
  'Cabin Crew',
  'Chef',
  'Civil Servant',
  'Cleaner/Housekeeper',
  'Clerical Staff',
  'Customer Service Professional',
  'Designer',
  'Company Director/Partner',
  'Driver',
  'Electrician',
  'Engineer',
  'Factory/Machine Operator',
  'F&B Service Crew',
  'Hairdresser',
  'Hawker',
  'Hotel And Restaurant Manager',
  'Information Technology Professional',
  'Insurance Agent',
  'Journalist/Reporter',
  'Legal Professional',
  'Medical Professional',
  'Money Lender',
  'Pawnbroker',
  'Photographer',
  'Pilot',
  'Plumber',
  'Government Official/Politican',
  'Professor',
  'Real Estate Broker/Agent',
  'Receptionist',
  'Retired',
  'Remiser/Trader/Dealer',
  'Sales, Marketing And Public Relations Professional',
  'School Principal',
  'Skilled/Production Worker',
  'Surveyor',
  'Teaching Professional',
  'Technician',
  'Travel Agent/Tour Guide',
  'Unemployed',
  'Unknown - Unknown',
  'Others'
]

export const OccupationSelect = (props: any) => {
  const { ...rest } = props

  return (
    <Select {...rest} style={{ minWidth: 100 }}>
      {occupationList.map(item => {
        return (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        )
      })}
    </Select>
  )
}
