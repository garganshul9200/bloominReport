import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CustomDateInputProps {
  label: string;
  placeholder: string;
  value: Date | null;
  onChange: (date: Date) => void;
  onPress: () => void;
  showModal: boolean;
  onClose: () => void;
  disabled?: boolean;
  minimumDate?: Date | null;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onPress,
  showModal,
  onClose,
  disabled = false,
  minimumDate = null,
}) => {

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[date.getMonth()];
    // Calculate which week of the month (1-4 or 5)
    const dayOfMonth = date.getDate();
    const week = Math.ceil(dayOfMonth / 7);
    return `${month}, Week ${week}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        onChange(selectedDate);
      }
    }
  };

  const handleDone = () => {
    onClose();
  };

  const displayValue = value ? formatDate(value) : '';

  return (
    <>
      <View style={styles.dateInputContainer}>
        <Text style={styles.dateLabel}>{label}</Text>
        <View style={[styles.inputRow, disabled && styles.disabledRow]}>
          <TouchableOpacity
            style={[styles.dateInput, disabled && styles.disabledInput]}
            onPress={disabled ? undefined : onPress}
            activeOpacity={disabled ? 1 : 0.7}
            disabled={disabled}
          >
            <Text style={[styles.dateText, !value && styles.placeholderText, disabled && styles.disabledText]}>
              {displayValue || placeholder}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.calendarButton, disabled && styles.disabledButton]}
            onPress={disabled ? undefined : onPress}
            activeOpacity={disabled ? 1 : 0.7}
            disabled={disabled}
          >
            <Text style={[styles.calendarIcon, disabled && styles.disabledIcon]}>📅</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                {Platform.OS === 'ios' ? (
                  <>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onClose}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.doneButton}
                        onPress={handleDone}
                      >
                        <Text style={styles.doneButtonText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={value || new Date()}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      minimumDate={minimumDate || undefined}
                      maximumDate={undefined}
                      style={styles.iosPicker}
                    />
                  </>
                ) : (
                  <View style={styles.androidPickerContainer}>
                    <DateTimePicker
                      value={value || new Date()}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      minimumDate={minimumDate || undefined}
                      maximumDate={undefined}
                    />
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: textScale(14),
    color: colors.black,
    marginBottom: moderateScale(8),
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    minHeight: moderateScale(48),
  },
  dateInput: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
    minHeight: moderateScale(48),
  },
  calendarButton: {
    width: moderateScale(48),
    minHeight: moderateScale(48),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: moderateScale(20),
  },
  dateText: {
    fontSize: moderateScale(14),
    color: colors.black,
  },
  placeholderText: {
    color: colors.placeholderColor,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    width: '90%',
    maxWidth: moderateScale(400),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    paddingBottom: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  cancelButton: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
  },
  cancelButtonText: {
    fontSize: textScale(16),
    color: colors.primary,
    fontWeight: '600',
  },
  doneButton: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
  },
  doneButtonText: {
    fontSize: textScale(16),
    color: colors.primary,
    fontWeight: '600',
  },
  iosPicker: {
    width: '100%',
    height: moderateScale(200),
  },
  androidPickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledRow: {
    opacity: 0.5,
  },
  disabledInput: {
    backgroundColor: colors.bgColor,
  },
  disabledButton: {
    backgroundColor: colors.bgColor,
  },
  disabledText: {
    color: colors.placeholderColor,
  },
  disabledIcon: {
    opacity: 0.5,
  },
});

export default CustomDateInput;
