import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
} from 'react-native';
import Colors from 'cryptoTraker/src/res/colors';
import Http from 'cryptoTraker/src/libs/http';
import CoinMarketItem from './CoinMarketItem';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };

  getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  getMarkest = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);

    this.setState({markets});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;

    this.props.navigation.setOptions({title: coin.symbol});
    this.setState({coin});
    this.getMarkest(coin.id);
  }
  render() {
    const {coin, markets} = this.state;
    //console.log(coin);
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.iconImg}
            source={{uri: this.getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <SectionList
          style={styles.sections}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionsHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketsTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          data={markets}
          horizontal={true}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1 )',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  list : {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sections: {
    maxHeight: 220,
  },
  sectionsHeader: {
    backgroundColor: 'rgba(0,0,0,0.2 )',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
});

export default CoinDetailScreen;
