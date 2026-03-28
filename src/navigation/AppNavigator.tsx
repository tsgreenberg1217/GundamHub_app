import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardBrowserScreen } from '../screens/CardBrowserScreen';
import { DeckListScreen } from '../screens/DeckListScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { Colors } from '../theme/colors';
import { Fonts, FontSizes } from '../theme/typography';

enableScreens();

const Tab = createBottomTabNavigator();

type TabIconProps = {
  color: string;
  size: number;
};

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.surface1,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: Colors.activeTint,
          tabBarInactiveTintColor: Colors.inactiveTint,
          tabBarLabelStyle: {
            fontFamily: Fonts.body,
            fontSize: FontSizes.xs,
          },
        }}>
        <Tab.Screen
          name="Cards"
          component={CardBrowserScreen}
          options={{
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons
                name="cards-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Decks"
          component={DeckListScreen}
          options={{
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons
                name="layers-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color, size }: TabIconProps) => (
              <MaterialCommunityIcons
                name="forum-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
