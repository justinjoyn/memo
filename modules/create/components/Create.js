import { AntDesign } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActivityLoader from '../../common/ActivityLoader';
import { editMemo, newMemo, uploadImage } from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: null,
      image: null,
      selectingImage: false,
      savingMemo: false,
      title: '',
      description: '',
      people: '',
      resultModalVisible: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.saveResponse && state.savingMemo)
      return {
        resultModalVisible: true
      };

    if (props.uploadResponse && state.selectingImage)
      return {
        image: props.uploadResponse.fileURL,
        selectingImage: false
      };

    return null;
  }

  componentDidMount() {
    let memo = this.props.navigation.getParam('memo', null);
    this.setState({
      memo: memo,
      image: memo ? memo.image : null,
      title: memo ? memo.title : null,
      description: memo ? memo.description : null,
      people: memo ? memo.with : null
    });
  }

  takePhoto = async () => {
    const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: cameraRollPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    this.setState({
      selectingImage: true
    });

    if (cameraPermission === 'granted' && cameraRollPermission === 'granted') {
      let result = await ImagePicker.launchCameraAsync({});
      if (result.uri) this._handleImagePicked(result);
    }
  };

  _handleImagePicked(result) {
    this.props.uploadImage(result);
  }

  removeImage() {
    this.setState({ image: null });
  }

  saveMemo() {
    if (this.state.title && this.state.description && this.state.people) {
      this.setState({ savingMemo: true });
      if (this.state.memo) {
        this.props.editMemo({
          title: this.state.title,
          description: this.state.description,
          image: this.state.image ? this.state.image : '',
          people: this.state.people,
          id: this.state.memo.objectId
        });
      } else {
        this.props.newMemo({
          title: this.state.title,
          description: this.state.description,
          image: this.state.image ? this.state.image : '',
          people: this.state.people
        });
      }
    }
  }

  renderResultModal() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.resultModalVisible}
        onRequestClose={() => this.props.navigation.goBack()}>
        <View style={styles.modal}>
          <View style={styles.modalBody}>
            <AntDesign name='checkcircleo' size={32} color='#000' />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
          <Text style={styles.pageTitle}>Add Memo</Text>
          <View style={styles.memoForm}>
            <TextInput
              value={this.state.title}
              onChangeText={text => this.setState({ title: text })}
              placeholder={'Title'}
              style={styles.inputText}
            />
            <TextInput
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
              placeholder={'Description'}
              style={[styles.inputText, { textAlignVertical: 'top' }]}
              multiline={true}
              numberOfLines={5}
            />
            <TextInput
              value={this.state.people}
              onChangeText={text => this.setState({ people: text })}
              placeholder={'With'}
              style={styles.inputText}
            />
            <View style={styles.inputView}>
              <Image
                source={{ uri: this.state.image ? this.state.image : null }}
                style={styles.imageView}
                resizeMode={'cover'}
              />
              <Text style={styles.imagePath}>
                {this.state.image ? '1 file selected' : 'No image selected'}
              </Text>
              {this.state.image ? (
                <TouchableOpacity onPress={this.removeImage.bind(this)} style={{ padding: 5 }}>
                  <AntDesign name='delete' size={20} color='#000' />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={this.saveMemo.bind(this)}
              style={[styles.inputView, { backgroundColor: '#448AFF', paddingVertical: 10 }]}>
              <AntDesign name='save' size={18} color='#FFF' />
              <Text style={styles.styledText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton} onPress={this.takePhoto.bind(this)}>
          <AntDesign name='camerao' size={24} color='#000' />
        </TouchableOpacity>
        {this.renderResultModal()}
        {this.props.isSaving || this.props.isUploading ? <ActivityLoader loading={true} /> : null}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      newMemo,
      editMemo,
      uploadImage
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  saveResponse: state.create.create.saveResponse,
  saveError: state.create.create.saveError,
  uploadResponse: state.create.create.uploadResponse,
  uploadError: state.create.create.uploadError,
  isSaving: state.create.create.isSaving,
  isUploading: state.create.create.isUploading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);

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
  memoForm: {
    padding: 10
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
  inputView: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10
  },
  styledText: {
    fontFamily: 'product-sans-regular',
    fontSize: 16,
    padding: 5,
    color: '#FFF'
  },
  imageView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#CCC'
  },
  imagePath: {
    fontFamily: 'product-sans-regular',
    fontSize: 16,
    flex: 1,
    marginLeft: 5
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
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    height: 100,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 8
  }
});
