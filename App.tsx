import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { 
  useFonts, 
  Outfit_400Regular,
  Outfit_700Bold
 } from '@expo-google-fonts/outfit'

import { HomeScreen } from './src/screens';
import { Loading } from './src/components/Loading';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold
  })
  return (
    <>
      {fontsLoaded ? <HomeScreen/> : <Loading/>}
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
