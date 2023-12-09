import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { dateTemplate } from '../util/types';
import { generateDate, generateSeats, timeArray } from '../util';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { DirectboxDefault } from 'iconsax-react-native';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

const SeatBooKingScreen = ({ navigation, route }) => {
  const { BgImage, PosterImage } = route.params;
  const [dateArray, setDateArray] = useState<dateTemplate[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await SecureStore.setItemAsync(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.PosterImage,
          })
        );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Missing Fields',
        text2: 'Please Select Seats, Date and Time of the Show',
      });
    }
  };

  if (!fontsLoaded)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    );

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View>
        <ImageBackground source={{ uri: BgImage }} style={styles.ImageBG}>
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
        <Text
          style={[
            styles.screenText,
            fontsLoaded && { fontFamily: 'Poppins_500Medium' },
          ]}
        >
          Screen this side
        </Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem, subindex) => {
                  return (
                    <Pressable
                      key={subitem.number}
                      onPress={() => {
                        selectSeat(index, subindex, subitem.number);
                      }}
                    >
                      <DirectboxDefault
                        variant="Outline"
                        color={
                          subitem.taken
                            ? COLORS.Grey
                            : subitem.selected
                            ? COLORS.Orange
                            : COLORS.White
                        }
                        size={FONTSIZE.size_24}
                      />
                    </Pressable>
                  );
                })}
              </View>
            );
          })}

          <View style={styles.seatRadioContainer}>
            <View style={styles.radioContainer}>
              <Ionicons
                name="radio-button-on"
                size={FONTSIZE.size_20}
                color={COLORS.White}
              />
              <Text
                style={[
                  styles.radioText,
                  fontsLoaded && { fontFamily: ' Poppins_500Medium' },
                ]}
              >
                Available
              </Text>
            </View>
            <View style={styles.radioContainer}>
              <Ionicons
                name="radio-button-on"
                size={FONTSIZE.size_20}
                color={COLORS.Grey}
              />

              <Text
                style={[
                  styles.radioText,
                  fontsLoaded && { fontFamily: ' Poppins_500Medium' },
                ]}
              >
                Taken
              </Text>
            </View>
            <View style={styles.radioContainer}>
              <Ionicons
                name="radio-button-on"
                size={FONTSIZE.size_20}
                color={COLORS.Orange}
              />
              <Text
                style={[
                  styles.radioText,
                  fontsLoaded && { fontFamily: ' Poppins_500Medium' },
                ]}
              >
                Selected
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={dateArray}
          keyExtractor={(item) => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                    index == selectedDateIndex
                      ? { backgroundColor: COLORS.Orange }
                      : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      fontsLoaded && { fontFamily: 'Poppins_500Medium' },
                    ]}
                  >
                    {item.date}
                  </Text>
                  <Text
                    style={[
                      styles.dayText,
                      fontsLoaded && { fontFamily: 'Poppins_400Regular' },
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>

      <View style={styles.OutterContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={(item) => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? { marginLeft: SPACING.space_24 }
                      : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                    index == selectedTimeIndex
                      ? { backgroundColor: COLORS.Orange }
                      : {},
                  ]}
                >
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>

      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <Pressable onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SeatBooKingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_24 * 2,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  screenText: {
    textAlign: 'center',
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    // fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    // fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    // fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
});
