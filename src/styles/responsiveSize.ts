import { Dimensions, Platform, StatusBar } from "react-native";

export const textScale = (percent:any) => {
    const screenHeight = Dimensions.get('window').height;
    //calculate absolute ratio for bigger screens 18.5:9 requiring smaller scaling
    const ratio =
      Dimensions.get('window').height / Dimensions.get('window').width;
    //Guideline sizes are based on standard ~5″ screen mobile device
    const deviceHeight = 375
      ? screenHeight * (ratio > 1.8 ? 0.14 : 0.15) //Set guideline depending on absolute ratio
      : Platform.OS === 'android'
      ? screenHeight - (StatusBar.currentHeight||0)
      : screenHeight;
  
    const heightPercent = (percent * deviceHeight) / 100;
    return Math.round(heightPercent);
  };

  export const {width,height}=Dimensions.get('window');