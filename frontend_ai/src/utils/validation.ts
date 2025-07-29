import { PatientRegistration } from '@/types/patient';

export const validatePatientRegistration = (data: Partial<PatientRegistration>) => {
  const errors: { [key: string]: string } = {};

  // Personal Information Validation
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const today = new Date();
    const birthDate = new Date(data.dateOfBirth);
    if (birthDate > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future';
    }
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  // Contact Information Validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Address Validation
  if (!data.address?.street?.trim()) {
    errors['address.street'] = 'Street address is required';
  }

  if (!data.address?.city?.trim()) {
    errors['address.city'] = 'City is required';
  }

  if (!data.address?.state?.trim()) {
    errors['address.state'] = 'State is required';
  }

  if (!data.address?.zipCode?.trim()) {
    errors['address.zipCode'] = 'ZIP code is required';
  } else if (!/^\d{5}(-\d{4})?$/.test(data.address.zipCode)) {
    errors['address.zipCode'] = 'Please enter a valid ZIP code';
  }

  if (!data.address?.country?.trim()) {
    errors['address.country'] = 'Country is required';
  }

  // Emergency Contact Validation
  if (!data.emergencyContact?.name?.trim()) {
    errors['emergencyContact.name'] = 'Emergency contact name is required';
  }

  if (!data.emergencyContact?.relationship?.trim()) {
    errors['emergencyContact.relationship'] = 'Relationship is required';
  }

  if (!data.emergencyContact?.phone?.trim()) {
    errors['emergencyContact.phone'] = 'Emergency contact phone is required';
  }

  // Consent Validation
  if (!data.hipaaAgreement) {
    errors.hipaaAgreement = 'HIPAA agreement is required';
  }

  if (!data.termsAndConditions) {
    errors.termsAndConditions = 'Terms and conditions agreement is required';
  }

  if (!data.privacyPolicy) {
    errors.privacyPolicy = 'Privacy policy agreement is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};
