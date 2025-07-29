export interface PatientRegistration {
  // Personal Information
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  socialSecurityNumber?: string;
  
  // Contact Information
  email: string;
  phone: string;
  alternatePhone?: string;
  
  // Address Information
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  
  // Insurance Information
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
    subscriberId: string;
    relationshipToSubscriber: 'self' | 'spouse' | 'child' | 'other';
  };
  
  // Medical Information
  medicalHistory: MedicalHistory;
  
  // Preferences
  preferredPharmacy?: string;
  preferredLanguage: string;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  
  // Consent and Agreement
  hipaaAgreement: boolean;
  termsAndConditions: boolean;
  privacyPolicy: boolean;
}

export interface MedicalHistory {
  allergies: string[];
  currentMedications: string[];
  chronicConditions: string[];
  previousSurgeries: string[];
  familyHistory: string;
}

// Export array keys type
export type MedicalHistoryArrayKeys = {
  [K in keyof MedicalHistory]: MedicalHistory[K] extends string[] ? K : never;
}[keyof MedicalHistory];

export interface FormErrors {
  [key: string]: string | undefined;
}
