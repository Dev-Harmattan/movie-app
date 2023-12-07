import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../util/types';
import { baseImagePath } from '../api/apiPaths';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface SubMovieCardProps {
  item: Movie;
  handleCardPress: () => void;
  shouldMarginAtEnd: boolean;
  shouldMarginAround: boolean;
  isFirst: boolean;
  isLast: boolean;
  cardWidth: number;
  customFont: string;
}

const SubMovieCard = ({
  item,
  handleCardPress,
  shouldMarginAround,
  shouldMarginAtEnd,
  isFirst,
  isLast,
  cardWidth,
  customFont,
}: SubMovieCardProps) => {
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
          source={{ uri: baseImagePath('w342', item.poster_path) }}
        />
        <Text
          numberOfLines={1}
          style={[styles.textTitle, { fontFamily: customFont }]}
        >
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default SubMovieCard;

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
});
