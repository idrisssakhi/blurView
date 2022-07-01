import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import {BlurView, BlurType} from 'rn-id-blurview';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [blurType, setBlurType] = useState<BlurType>("light");
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const buttonStyle = {alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0085F2', marginVertical: 6, borderRadius: 20};

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <BlurView
          blurType={blurType}
          blurAmount={10}
          style={StyleSheet.absoluteFill}
          key={'blur'}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 12,
          }}>
            <TouchableOpacity style={buttonStyle} onPress={() => setBlurType('light')}>
              <Text>light</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonStyle} onPress={() => setBlurType('dark')}>
              <Text>dark</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonStyle} onPress={() => setBlurType('xlight')}>
              <Text>xlight</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
