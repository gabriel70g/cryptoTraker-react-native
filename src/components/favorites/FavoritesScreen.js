import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FavoritesEnmpyState from './FavoritesEnmpyState';
import Colors from 'cryptoTraker/src/res/colors';

class FavoritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavoritesEnmpyState />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
  },
});

export default FavoritesScreen;
