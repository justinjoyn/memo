import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMemos } from '../actions';
import Memo from './Memo';
import Search from './Search';

class History extends Component {
  constructor(props) {
    super(props);
    this.searchTimeoutId = null;
    this.state = {
      memos: [],
      imageModalVisible: false,
      image: null,
      filterModalVisible: false,
      searchText: '',
      searchFromDate: '',
      searchToDate: '',
      searchWith: ''
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      memos: [{ objectId: 'search' }, ...props.memos]
    };
  }

  onAddPressed() {
    this.props.navigation.navigate('Create');
  }

  onEditPressed(memo) {
    this.props.navigation.navigate('Create', { memo: memo });
  }

  onOpenImagePressed(memo) {
    this.setState({
      image: memo.image,
      imageModalVisible: true
    });
  }

  onFilterPressed() {
    this.setState({
      filterModalVisible: true
    });
  }

  getSearchQuery() {
    let where = [];

    if (this.state.searchText)
      where.push(
        "title LIKE '" +
          this.state.searchText +
          "' OR description LIKE '" +
          this.state.searchText +
          "'"
      );
    if (this.state.searchWith) where.push("with LIKE '" + this.state.searchWith + "'");
    if (this.state.searchFromDate) where.push("created >= '" + this.state.searchFromDate + "'");
    if (this.state.searchToDate) where.push("created <= '" + this.state.searchToDate + "'");

    return where.join(' AND ');
  }

  searchMemo() {
    this.setState({ filterModalVisible: false });
    this.props.getMemos({
      pageSize: 100,
      offset: 0,
      sortBy: 'created desc',
      where: this.getSearchQuery()
    });
  }

  onChangeText(data) {
    this.setState({ searchText: data });
    if (this.searchTimeoutId) clearTimeout(this.searchTimeoutId);
    this.searchTimeoutId = setTimeout(this.searchMemo.bind(this), 2000);
  }

  _renderHeader() {
    return <Text style={styles.pageTitle}>Memo</Text>;
  }

  _renderSearchBar() {
    if (this.state.memos.length === 1)
      return (
        <View>
          <Search
            isLoading={this.props.isLoading}
            onFilterPressed={this.onFilterPressed.bind(this)}
            onChangeText={this.onChangeText.bind(this)}
          />
          <TouchableOpacity style={styles.emptyView} onPress={this.onAddPressed.bind(this)}>
            <AntDesign name='addfile' size={42} color='#CCC' />
            <Text style={styles.emptyText}>
              You haven't created any memo yet. Why don't you add one now!
            </Text>
          </TouchableOpacity>
        </View>
      );
    return (
      <Search
        isLoading={this.props.isLoading}
        onFilterPressed={this.onFilterPressed.bind(this)}
        onChangeText={this.onChangeText.bind(this)}
      />
    );
  }

  _renderItem(item) {
    if (item.objectId === 'search') return this._renderSearchBar();
    return (
      <Memo
        memo={item}
        onEditPressed={this.onEditPressed.bind(this)}
        onOpenImagePressed={this.onOpenImagePressed.bind(this)}
      />
    );
  }

  _keyExtractor = (item, index) => item.objectId;

  renderImageModal() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.imageModalVisible}
        onRequestClose={() => this.setState({ image: null, imageModalVisible: false })}>
        <View style={styles.modal}>
          <Image
            source={{ uri: this.state.image }}
            style={styles.imagePreview}
            resizeMode={'contain'}
          />
        </View>
      </Modal>
    );
  }

  renderFilterModal() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.filterModalVisible}
        onRequestClose={() => this.setState({ image: null, filterModalVisible: false })}>
        <View style={styles.modal}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Filter Search</Text>
            <Text style={styles.labelText}>With</Text>
            <TextInput
              value={this.state.searchWith}
              onChangeText={text => this.setState({ searchWith: text })}
              placeholder={'John Doe'}
              style={styles.inputText}
            />
            <Text style={styles.labelText}>From</Text>
            <TextInput
              value={this.state.searchFromDate}
              onChangeText={text => this.setState({ searchFromDate: text })}
              placeholder={'MM/DD/YYYY'}
              style={styles.inputText}
            />
            <Text style={styles.labelText}>To</Text>
            <TextInput
              value={this.state.searchToDate}
              onChangeText={text => this.setState({ searchToDate: text })}
              placeholder={'MM/DD/YYYY'}
              style={styles.inputText}
            />
            <TouchableOpacity onPress={this.searchMemo.bind(this)} style={styles.searchButton}>
              <AntDesign name='search1' size={18} color='#FFF' />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  _onDidFocus() {
    this.props.getMemos({
      pageSize: 100,
      offset: 0,
      sortBy: 'created desc'
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onDidFocus={this._onDidFocus.bind(this)} />
        <StatusBar hidden />
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          stickyHeaderIndices={[1]}
          removeClippedSubviews={true}
          style={{ flex: 1 }}
          ListHeaderComponent={this._renderHeader()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => this._renderItem(item)}
          data={this.state.memos}
          initialNumToRender={10}
          keyExtractor={this._keyExtractor}
          numColumns={1}
        />
        <TouchableOpacity style={styles.floatingButton} onPress={this.onAddPressed.bind(this)}>
          <AntDesign name='addfile' size={24} color='#000' />
        </TouchableOpacity>
        {this.renderImageModal()}
        {this.renderFilterModal()}
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
  floatingButton: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    position: 'absolute',
    borderRadius: 35,
    right: 20,
    bottom: 20
  },
  emptyView: {
    padding: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  emptyText: {
    fontFamily: 'product-sans-regular',
    fontSize: 14,
    color: '#CCC',
    textAlign: 'center',
    marginTop: 10
  },
  modalTitle: {
    fontFamily: 'product-sans-regular',
    fontSize: 18,
    marginBottom: 10
  },
  labelText: {
    fontFamily: 'product-sans-regular',
    fontSize: 12
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePreview: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  modalBody: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '90%'
  },
  inputText: {
    fontFamily: 'product-sans-regular',
    fontSize: 16,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginBottom: 10
  },
  searchButton: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#448AFF',
    paddingVertical: 10
  },
  searchButtonText: {
    fontFamily: 'product-sans-regular',
    fontSize: 16,
    padding: 5,
    color: '#FFF'
  }
});
