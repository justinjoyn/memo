import React, { Component } from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import Store from './common/store';
import { PersistGate } from 'redux-persist/integration/react';
import ActivityLoader from './modules/common/ActivityLoader';
import { Font } from 'expo';

class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'product-sans-regular': require('./assets/fonts/ProductSansRegular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={Store.store}>
        <PersistGate loading={<ActivityLoader loading={true} />} persistor={Store.persistor}>
          {this.state.fontLoaded ? <Router /> : <ActivityLoader loading={true} />}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
