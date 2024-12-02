import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  Button,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MyPicture from './assets/profile.jpg';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Animated Header Component
function AnimatedHeader() {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <Text style={styles.headerText}>Hello, Zoe!</Text>
    </Animated.View>
  );
}

// Home Screen with Enhanced Styling and Animations
function HomeScreen() {
  const [scaleAnim] = useState(new Animated.Value(1));

  const onPressButton = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image
        source={MyPicture}
        style={[styles.profilePicture, styles.fadeIn]}
      />
      <AnimatedHeader />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Stats</Text>
        <View style={styles.dashboard}>
          <Text style={styles.dashboardItem}>🗓 Appointments: 3</Text>
          <Text style={styles.dashboardItem}>📬 Notifications: 5</Text>
          <Text style={styles.dashboardItem}>📊 Stats: 80% complete</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleAnim }] }]}>
            View More Details
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Profile Screen with Animation
function ProfileScreen() {
  const [name, setName] = useState('Zoe Mart Derick R. Pabillaran');
  const [age, setAge] = useState('20');
  const [birthdate, setBirthdate] = useState('May 24, 2004');
  const [nationality, setNationality] = useState('Filipino');
  const [gender, setGender] = useState('Male');

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image source={MyPicture} style={[styles.profilePicture, { opacity: fadeAnim }]} />
      <Text style={styles.heading}>Edit Your Profile</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
      <TextInput style={styles.input} value={birthdate} onChangeText={setBirthdate} placeholder="Birthdate" />
      <TextInput style={styles.input} value={nationality} onChangeText={setNationality} placeholder="Nationality" />
      <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Gender" />
      <TouchableOpacity style={styles.button} onPress={() => alert('Profile Updated!')}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Settings Screen with Toggle Animation
function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isDarkTheme ? 1 : 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isDarkTheme]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.info}>Dark Theme:</Text>
        <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
      </View>
      <Animated.View
        style={[
          styles.settingsBox,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.info}>Slide Animation: {isDarkTheme ? 'Enabled' : 'Disabled'}</Text>
      </Animated.View>
    </View>
  );
}

// Dashboard Screen with Animated List
function DashboardScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.info}>Overview of your activities.</Text>
      <FlatList
        data={[{ key: 'Item 1' }, { key: 'Item 2' }, { key: 'Item 3' }]}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.key}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </Animated.View>
  );
}

// Tab Navigator with Custom Styling
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Dashboard') iconName = 'grid';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#BB86FC',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#6200EE' },
        headerStyle: {
          backgroundColor: '#6200EE',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

// Custom Drawer Content with Animations
function CustomDrawerContent({ navigation }) {
  return (
    <View style={styles.drawerContainer}>
      <Image source={MyPicture} style={styles.drawerImage} />
      <Text style={styles.drawerName}>Zoe Mart Derick R. Pabillaran</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
        <Text style={styles.drawerItem}>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.drawerItem}>⚙️ Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tabs" component={TabsNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// Main App Component with Styling and Animations
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#EDE7F6',
    padding: 20,
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#6200EE',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#6200EE',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dashboard: {
    marginBottom: 15,
  },
  dashboardItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingsBox: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 3,
  },
  listItemText: {
    fontSize: 16,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#6200EE',
    padding: 20,
    alignItems: 'center',
  },
  drawerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  drawerName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  drawerItem: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
});
