import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import SubMovieCard from '../components/SubMovieCard';
import { searchMovies } from '../api/apiCalls';
import SearchInput from '../components/SearchInput';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('screen');

const SearchScreen = ({ navigation }) => {
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const callSearchFn = async () => {
    setIsLoading(true);
    try {
      const { results } = await searchMovies(searchText);
      setSearchList(results);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <SearchInput
            handleSearch={(text) => setSearchText(text)}
            handleGoToSearch={callSearchFn}
            placeHolder="Search your Movies..."
            customFont={'Poppins_400Regular'}
          />
        </View>
        {!isLoading && searchList.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.noItem}>No Movies Found! Please Search.</Text>
          </View>
        ) : (
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={searchList}
            bounces={false}
            renderItem={({ item, index }) => (
              <SubMovieCard
                item={item}
                key={index}
                shouldMarginAtEnd={false}
                shouldMarginAround={true}
                handleCardPress={() => {
                  navigation.navigate('MovieDetails', { movieId: item.id });
                }}
                cardWidth={width / 2 - SPACING.space_12 * 2}
                customFont={'Poppins_400Regular'}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  inputContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_45,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  listContainer: {
    marginVertical: SPACING.space_12,
  },
  loading: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  noItem: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_13,
  },
});
