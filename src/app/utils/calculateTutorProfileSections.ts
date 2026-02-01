/* eslint-disable @typescript-eslint/no-explicit-any */
export const profileSectionWeights = {
  profilePicture: 5,
  personalInformation: 20,
  educationalInformation: 30,
  tuitionPreference: 25,
  emergencyInformation: 5,
  identityInformation: 15, // credentials
};

// Utility to check if value is non-empty
export const isNonEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return false;

  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return value !== 0;
  if (Array.isArray(value)) return value.some((v) => isNonEmpty(v));

  // Treat Date as non-empty
  if (value instanceof Date) return true;

  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return false;
    return keys.some((k) => isNonEmpty(value[k]));
  }

  return true;
};

// Main calculation function
export const calculateProfileSections = (tutor: any) => {
  let total = 0;

  // 1. Profile Picture
  if (isNonEmpty(tutor.imageUrl)) {
    total += profileSectionWeights.profilePicture;
  }

  // 2. Personal Information
  const personal = tutor.personalInformation || {};
  const personalFields = [
    "overview",
    "additionalPhoneNumber",
    "address",
    "dateOfBirth",
    "fatherName",
    "motherName",
    "fatherPhoneNumber",
    "motherPhoneNumber",
    "nationality",
    "religion",
  ];
  const personalFilled = personalFields.filter((f) =>
    isNonEmpty(personal[f])
  ).length;
  total +=
    (personalFilled / personalFields.length) *
    profileSectionWeights.personalInformation;

  // 3. Educational Information
  const edu = tutor.educationalInformation || [];
  const maxEduItems = 3; // max 3 entries = 30%
  if (Array.isArray(edu) && edu.length > 0) {
    const eduCount = Math.min(edu.length, maxEduItems);
    total +=
      (eduCount / maxEduItems) * profileSectionWeights.educationalInformation;
  }

  // 4. Tuition Preference
  const tuition = tutor.tuitionPreference || {};
  const tuitionFields = [
    "availableDays",
    "expectedSalary",
    "tuitionStyle",
    "preferredCategories",
    "preferredClasses",
    "preferredSubjects",
    "preferredCities",
    "preferredLocations",
    "placeOfTuition",
    "tutoringMethod",
    "availableTime",
  ];
  const tuitionFilled = tuitionFields.filter((f) =>
    isNonEmpty(tuition[f])
  ).length;
  total +=
    (tuitionFilled / tuitionFields.length) *
    profileSectionWeights.tuitionPreference;

  // 5. Emergency Information
  const emergency = tutor.emergencyInformation || {};
  const emergencyFields = [
    "emergencyContactPersonName",
    "phoneNumber",
    "relation",
    "address",
  ];
  const emergencyFilled = emergencyFields.filter((f) =>
    isNonEmpty(emergency[f])
  ).length;
  total +=
    (emergencyFilled / emergencyFields.length) *
    profileSectionWeights.emergencyInformation;

  // 6. Credentials / Identity Information (proportional)
  const identity = tutor.identityInformation || [];
  const maxIdentityItems = 3; // max 3 files = full 15%
  if (Array.isArray(identity) && identity.length > 0) {
    const validFiles = identity.filter((i) => isNonEmpty(i.file)).length;
    const identityCount = Math.min(validFiles, maxIdentityItems);
    total +=
      (identityCount / maxIdentityItems) *
      profileSectionWeights.identityInformation;
  }

  return Math.round(total);
};