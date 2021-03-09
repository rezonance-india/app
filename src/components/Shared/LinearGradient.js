import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientComp = (props) => {
	const {bgcolors} = props;
	return (
		<LinearGradient
			height="100%"
			colors={[bgcolors.PRIMARY, bgcolors.ACCENT]}
			useAngle={true}
			angle={145}
			angleCenter={{x: -0.02, y: -0.05}}
			style={{
				flex: 1,
			}}>
			{props.children}
		</LinearGradient>
	);
};

export default LinearGradientComp;
