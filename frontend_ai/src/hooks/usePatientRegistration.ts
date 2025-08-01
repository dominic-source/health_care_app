import { initialFormData } from '@/constant';
import { MedicalHistoryArrayKeys, PatientRegistration } from '@/types/patient';
import {
  formatPhoneNumber,
  validatePatientRegistration,
} from '@/utils/validation';
import { useState } from 'react';

export const usePatientRegistration = () => {
  const [formData, setFormData] =
    useState<PatientRegistration>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [medicationInput, setMedicationInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [surgeryInput, setSurgeryInput] = useState('');

  const totalSteps = 6;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof PatientRegistration] as Record<
            string,
            unknown
          >),
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedPhone = formatPhoneNumber(value);

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof PatientRegistration] as Record<
            string,
            unknown
          >),
          [child]: formattedPhone,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone,
      }));
    }
  };

  const addMedicalItem = (
    type: 'medications' | 'allergies' | 'conditions' | 'surgeries'
  ) => {
    let value = '';
    let setter: React.Dispatch<React.SetStateAction<string>>;
    let key: MedicalHistoryArrayKeys;

    switch (type) {
      case 'medications':
        value = medicationInput;
        setter = setMedicationInput;
        key = 'currentMedications';
        break;
      case 'allergies':
        value = allergyInput;
        setter = setAllergyInput;
        key = 'allergies';
        break;
      case 'conditions':
        value = conditionInput;
        setter = setConditionInput;
        key = 'chronicConditions';
        break;
      case 'surgeries':
        value = surgeryInput;
        setter = setSurgeryInput;
        key = 'previousSurgeries';
        break;
    }

    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        medicalHistory: {
          ...prev.medicalHistory,
          [key]: [...prev.medicalHistory[key], value.trim()],
        },
      }));
      setter('');
    }
  };

  const removeMedicalItem = (type: MedicalHistoryArrayKeys, index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [type]: prev.medicalHistory[type].filter((_, i) => i !== index),
      },
    }));
  };

  const nextStep = () => {
    const validation = validatePatientRegistration(formData, currentStep);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  // correct the validation logic to prevent going back if there are errors
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validatePatientRegistration(formData, currentStep);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Submit to API
      console.log('Submitting patient registration:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Registration submitted successfully!');
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    formData,
    errors,
    currentStep,
    isSubmitting,
    medicationInput,
    allergyInput,
    conditionInput,
    surgeryInput,
    totalSteps,

    // State Setters (for direct manipulation if needed)
    setFormData,
    setErrors,
    setCurrentStep,
    setIsSubmitting,
    setMedicationInput,
    setAllergyInput,
    setConditionInput,
    setSurgeryInput,

    // Handlers
    handleInputChange,
    handlePhoneChange,
    addMedicalItem,
    removeMedicalItem,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
