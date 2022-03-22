import React from 'react'
import { MenuItem, Select } from '@mui/material'

const occupationList = [
  'ACCOUNTANT',
  'ADMINSTRATION PROFESSIONAL',
  'ARCHITECT',
  'ARMED FORCES',
  'ART/ANTIQUE DEALER',
  'ARTISTE/MUSICIAN/CREW/PRODUCER',
  'AUCTIONEER',
  'BANKER',
  'BUILDING CONSTRUCTION LABOURER',
  'BUSINESS OWNER/SOLE PROPRIETOR',
  'C-SUITE OFFICER',
  'CABIN CREW',
  'CHEF',
  'CIVIL SERVANT',
  'CLEANER/HOUSEKEEPER',
  'CLERICAL STAFF',
  'CUSTOMER SERVICE PROFESSIONAL',
  'DESIGNER',
  'COMPANY DIRECTOR/PARTNER',
  'DRIVER',
  'ELECTRICIAN',
  'ENGINEER',
  'FACTORY/MACHINE OPERATOR',
  'F&B SERVICE CREW',
  'HAIRDRESSER',
  'HAWKER',
  'HOTEL AND RESTAURANT MANAGER',
  'INFORMATION TECHNOLOGY PROFESSIONAL',
  'INSURANCE AGENT',
  'JOURNALIST/REPORTER',
  'LEGAL PROFESSIONAL',
  'MEDICAL PROFESSIONAL',
  'MONEY LENDER',
  'PAWNBROKER',
  'PHOTOGRAPHER',
  'PILOT',
  'PLUMBER',
  'GOVERNMENT OFFICIAL/POLITICAN',
  'PROFESSOR',
  'REAL ESTATE BROKER/AGENT',
  'RECEPTIONIST',
  'RETIRED',
  'REMISER/TRADER/DEALER',
  'SALES, MARKETING AND PUBLIC RELATIONS PROFESSIONAL',
  'SCHOOL PRINCIPAL',
  'SKILLED/PRODUCTION WORKER',
  'SURVEYOR',
  'TEACHING PROFESSIONAL',
  'TECHNICIAN',
  'TRAVEL AGENT/TOUR GUIDE',
  'UNEMPLOYED',
  'UNKNOWN - UNKNOWN',
  'OTHERS'
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
