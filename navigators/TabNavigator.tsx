import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeHashtag,
  SearchNormal,
  Ticket,
  UserEdit,
} from 'iconsax-react-native';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          marginTop: 0,
          height: SPACING.space_9 * 10,
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused }) => {
          let labelStyle = {
            color: focused ? COLORS.Orange : COLORS.White,
            fontSize: FONTSIZE.size_13,
          };
          return <Text style={labelStyle}>{route.name}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeHashtag
                size={FONTSIZE.size_30}
                color={COLORS.Orange}
                variant="Bold"
              />
            ) : (
              <HomeHashtag
                size={FONTSIZE.size_30}
                color={COLORS.White}
                variant="Outline"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SearchNormal
                size={FONTSIZE.size_30}
                color={COLORS.Orange}
                variant="Bold"
              />
            ) : (
              <SearchNormal
                size={FONTSIZE.size_30}
                color={COLORS.White}
                variant="Outline"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ticket
                size={FONTSIZE.size_30}
                color={COLORS.Orange}
                variant="Bold"
              />
            ) : (
              <Ticket
                size={FONTSIZE.size_30}
                color={COLORS.White}
                variant="Outline"
              />
            ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <UserEdit
                size={FONTSIZE.size_30}
                color={COLORS.Orange}
                variant="Bold"
              />
            ) : (
              <UserEdit
                size={FONTSIZE.size_30}
                color={COLORS.White}
                variant="Outline"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
