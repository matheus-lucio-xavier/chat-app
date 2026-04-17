import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store"

const api = axios.create({
  baseURL: 'http://192.168.0.38:5237/api',
});

// interceptor
api.interceptors.request.use(async (config) => {
    //const token = await AsyncStorage.getItem("token");
    const token = await SecureStore.getItemAsync("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;