import { createAppContainer, createStackNavigator } from 'react-navigation';
import { History } from './modules/history';

const MainNavigator = createStackNavigator(
  {
    History: {
      screen: History
    }
  },
  {
    initialRouteName: 'History',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
