import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { useFonts } from 'expo-font';

import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import SearchInput from '../components/SearchInput';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '../api/apiCalls';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import { StatusBar } from 'expo-status-bar';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [upComingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    (async () => {
      const { results: nowPlayingMovies } = await getNowPlayingMovies();
      setNowPlayingMoviesList([
        { id: 'movieId1' },
        ...nowPlayingMovies,
        { id: 'movieId2' },
      ]);

      const { results: popularMovies } = await getPopularMovies();
      setPopularMoviesList(popularMovies);

      const { results: upComingMovies } = await getUpcomingMovies();
      setUpcomingMoviesList(upComingMovies);
    })();
  }, []);

  if (
    !nowPlayingMoviesList ||
    !upComingMoviesList ||
    !popularMoviesList ||
    !fontsLoaded
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.containerStyle}
      >
        <View style={styles.inputContainer}>
          <SearchInput
            handleGoToSearch={(text) => navigation.navigate('Search')}
            handleSearch={() => {}}
            placeHolder="Search your Movies..."
            customFont={'Poppins-Regular'}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      // contentContainerStyle={styles.containerStyle}
    >
      {/* <StatusBar hidden /> */}
      <View style={styles.inputContainer}>
        <SearchInput
          handleSearch={() => navigation.navigate('Search')}
          handleGoToSearch={(text) => navigation.navigate('Search')}
          placeHolder="Search your Movies..."
          customFont={'Poppins-Regular'}
        />
      </View>

      <CategoryHeader title="Now Playing" customFont="Poppins-Semibold" />
      <FlatList
        horizontal
        keyExtractor={(item) => item.id}
        bounces={false}
        snapToInterval={width * 0.4 + SPACING.space_36}
        decelerationRate={0}
        data={nowPlayingMoviesList}
        renderItem={({ item, index }) => {
          if (!item.original_title) {
            return (
              <View
                key={index}
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36)) / 2,
                }}
              ></View>
            );
          }
          return (
            <MovieCard
              item={item}
              key={index}
              shouldMarginAtEnd={true}
              shouldMarginAround={true}
              handleCardPress={() => {
                navigation.navigate('MovieDetails', { movieId: item.id });
              }}
              cardWidth={width * 0.7}
              isFirst={index === 0}
              isLast={index === nowPlayingMoviesList?.length - 1}
              customFont={'Poppins-Regular'}
            />
          );
        }}
      />
      <CategoryHeader title="Popular" customFont="Poppins-Semibold" />
      <FlatList
        horizontal
        keyExtractor={(item) => item.id}
        data={popularMoviesList}
        bounces={false}
        renderItem={({ item, index }) => (
          <SubMovieCard
            item={item}
            key={index}
            shouldMarginAtEnd={true}
            shouldMarginAround={true}
            handleCardPress={() => {
              navigation.navigate('MovieDetails', { movieId: item.id });
            }}
            cardWidth={width / 3}
            isFirst={index === 0}
            isLast={index === popularMoviesList?.length - 1}
            customFont={'Poppins-Regular'}
          />
        )}
      />
      <CategoryHeader title="Upcoming" customFont="Poppins-Semibold" />
      <FlatList
        horizontal
        keyExtractor={(item) => item.id}
        data={upComingMoviesList}
        bounces={false}
        renderItem={({ item, index }) => (
          <SubMovieCard
            item={item}
            key={index}
            shouldMarginAtEnd={true}
            shouldMarginAround={true}
            handleCardPress={() => {
              navigation.navigate('MovieDetails', { movieId: item.id });
            }}
            cardWidth={width / 3}
            isFirst={index === 0}
            isLast={index === upComingMoviesList?.length - 1}
            customFont={'Poppins-Regular'}
          />
        )}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  containerStyle: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_45,
  },
});
