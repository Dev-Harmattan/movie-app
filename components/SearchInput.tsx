import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { SearchFavorite } from 'iconsax-react-native';

interface SearchInputProps {
  placeHolder: string;
  handleSearch: (value: string) => void;
  customFont: string;
}

const SearchInput = ({
  handleSearch,
  placeHolder,
  customFont,
}: SearchInputProps) => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeHolder}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        placeholderTextColor={COLORS.WhiteRGBA32}
        style={[styles.searchInput, { fontFamily: customFont }]}
        keyboardType='web-search'
      />
      <Pressable
        onPress={() => handleSearch(searchText)}
        style={({ pressed }) => [pressed && { opacity: 0.8 }]}
      >
        <SearchFavorite size="20" color={COLORS.Orange} variant="Outline" />
      </Pressable>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_8,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    borderWidth: 2,
    gap: 5,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: FONTSIZE.size_14,
    fontWeight: '400',
    color: COLORS.White,
  },
});
