import { PatientRegistration } from '@/types/patient';

export const initialFormData: PatientRegistration = {
  firstName: '',
  lastName: '',
  middleName: '',
  dateOfBirth: '',
  gender: '',
  socialSecurityNumber: '',
  email: '',
  phone: '',
  alternatePhone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
    email: ''
  },
  insurance: {
    provider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberId: '',
    relationshipToSubscriber: 'self'
  },
  medicalHistory: {
    allergies: [],
    currentMedications: [],
    chronicConditions: [],
    previousSurgeries: [],
    familyHistory: ''
  },
  preferredPharmacy: '',
  preferredLanguage: 'English',
  communicationPreferences: {
    email: true,
    sms: false,
    phone: false
  },
  hipaaAgreement: false,
  termsAndConditions: false,
  privacyPolicy: false
};
