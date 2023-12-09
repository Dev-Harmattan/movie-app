import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../util/types';
import { baseImagePath } from '../api/apiPaths';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface MovieCardProps {
  item: Movie;
  handleCardPress: () => void;
  shouldMarginAtEnd: boolean;
  shouldMarginAround: boolean;
  isFirst: boolean;
  isLast: boolean;
  cardWidth: number;
  customFont: string;
}

const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const MovieCard = ({
  item,
  handleCardPress,
  shouldMarginAround,
  shouldMarginAtEnd,
  isFirst,
  isLast,
  cardWidth,
  customFont,
}: MovieCardProps) => {
  const LeftOrRightEndMargin = shouldMarginAtEnd
    ? isFirst
      ? { marginLeft: SPACING.space_36 }
      : isLast
      ? { marginRight: SPACING.space_36 }
      : {}
    : {};

  return (
    <Pressable onPress={handleCardPress}>
      <View
        style={[
          styles.container,
          LeftOrRightEndMargin,
          shouldMarginAround && { margin: SPACING.space_12 },
          { maxWidth: cardWidth },
        ]}
      >
        <Image
          style={[styles.cardImage, { width: cardWidth }]}
          source={{
            uri: baseImagePath('w780', item.poster_path),
          }}
        />
        <Text
          numberOfLines={1}
          style={[styles.textTitle, { fontFamily: customFont }]}
        >
          {item.title}
        </Text>

        <View style={styles.genreContainer}>
          {item.genre_ids.slice(1, 4).map((item: number) => {
            return (
              <View key={item} style={styles.genreBox}>
                <Text style={[styles.genreText, { fontFamily: customFont }]}>
                  {genres[item]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_25,
  },
  textTitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'center',
    marginVertical: SPACING.space_10,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
});
