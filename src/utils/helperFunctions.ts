// import { useTranslation } from 'react-i18next';
import { Alert, Linking, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { moderateVerticalScale } from 'react-native-size-matters';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// export const useChangeLanguage = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lng:string) => {
//     i18n.changeLanguage(lng);
//   };

//   return changeLanguage;
// };

// export const setStorage = (key: string, value: any) => {
//   storage.set(key, value);
// };
// export const getStorage = (key: string) => {
//   storage.getString(key);
// };

export const ShowError = (message: any) => {
  console.log(message, 'THIS IS MESSAGE');
  showMessage({
    type: 'danger',
    icon: 'danger',
    floating: true,
    animated: true,
    message,
    style: { marginTop: moderateVerticalScale(16) },
  });
  // Toast.show(message);
};

export const showSuccess = (message: any) => {
  showMessage({
    type: 'success',
    icon: 'success',
    floating: true,
    animated: true,
    style: { marginTop: moderateVerticalScale(16) },
    message,
  });

  // Toast.show(message);
};
export const showInfo = (message: any) => {
  showMessage({
    type: 'info',
    icon: 'info',
    message,
  });
  // Toast.show(message);
};

export const makePhoneCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
};

// Function to send an email
export const sendEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};

// Function to send a text message
export const sendTextMessage = (phoneNumber: string) => {
  phoneNumber = `sms:${phoneNumber}`;
  Linking.openURL(phoneNumber);
};

// Function to send a WhatsApp message
export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  const url = `https://wa.me/91${phoneNumber}?text=${message})`;
  Linking.openURL(url);
};

export function getImageUrl(
  url1: string,
  url2: string,
  dimensions: string,
): string {
  return `${url1}${dimensions}${url2}`;
}
export const removeItemFromData = (data: any[], item: any): any[] => {
  return data.filter(currentItem => currentItem.id !== item.id);
};
// export const sessionHandler = () => {
//   onLogOut()
// };

export function areLastTwoDigitsNumbers(str: string) {
  return /^\d{2}$/.test(str.slice(-2));
}
export function areLastTwoAlphabets(str: string) {
  return /^[a-zA-Z]{2}$/.test(str.slice(-2));
}

// export const pickImageFromCamera = async () => {
//   const permission = await androidCameraPermission();
//   if (!permission) {
//     showError(permission)
//     return;
//   }
//   const result = await launchCamera({
//     mediaType: 'photo',
//     quality: 1,
//   });
//   console.log(result,'resultresult')

//   if (result.assets && result.assets.length > 0) {
//     return result.assets[0]
//   }
// }

export const pickImageFromGallery = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 1,
  });

  if (result.assets && result.assets.length > 0) {
    return result.assets[0] as any;
  }
};

// Validation utility types
export type ValidationRule = {
  value: string | number | boolean | undefined | null | object;
  fieldName: string;
  customMessage?: string;
  customValidator?: (value: any) => boolean;
  skipIfEmpty?: boolean;
};

/**
 * Common validation function to validate multiple fields at once
 * @param rules Array of validation rules
 * @returns true if all validations pass, false otherwise
 * @example
 * const isValid = validateFields([
 *   { value: fullName, fieldName: 'full name' },
 *   { value: contactNumber, fieldName: 'contact number' },
 *   { value: gender, fieldName: 'gender' },
 * ]);
 */
export const validateFields = (rules: ValidationRule[]): boolean => {
  for (const rule of rules) {
    const { value, fieldName, customMessage, customValidator, skipIfEmpty } =
      rule;

    // Skip validation if value is empty and skipIfEmpty is true
    if (skipIfEmpty && (!value || (typeof value === 'string' && !value.trim()))) {
      continue;
    }

    // Use custom validator if provided
    if (customValidator) {
      if (!customValidator(value)) {
        ShowError(customMessage || `Please enter ${fieldName}`);
        return false;
      }
      continue;
    }

    // Default validation: check if value is empty
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (typeof value === 'string' && !value.trim())
    ) {
      ShowError(customMessage || `Please enter ${fieldName}`);
      return false;
    }

    // For objects, check if they have required properties
    if (typeof value === 'object' && !Array.isArray(value)) {
      const obj = value as Record<string, any>;
      const requiredKeys = Object.keys(obj).filter(
        key => !obj[key] || (typeof obj[key] === 'string' && !obj[key].trim())
      );
      if (requiredKeys.length > 0) {
        ShowError(customMessage || `Please enter ${fieldName}`);
        return false;
      }
    }
  }

  return true;
};

/**
 * Validates location data object
 * @param locationData Object containing location fields
 * @param requiredFields Array of required field names
 * @returns true if validation passes, false otherwise
 */
export const validateLocationData = (
  locationData: Record<string, string>,
  requiredFields: string[],
): boolean => {
  for (const field of requiredFields) {
    if (!locationData[field] || !locationData[field].trim()) {
      ShowError(`Please enter ${field}`);
      return false;
    }
  }
  return true;
};
