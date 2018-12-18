import { AntDesign } from '@expo/vector-icons';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class Memo extends PureComponent {
  constructor(props) {
    super(props);
  }

  getDate() {
    let millis = this.props.memo.updated ? this.props.memo.updated : this.props.memo.created;
    return `Last edited at ${format(parse(millis), 'h:mm A D-M-YY')}`;
  }

  render() {
    const { memo, onEditPressed, onOpenImagePressed } = this.props;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{memo.title}</Text>
            <Text style={styles.with}>with {memo.with}</Text>
            <Text style={styles.description}>{memo.description}</Text>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={() => onEditPressed(memo)}>
                <AntDesign name='edit' size={12} color='#FFF' />
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              {memo.image ? (
                <TouchableOpacity style={styles.button} onPress={() => onOpenImagePressed(memo)}>
                  <AntDesign name='picture' size={12} color='#FFF' />
                  <Text style={styles.buttonText}>Image</Text>
                </TouchableOpacity>
              ) : null}
              <Text style={styles.date}>{this.getDate()}</Text>
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
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#EFEFEF'
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  cardTitle: {
    fontFamily: 'product-sans-regular',
    fontSize: 16
  },
  with: {
    fontFamily: 'product-sans-regular',
    fontSize: 10
  },
  date: {
    fontFamily: 'product-sans-regular',
    fontSize: 10,
    color: '#CCC',
    textAlign: 'right',
    flex: 1
  },
  description: {
    fontFamily: 'product-sans-regular',
    fontSize: 14,
    marginVertical: 10
  },
  button: {
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#448AFF',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  buttonText: {
    fontFamily: 'product-sans-regular',
    fontSize: 12,
    marginHorizontal: 5,
    color: '#FFF'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});

export default Memo;
