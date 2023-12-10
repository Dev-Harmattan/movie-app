import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import Setting from '../components/Setting';
import { Icon } from '../util/types';
// import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          customFont=""
          title={'My Profile'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>

      <View style={styles.profileContainer}>
        <Setting
          icon={Icon.User}
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <Setting
          icon={Icon.Setting}
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <Setting
          icon={Icon.Dollar}
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <Setting
          icon={Icon.Info}
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_36,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
});

export default UserAccountScreen;
