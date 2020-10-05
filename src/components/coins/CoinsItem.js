import React from 'react';
import {View, Pressable, Text, StyleSheet, Image, Platform} from 'react-native';
import colors from 'cryptoTraker/src/res/colors';

const CoinsItem = ({item, onPress}) => {
  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTraker/src/assets/arrow_up.png');
    } else {
      return require('cryptoTraker/src/assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.name}</Text>
        <Text style={styles.nameText}>{item.symbol}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imagIcon} source={getImgArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 12,
  },
  imagIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
