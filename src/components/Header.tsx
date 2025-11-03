import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import Imagepath from '../constants/Imagepath';
import { moderateScale } from 'react-native-size-matters';
import colors from '../constants/colors';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const Header = ({ headerStyle }: { headerStyle?: StyleProp<ViewStyle> }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.header, headerStyle]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FastImage
          // resizeMode="contain"
          style={styles.arrowIcon}
          source={Imagepath.arrowLeft}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Blooming Report</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(36),
  },
  arrowIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: moderateScale(6),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: 'semibold',

    color: colors.black,
  },
});

export default Header;
