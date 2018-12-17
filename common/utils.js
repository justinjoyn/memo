import { AsyncStorage } from 'react-native';

export const actionCreator = type => payload => ({ type, payload });

//Handle API responses
export const handleResponse = (response, successHandler, failureHandler) => {
  if (response.status === 200) {
    return successHandler(response.data);
  } else {
    return failureHandler(response);
  }
};

//Save data to AsyncStorage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert(error);
  }
};

//Fetch data from AsyncStorage
export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return undefined;
    }
  } catch (error) {
    alert(error);
    return undefined;
  }
};
