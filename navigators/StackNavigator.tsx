import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import MovieDetails from '../screens/MovieDetails';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{ animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
