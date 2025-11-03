import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../constants/navigationStrings';
import { View } from 'react-native';
import FarmerHomeScreen from '../screens/FarmerHome/FarmerHome';
import LandDetails from '../screens/LandDetails/LandDetails';
import CropDetails from '../screens/CropDetails/CropDetails';
import FlowerDetails from '../screens/FlowerDetails/FlowerDetails';
import BeekeepingDetails from '../screens/BeekeepingDetails/BeekeepingDetails';
import CurrentLocation from '../screens/CurrentLocation/CurrentLocation';

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {true ? (
          <>
          <Stack.Screen
            name={navigationStrings.FARMERHOME}
            component={FarmerHomeScreen}
          />
          <Stack.Screen
            name={navigationStrings.LAND_DETAILS}
            component={LandDetails}
          />
          <Stack.Screen
            name={navigationStrings.CROP_DETAILS}
            component={CropDetails}
          />
          <Stack.Screen
            name={navigationStrings.FLOWER_DETAILS}
            component={FlowerDetails}
          />
          <Stack.Screen
            name={navigationStrings.BEEKEEPING_DETAILS}
            component={BeekeepingDetails}
          />
          <Stack.Screen
            name={navigationStrings.CURRENT_LOCATION}
            component={CurrentLocation}
          />
          </>
        ) : (
          <View/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
