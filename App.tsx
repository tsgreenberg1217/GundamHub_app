import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './src/services/apolloClient';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={apolloClient}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.background}
        />
        <AppNavigator />
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
