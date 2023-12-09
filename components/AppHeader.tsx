import { CloseSquare } from 'iconsax-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

const AppHeader = ({
  title,
  customFont,
  action,
}: {
  title: string;
  customFont: string;
  action: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={action} style={styles.iconBG}>
        <CloseSquare
          size={SPACING.space_24}
          color={COLORS.White}
          variant="Outline"
        />
      </Pressable>
      <Text style={[styles.text, { fontFamily: customFont }]}>{title}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLORS.White,
  },
  iconBG: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
});
