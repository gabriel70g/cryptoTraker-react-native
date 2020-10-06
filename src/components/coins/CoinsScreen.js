import React, {Component} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import Http from 'cryptoTraker/src/libs/http';
import CoinsItem from './CoinsItem';
import colors from 'cryptoTraker/src/res/colors';
import CoinsSearch from './CoinsSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount = () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState.loading = true;
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.setState({coins: res.data, allCoins: res.data, loading: false});
  };

  handlePress = (coin) => {
    //console.log('go to deteail', this.props);
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  hnadleSearch = (query) => {
    const {allCoins} = this.state;
    const coinFilter = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.setState({coins: coinFilter});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.hnadleSearch} />
        {loading ? (
          <ActivityIndicator style={styles.loader} color="#fff" size="large" />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
    textAlign: 'center',
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
