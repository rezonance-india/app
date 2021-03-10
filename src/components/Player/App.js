import React, {Component} from 'react';
import Player from './Player';
// import { BackHandler } from "react-native";
// import i18n from "../../Assets/I18n/i18n";
// import { Actions } from "react-native-router-flux";
import {TRACKS} from './tracksData';

export default class MusicPlayer extends Component {
	constructor(props) {
		super(props);
		// const { navigation } = this.props;
		// this.state = {
		//     song: navigation.getParam("songid"),
		// };
		// this.props.navigation.setParams({
		//     title: i18n.t("Panchkhan"),
		// });
	}
	// componentWillMount() {
	//     BackHandler.addEventListener(
	//         "hardwareBackPress",
	//         this.handleBackButton
	//     );
	// }

	// componentWillUnmount() {
	//     BackHandler.removeEventListener(
	//         "hardwareBackPress",
	//         this.handleBackButton
	//     );
	// }

	// handleBackButton = () => {
	//     Actions.pop();
	//     return true;
	// };

	render() {
		return <Player tracks={TRACKS} />;
	}
}
