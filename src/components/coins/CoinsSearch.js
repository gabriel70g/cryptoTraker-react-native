import React, {Component} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import Colors from 'cryptoTraker/src/res/colors';

class CoinsSearch extends Component {
  state = {
    query: '',
  };

  handleText = (query) => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const {query} = this.state;

    return (
      <View>
        <TextInput
          style={[
            styled.textImput,
            Platform.OS === 'ios'
              ? styled.textInputIOS
              : styled.textImpuAndroid,
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder="Search Coin"
          placeholderTextColor="#fff"
        />
      </View>
    );
  }
}

const styled = StyleSheet.create({
  textImput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: '#fff',
    fontSize: 20,
  },
  textImpuAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
