import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";

import { CharacterDetail } from "./CharacterDetail";
import { CharacterList } from "./CharacterList";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CharacterList">
        <Stack.Screen name="CharacterList" component={CharacterList} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

