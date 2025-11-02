import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface CustomPickerModalProps {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const CustomPickerModal: React.FC<CustomPickerModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const handleSelect = () => {
    if (selectedValue) {
      onSelect(selectedValue);
    }
  };

  const handleItemPress = (value: string) => {
    onSelect(value);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>
              </View>

              {/* Options List */}
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  const isSelected = selectedValue === item;
                  return (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleItemPress(item)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.itemContent}>
                        <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                          {isSelected && <View style={styles.radioButtonInner} />}
                        </View>
                        <Text style={styles.modalItemText}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                style={styles.listContainer}
                contentContainerStyle={styles.listContentContainer}
              />

              {/* Select Button */}
              <TouchableOpacity
                style={styles.selectButton}
                onPress={handleSelect}
                activeOpacity={0.7}
                disabled={!selectedValue}
              >
                <Text style={[styles.selectButtonText, !selectedValue && styles.selectButtonDisabled]}>
                  Select
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    width: '100%',
    maxWidth: moderateScale(400),
    maxHeight: '80%',
    marginVertical: moderateScale(40),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  modalTitle: {
    fontSize: textScale(18),
    color: colors.black,
    fontWeight: '600',
  },
  closeButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: moderateScale(24),
    color: colors.black,
    fontWeight: '300',
  },
  listContainer: {
    flexGrow: 0,
  },
  listContentContainer: {
    paddingVertical: moderateScale(8),
  },
  modalItem: {
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
  },
  radioButton: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: colors.secondary,
    marginRight: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: colors.primary,
  },
  modalItemText: {
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: '400',
  },
  selectButton: {
    marginTop: moderateScale(16),
    marginHorizontal: moderateScale(24),
    paddingVertical: moderateScale(14),
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: textScale(16),
    color: colors.primary,
    fontWeight: '600',
  },
  selectButtonDisabled: {
    opacity: 0.5,
  },
});

export default CustomPickerModal;

