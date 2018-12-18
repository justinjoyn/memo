import { AntDesign } from '@expo/vector-icons';
import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

class Search extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoading, onFilterPressed, onChangeText } = this.props;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                placeholder={'Search'}
                style={styles.searchText}
                numberOfLines={1}
                onChangeText={onChangeText}
              />
              {isLoading ? (
                <ActivityIndicator
                  animating={this.props.loading}
                  color={'#000'}
                  style={{ paddingHorizontal: 5 }}
                />
              ) : null}
              <TouchableOpacity style={styles.button} onPress={onFilterPressed}>
                <AntDesign name='filter' size={20} color='#000' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {},
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  button: {
    paddingHorizontal: 5
  },
  searchText: {
    fontFamily: 'product-sans-regular',
    fontSize: 16,
    flex: 1
  }
});

export default Search;
