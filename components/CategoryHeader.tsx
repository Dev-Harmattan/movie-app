import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { COLORS, SPACING } from '../theme/theme';

interface CategoryHeaderProps {
  title: string;
  customFont: string;
}

const CategoryHeader = ({ title, customFont }: CategoryHeaderProps) => {
  return <Text style={[styles.text, { fontFamily: customFont }]}>{title}</Text>;
};

export default CategoryHeader;

const styles = StyleSheet.create({
  text: {
    color: COLORS.White,
    fontSize: SPACING.space_20,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_28,
  },
});
