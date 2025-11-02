import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import { textScale } from '../styles/responsiveSize';

interface PhotoUploadProps {
  label: string;
  instructionText?: string;
  number?: number;
  required?: boolean;
  onPhotosSelected?: (photos: string[]) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  label,
  instructionText,
  number,
  required = false,
  onPhotosSelected,
}) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const displayLabel = number
    ? `${number}. ${label}${required ? '*' : ''}`
    : `${label}${required ? '*' : ''}`;

  const handleAddPhotos = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      selectionLimit: 10,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const newPhotos = response.assets.map(asset => asset.uri || '');
        const updatedPhotos = [...photos, ...newPhotos];
        setPhotos(updatedPhotos);
        if (onPhotosSelected) {
          onPhotosSelected(updatedPhotos);
        }
      }
    });
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    if (onPhotosSelected) {
      onPhotosSelected(updatedPhotos);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{displayLabel}</Text>
      {instructionText && (
        <Text style={styles.instructionText}>{instructionText}</Text>
      )}
      
      <View style={styles.uploadArea}>
        {photos.length === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPhotos}
            activeOpacity={0.8}
          >
            <Text style={styles.plusIcon}>+</Text>
            <Text style={styles.addButtonText}>Add Photos</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoWrapper}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {photos.length < 10 && (
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={handleAddPhotos}
                activeOpacity={0.8}
              >
                <Text style={styles.addMorePlusIcon}>+</Text>
                <Text style={styles.addMoreText}>Add More</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: moderateScale(16),
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(24),
  },
  label: {
    fontSize: textScale(16),
    color: colors.black,
    marginBottom: moderateScale(8),
    fontWeight: '400',
  },
  instructionText: {
    fontSize: textScale(14),
    color: colors.black,
    marginBottom: moderateScale(12),
    fontWeight: '400',
  },
  uploadArea: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.secondary,
    borderRadius: moderateScale(8),
    backgroundColor: colors.bgColor,
    minHeight: moderateScale(200),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
  },
  plusIcon: {
    fontSize: moderateScale(20),
    color: colors.white,
    fontWeight: '300',
    marginRight: moderateScale(8),
  },
  addButtonText: {
    fontSize: textScale(16),
    color: colors.white,
    fontWeight: '600',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  photoWrapper: {
    width: moderateScale(100),
    height: moderateScale(100),
    position: 'relative',
    marginRight: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: moderateScale(-8),
    right: moderateScale(-8),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    lineHeight: moderateScale(20),
  },
  addMoreButton: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.secondary,
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMorePlusIcon: {
    fontSize: moderateScale(20),
    color: colors.black,
    fontWeight: '300',
    marginBottom: moderateScale(4),
  },
  addMoreText: {
    fontSize: textScale(12),
    color: colors.black,
    fontWeight: '400',
  },
});

export default PhotoUpload;

