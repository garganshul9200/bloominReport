import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';
import CustomCheckbox from './CustomCheckbox';

interface FertilizerOption {
  id: string;
  label: string;
  examples: string[];
}

interface MultiSelectModalProps {
  visible: boolean;
  title: string;
  options: FertilizerOption[];
  selectedValues: string[];
  onSelect: (selectedValues: string[]) => void;
  onClose: () => void;
}

const MultiSelectModal: React.FC<MultiSelectModalProps> = ({
  visible,
  title,
  options,
  selectedValues,
  onSelect,
  onClose,
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);

  useEffect(() => {
    setTempSelected(selectedValues);
  }, [selectedValues, visible]);

  const handleToggle = (id: string) => {
    setTempSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelect = () => {
    onSelect(tempSelected);
    onClose();
  };

  const getOptionLabel = (id: string): string => {
    const option = options.find(opt => opt.id === id);
    return option?.label || id;
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
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
            >
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
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  const isSelected = tempSelected.includes(item.id);
                  return (
                    <View style={styles.modalItem}>
                      <CustomCheckbox
                        label={item.label}
                        subLabel={item.examples.join(', ')}
                        checked={isSelected}
                        onPress={() => handleToggle(item.id)}
                        style={styles.itemContent}
                      />
                    </View>
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
              >
                <Text style={styles.selectButtonText}>Select</Text>
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
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  itemContent: {
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
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
});

export default MultiSelectModal;

