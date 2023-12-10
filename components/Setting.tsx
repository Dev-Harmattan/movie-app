import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import {
  ArrowSquareRight,
  DollarSquare,
  Information,
  Profile2User,
  Setting2,
} from 'iconsax-react-native';
import { Icon } from '../util/types';

interface SettingProps {
  icon: Icon;
  heading: string;
  subheading: string;
  subtitle: string;
}

const IconDisplay = (icon: Icon, color: string, size: number, style: any) => {
  let iconToDisplay = null;
  if (icon === Icon.Info) {
    iconToDisplay = (
      <Information style={style} size={size} color={color} variant="Outline" />
    );
  } else if (icon === Icon.Dollar)
    iconToDisplay = (
      <DollarSquare style={style} size={size} color={color} variant="Outline" />
    );
  else if (icon === Icon.Setting) {
    iconToDisplay = (
      <Setting2 style={style} size={size} color={color} variant="Outline" />
    );
  } else if(icon === Icon.User) {
    iconToDisplay = (
      <Profile2User style={style} size={size} color={color} variant="Outline" />
    );
  }

  return iconToDisplay;
};

const Setting = ({ heading, icon, subheading, subtitle }: SettingProps) => {
  return (
    <View style={styles.container}>
      <View>
        {IconDisplay(icon, COLORS.White, FONTSIZE.size_24, styles.iconStyle)}
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{heading}</Text>
        <Text style={styles.subtitle}>{subheading}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <ArrowSquareRight
          size={FONTSIZE.size_24}
          color={COLORS.White}
          variant="Outline"
          style={styles.iconStyle}
        />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitle: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA15,
  },
});
