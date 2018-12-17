import React, { Component } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActivityLoader from '../../common/ActivityLoader';
import { getMemos } from '../actions';
import Memo from './Memo';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memos: []
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      memos: props.memos
    };
  }

  componentDidMount() {
    if (this.props.memos.length === 0) this.props.getMemos();
  }

  _renderHeader() {
    return (
      <View>
        <Text style={styles.pageTitle}>Memo</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMemos
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  memos: state.history.history.data,
  isLoading: state.history.history.isLoading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF'
  },
  pageTitle: {
    fontFamily: 'product-sans-regular',
    padding: 10,
    fontSize: 40
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF'
  },
  sectionTitle: {
    fontFamily: 'product-sans-regular',
    padding: 10,
    fontSize: 22
  }
});
