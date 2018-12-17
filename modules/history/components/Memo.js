import { Ionicons } from '@expo/vector-icons';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class Memo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle} />
        <Text style={styles.subTitle} />
        <View style={styles.card}>
          <View style={styles.cardBody} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 10
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: 255
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  cardTitle: {
    paddingHorizontal: 10,
    fontFamily: 'product-sans-regular',
    fontSize: 16
  },
  subTitle: {
    paddingHorizontal: 10,
    fontFamily: 'product-sans-regular',
    fontSize: 12
  }
});

export default Memo;
