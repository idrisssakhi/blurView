import React, { useState } from 'react';
import {
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

import Slider from '@react-native-community/slider';

import {BlurView, BlurType} from 'rn-id-blurview';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [blurType, setBlurType] = useState<BlurType>("light");
  const [blurAmount, setBlurAmount] = useState(10);
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
          blurAmount={blurAmount}
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
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={25}
              onValueChange={setBlurAmount}
              step={1}
              value={blurAmount}
              minimumTrackTintColor="#0085f2"
              maximumTrackTintColor="#000000"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
