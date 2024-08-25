import AsyncStorage from "@react-native-async-storage/async-storage";

// Storing data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

// Retrieving data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

// Removing data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error removing value
    console.error(e);
  }
};
