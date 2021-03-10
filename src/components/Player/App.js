import React, {Component} from 'react';
import Player from './Player';
// import { BackHandler } from "react-native";
// import i18n from "../../Assets/I18n/i18n";
// import { Actions } from "react-native-router-flux";

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
		const TRACKS = [
			{
				title: '9.13',
				artist: 'lol',
				albumArtUrl:
					'https://i.scdn.co/image/ab67616d0000b273c43edd2cf01edf73bf0b97a3',
				audioUrl:
					'http://schnncdnems03.cdnsrv.jio.com/jiosaavn.cdn.jio.com/385/ff28bce85b73d8eb1294630af0df2dc5_96.mp4',
			},
			{
				title: 'Vertigo',
				artist: 'hello',
				albumArtUrl:
					'https://i.scdn.co/image/ab67616d0000b273c43edd2cf01edf73bf0b97a3',
				audioUrl:
					'http://schnncdnems03.cdnsrv.jio.com/jiosaavn.cdn.jio.com/385/a6fa35ad1a1313d8d3e412352fe9c51a_96.mp4',
			},
		];
		return <Player tracks={TRACKS} />;
	}
}
