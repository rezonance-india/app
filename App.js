import React, {useState, useEffect} from 'react';

import {StatusBar} from 'react-native';
import {PRIMARY} from './src/constants/colors';
import MainNavigator from './src/navigators/MainNavigator';
import {colors} from './src/constants/colors';

const App = () => {
	return (
		<>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<MainNavigator />
		</>
	);
};

export default App;
