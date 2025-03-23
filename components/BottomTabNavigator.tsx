/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen'; // ✅ Import ProfileScreen

// Placeholder Screens
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Home</Text>
  </View>
);

const AddScreen = () => (
  <View style={styles.screen}>
    <Text>Add Files</Text>
  </View>
);

// Custom Tab Button
const CustomTabButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.customButton}>
    <View style={styles.buttonInner}>{children}</View>
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({focused, color}) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            }

            return <Icon name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: '#00E676',
          tabBarInactiveTintColor: '#757575',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarLabel: '',
            tabBarButton: props => (
              <CustomTabButton {...props}>
                <Icon name="plus" size={26} color="#FFFFFF" />
              </CustomTabButton>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#121212',
    height: 60,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 15,
    paddingBottom: 5,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  customButton: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
  },
  buttonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00E676',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00E676',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
});
