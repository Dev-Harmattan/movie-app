import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getMovieCast, getMovieDetails } from '../api/apiCalls';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import {
  useFonts,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_100Thin,
} from '@expo-google-fonts/poppins';
import { baseImagePath } from '../api/apiPaths';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Star1 } from 'iconsax-react-native';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const MovieDetails = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_100Thin,
  });

  const { movieId } = route.params;
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastsData, setMovieCastData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieDetails = await getMovieDetails(movieId);
        const movieCasts = await getMovieCast(movieId);

        setMovieData(movieDetails);
        setMovieCastData(movieCasts?.cast);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            title={'Movie Details'}
            action={() => navigation.goBack()}
            customFont={!fontsLoaded ? '' : 'Poppins_500Medium'}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <ImageBackground
          style={styles.imageBG}
          source={{ uri: baseImagePath('w780', movieData?.backdrop_path) }}
        >
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}
          >
            <View style={styles.appHeaderContainer}>
              <AppHeader
                title={'Movie Details'}
                action={() => navigation.goBack()}
                customFont={!fontsLoaded ? '' : 'Poppins_500Medium'}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{ uri: baseImagePath('w342', movieData?.poster_path) }}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.timeContainer}>
        <Clock
          size={FONTSIZE.size_20}
          color={COLORS.WhiteRGBA50}
          variant="Outline"
        />
        <Text
          style={[
            styles.runtimeText,
            fontsLoaded && { fontFamily: 'Poppins_500Medium ' },
          ]}
        >
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text
          style={[
            styles.title,
            fontsLoaded && { fontFamily: 'Poppins_400Regular' },
          ]}
        >
          {movieData?.original_title}
        </Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text
                  style={[
                    styles.genreText,
                    fontsLoaded && { fontFamily: 'Poppins_400Regular' },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            );
          })}
        </View>
        <Text
          style={[
            styles.tagline,
            fontsLoaded && { fontFamily: 'Poppins_100Thin' },
          ]}
        >
          {movieData?.tagline}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <Star1 size={FONTSIZE.size_20} color={COLORS.Yellow} variant="Bold" />
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text
          style={[
            styles.descriptionText,
            fontsLoaded && { fontFamily: 'Poppins_300Light' },
          ]}
        >
          {movieData?.overview}
        </Text>
      </View>
      <View>
        <CategoryHeader
          title="Top Cast"
          customFont={!fontsLoaded ? '' : 'Poppins_500Medium'}
        />
        <FlatList
          data={movieCastsData}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => (
            <CastCard
              shouldMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastsData?.length - 1 ? true : false}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subtitle={item.character}
              customFont={!fontsLoaded ? '' : 'Poppins_500Medium'}
            />
          )}
        />
      </View>

      <View>
        <Pressable
          style={styles.buttonBG}
          onPress={() => {
            navigation.push('SeatBooking', {
              BgImage: baseImagePath('w780', movieData.backdrop_path),
              PosterImage: baseImagePath('original', movieData.poster_path),
            });
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { fontFamily: !fontsLoaded ? '' : 'Poppins_500Medium' },
            ]}
          >
            Select Seats
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    // flex: 1,
    backgroundColor: COLORS.Black,
    paddingBottom: SPACING.space_40,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_36 * 2,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 250,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
    gap: SPACING.space_10,
  },
  runtimeText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  title: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_20,
    flexWrap: 'nowrap',
    width: '100%',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    fontSize: FONTSIZE.size_16,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
