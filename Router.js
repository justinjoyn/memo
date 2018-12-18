import { createAppContainer, createStackNavigator } from 'react-navigation';
import { History } from './modules/history';
import { Create } from './modules/create';

const MainNavigator = createStackNavigator(
  {
    History: {
      screen: History
    },
    Create: {
      screen: Create
    }
  },
  {
    initialRouteName: 'History',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
