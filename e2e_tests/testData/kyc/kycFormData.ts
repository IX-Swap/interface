const fs = require('fs');

export const individualKycFormData  = {
  rejectAnnotation: 'When and where is it decided who will be able to control what annotations are rejected.',
  changeRequest: 'A change request is a formal proposal for an alteration to some product or system.',
  firstName: 'Jack',
  middleName: 'Junior',
  lastName: 'Jonson',
  gender: 'Male',
  nationality: 'Algeria',
  citizenship: 'Haiti',
  phoneNumber: '80931827991',
  emailAddress: 'jack@email.com',
  documentType: 'National ID',
  documentNumber: 'JK092346',
  address: 'Marin, str.',
  postalCode: '19000',
  country: 'Chile',
  city: 'Santiago',
  sourceOfFunds: 'Investments',
  investorStatusDeclaration: 'accredited',
  FATCHA: 'notCitizenOfUS',
  occupation: 'ACCOUNTANT',
  employmentStatus: 'Full-Time Employee',
  employer: 'Testers & Co',
  incomeUsd: '50,000-100,000',
  documentFilePath: 'testData/kycDocument.jpg',
  documentIssueYear: 2021,
  documentIssueMonth: 'Oct',
  documentIssueDay: 25,
  documentExpiryYear: 2024,
  documentExpiryMonth: 'Nov',
  documentExpiryDay: 18,
  dateOfBirthYear: 1992,
  dateOfBirthMonth: 'Oct',
  dateOfBirthDay: 13,
  taxIdentificationNumber: 'SDA4352'
};

export const corporateKycForm = {
  corporateName: 'Sweet Dreams',
  registrationNumber: 'JK 1234567890',
  businessActivity: 'sales'
};

export const kycRequestBody = {
  'firstName': 'Test',
  'middleName': 'Test',
  'lastName': 'Sec',
  'gender': 'Male',
  'dateOfBirth': '01/04/2000',
  'nationality': 'Argentina',
  'citizenship': 'Algeria',
  'phoneNumber': '+77088996754',
  'email': 'support@ttnm.com',
  'sourceOfFunds': 'Property, Inheritance/Gifts, Pension',
  'accredited': '1',
  'occupation': 'ARCHITECT',
  'employer': 'Algérie Ferries',
  'employmentStatus': 'Part-Time Employee',
  'income': '< 50,000',
  'idNumber': 'p4909409',
  'idType': 'OTHERS',
  'additionalIdType': 'TESTDoc',
  'idIssueDate': '01/04/2000',
  'idExpiryDate': '01/04/2025',
  'address': 'Almaty',
  'country': 'France',
  'city': 'Paris',
  'postalCode': '004005',
  'confirmStatusDeclaration': 'true',
  'proofOfIdentity': {
  'value': fs.createReadStream('testData/kycDocument.jpg'),
    'options': {
    'filename': '/C:/Users/Work/OneDrive/Рабочий стол/компании/обезъянки.jpg',
      'contentType': null
  }
},
  'proofOfAddress': {
  'value': fs.createReadStream('testData/kycDocument.jpg'),
    'options': {
    'filename': '/C:/Users/Work/OneDrive/Рабочий стол/компании/обезъянки.jpg',
      'contentType': null
  }
},
  'evidenceOfAccreditation': {
  'value': fs.createReadStream('testData/kycDocument.jpg'),
    'options': {
    'filename': '/C:/Users/Work/OneDrive/Рабочий стол/компании/обезъянки.jpg',
      'contentType': null
  }
},
  'taxDeclarations[0][country]': 'KAZ',
  'taxDeclarations[0][idNumber]': '',
  'taxDeclarations[0][reason]': 'test',
  'taxDeclarations[0][isAdditional]': 'true',
  'investorDeclaration[acceptOfQualification]': 'true',
  'investorDeclaration[acceptRefusalRight]': 'true',
  'investorDeclaration[status]': 'total-assets'
};
