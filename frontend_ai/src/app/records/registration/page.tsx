'use client';

import { CheckboxField } from '@/components/CheckboxField';
import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { TextAreaField } from '@/components/TextAreaField';
import {
  genderOptions,
  insuranceRelationshipOptions,
  relationshipOptions,
  stateOptions,
} from '@/constant';
import { usePatientRegistration } from '@/hooks/usePatientRegistration';

export default function RegistrationPage() {
  const inputCSS =
    'flex-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900';
  const {
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

    // State Setters
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
  } = usePatientRegistration();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                required
              />
              <InputField
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                required
              />
              <InputField
                label="Middle Name"
                id="middleName"
                name="middleName"
                value={formData.middleName || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Date of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={errors.dateOfBirth}
                required
              />
              <SelectField
                label="Gender"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={genderOptions}
                error={errors.gender}
                required
                placeholder="Select your gender"
              />
              <InputField
                label="Social Security Number"
                id="socialSecurityNumber"
                name="socialSecurityNumber"
                value={formData.socialSecurityNumber || ''}
                onChange={handleInputChange}
                placeholder="###-##-####"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
              <InputField
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                error={errors.phone}
                required
                placeholder="(555) 123-4567"
              />
              <InputField
                label="Alternate Phone"
                id="alternatePhone"
                name="alternatePhone"
                type="tel"
                value={formData.alternatePhone || ''}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                className="md:col-span-2"
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Street Address"
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  error={errors['address.street']}
                  required
                  className="md:col-span-2"
                />
                <InputField
                  label="City"
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  error={errors['address.city']}
                  required
                />
                <SelectField
                  label="State"
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  options={stateOptions}
                  error={errors['address.state']}
                  required
                  placeholder="Select your state"
                />
                <InputField
                  label="ZIP Code"
                  id="address.zipCode"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  error={errors['address.zipCode']}
                  required
                  placeholder="12345"
                />
                <InputField
                  label="Country"
                  id="address.country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  error={errors['address.country']}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                id="emergencyContact.name"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleInputChange}
                error={errors['emergencyContact.name']}
                required
              />
              <SelectField
                label="Relationship"
                id="emergencyContact.relationship"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleInputChange}
                options={relationshipOptions}
                error={errors['emergencyContact.relationship']}
                required
                placeholder="Select relationship"
              />
              <InputField
                label="Phone Number"
                id="emergencyContact.phone"
                name="emergencyContact.phone"
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={handlePhoneChange}
                error={errors['emergencyContact.phone']}
                required
                placeholder="(555) 123-4567"
              />
              <InputField
                label="Email Address"
                id="emergencyContact.email"
                name="emergencyContact.email"
                type="email"
                value={formData.emergencyContact.email || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Insurance Information
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please provide your insurance information. This section is
              optional but recommended for faster processing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Insurance Provider"
                id="insurance.provider"
                name="insurance.provider"
                value={formData.insurance?.provider || ''}
                onChange={handleInputChange}
                placeholder="e.g., Blue Cross Blue Shield"
              />
              <InputField
                label="Policy Number"
                id="insurance.policyNumber"
                name="insurance.policyNumber"
                value={formData.insurance?.policyNumber || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Group Number"
                id="insurance.groupNumber"
                name="insurance.groupNumber"
                value={formData.insurance?.groupNumber || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Subscriber ID"
                id="insurance.subscriberId"
                name="insurance.subscriberId"
                value={formData.insurance?.subscriberId || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Relationship to Subscriber"
                id="insurance.relationshipToSubscriber"
                name="insurance.relationshipToSubscriber"
                value={formData.insurance?.relationshipToSubscriber || 'self'}
                onChange={handleInputChange}
                options={insuranceRelationshipOptions}
                className="md:col-span-2"
                placeholder="Select relationship to subscriber"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Medical History
            </h2>

            {/* Allergies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Allergies
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={allergyInput}
                  onChange={e => setAllergyInput(e.target.value)}
                  placeholder="Enter allergy"
                  className={inputCSS}
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), addMedicalItem('allergies'))
                  }
                />
                <button
                  type="button"
                  onClick={() => addMedicalItem('allergies')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                  >
                    {allergy}
                    <button
                      type="button"
                      onClick={() => removeMedicalItem('allergies', index)}
                      className="ml-1 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Current Medications
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={medicationInput}
                  onChange={e => setMedicationInput(e.target.value)}
                  placeholder="Enter medication"
                  className={inputCSS}
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), addMedicalItem('medications'))
                  }
                />
                <button
                  type="button"
                  onClick={() => addMedicalItem('medications')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.currentMedications.map(
                  (medication, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {medication}
                      <button
                        type="button"
                        onClick={() =>
                          removeMedicalItem('currentMedications', index)
                        }
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Chronic Conditions */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chronic Conditions
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={conditionInput}
                  onChange={e => setConditionInput(e.target.value)}
                  placeholder="Enter chronic condition"
                  className={inputCSS}
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), addMedicalItem('conditions'))
                  }
                />
                <button
                  type="button"
                  onClick={() => addMedicalItem('conditions')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.chronicConditions.map(
                  (condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                    >
                      {condition}
                      <button
                        type="button"
                        onClick={() =>
                          removeMedicalItem('chronicConditions', index)
                        }
                        className="ml-1 text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Previous Surgeries */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Previous Surgeries
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={surgeryInput}
                  onChange={e => setSurgeryInput(e.target.value)}
                  placeholder="Enter surgery"
                  className={inputCSS}
                  onKeyPress={e =>
                    e.key === 'Enter' &&
                    (e.preventDefault(), addMedicalItem('surgeries'))
                  }
                />
                <button
                  type="button"
                  onClick={() => addMedicalItem('surgeries')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalHistory.previousSurgeries.map(
                  (surgery, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      {surgery}
                      <button
                        type="button"
                        onClick={() =>
                          removeMedicalItem('previousSurgeries', index)
                        }
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  )
                )}
              </div>
            </div>

            <TextAreaField
              label="Family Medical History"
              id="familyHistory"
              name="medicalHistory.familyHistory"
              value={formData.medicalHistory.familyHistory}
              onChange={handleInputChange}
              placeholder="Please describe any relevant family medical history"
              rows={4}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Preferences & Consent
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Preferred Pharmacy"
                id="preferredPharmacy"
                name="preferredPharmacy"
                value={formData.preferredPharmacy || ''}
                onChange={handleInputChange}
                placeholder="e.g., CVS Pharmacy"
              />
              <SelectField
                label="Preferred Language"
                id="preferredLanguage"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                options={[
                  { value: 'English', label: 'English' },
                  { value: 'Spanish', label: 'Spanish' },
                  { value: 'French', label: 'French' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Communication Preferences
              </h3>
              <div className="space-y-2">
                <CheckboxField
                  label="Email notifications"
                  id="communicationPreferences.email"
                  name="communicationPreferences.email"
                  checked={formData.communicationPreferences.email}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="SMS/Text messages"
                  id="communicationPreferences.sms"
                  name="communicationPreferences.sms"
                  checked={formData.communicationPreferences.sms}
                  onChange={handleInputChange}
                />
                <CheckboxField
                  label="Phone calls"
                  id="communicationPreferences.phone"
                  name="communicationPreferences.phone"
                  checked={formData.communicationPreferences.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Required Agreements
              </h3>
              <div className="space-y-3">
                <CheckboxField
                  label="I acknowledge and agree to the HIPAA Privacy Notice"
                  id="hipaaAgreement"
                  name="hipaaAgreement"
                  checked={formData.hipaaAgreement}
                  onChange={handleInputChange}
                  error={errors.hipaaAgreement}
                  required
                />
                <CheckboxField
                  label="I agree to the Terms and Conditions"
                  id="termsAndConditions"
                  name="termsAndConditions"
                  checked={formData.termsAndConditions}
                  onChange={handleInputChange}
                  error={errors.termsAndConditions}
                  required
                />
                <CheckboxField
                  label="I agree to the Privacy Policy"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleInputChange}
                  error={errors.privacyPolicy}
                  required
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Patient Registration
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Complete all sections to register a new patient
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-md text-sm font-medium ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-sm font-medium ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          🔒 Your information is secure and protected by industry-standard
          encryption
        </p>
      </div>
    </div>
  );
}
