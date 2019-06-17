import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./HomeScreen"

import { createStackNavigator, createAppContainer } from "react-navigation";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <AppStatusBar/>
//         <Text>Spanish Visa Appointment Scheduler</Text>
//     </View>
//   );
// }

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Citas de Visado`,
        headerBackTitle: null,
        headerStyle: styles.headerStyle,
        headerTintColor: "#fff"
      }),
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  headerStyle: {
    color: "#fff",
    backgroundColor: "#c60b1e"
  }
});
