import { Platform } from 'react-native';

const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const GRAPHQL_URL = `http://${HOST}:8082/graphql`;
export const CHAT_URL = `http://${HOST}:8080/ask`;
