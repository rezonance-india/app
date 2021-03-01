import React, {useState, useEffect} from 'react';

import {StatusBar} from 'react-native';
import {PRIMARY} from './src/constants/colors';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={PRIMARY}
        translucent
      />
      <MainNavigator />
    </>
  );
};

export default App;
