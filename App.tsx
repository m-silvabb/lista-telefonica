import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import TelaInicial from './screens/TelaInicial';
import TelaAdicionarContato from './screens/TelaAdicionarContato';
import TelaEditarContato from './screens/TelaEditarContato';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
        <Stack.Navigator>        
            <Stack.Screen name="TelaInicial" component={TelaInicial} options={{headerShown: false}}/>
            <Stack.Screen name="TelaAdicionarContato" component={TelaAdicionarContato} options={{headerShown: false}}/>
            <Stack.Screen name="TelaEditarContato" component={TelaEditarContato} options={{headerShown: false}}/>        
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
