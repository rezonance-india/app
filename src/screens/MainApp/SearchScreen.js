import React from 'react';
import {ScrollView, FlatList, Text, View} from 'react-native';
import ListItem from '../../components/Shared/ListItem';
import ItemSeparator from '../../components/Shared/ItemSeperator';
import Header from '../../components/Shared/Header';
import Type from '../../components/Shared/Type';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';

import {
	TouchableHighlight,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native-gesture-handler';

const sampleData = [
	{
		ref_id: 'rap21991',
		track_name: 'Talk Up (feat. Jay-Z)',
		album_name: 'Scorpion',
		artist_name: 'Drake',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5',
	},
	{
		ref_id: 'rap32970',
		track_name: 'She Never Been To Pluto',
		album_name: 'Pluto x Baby Pluto',
		artist_name: 'Future',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27357928e0363878a71692e6a1f',
	},
	{
		ref_id: 'rap33060',
		track_name: 'Hi Roller',
		album_name: 'Lil Uzi Vert vs. The World',
		artist_name: 'Lil Uzi Vert',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2738be07181aa935225a6f25d56',
	},
	{
		ref_id: 'rap21128',
		track_name: 'Out in Space (feat. Quavo)',
		album_name: 'The Saga of Wiz Khalifa',
		artist_name: 'Wiz Khalifa',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273fb3dcedb1da63eb4be8c7433',
	},
	{
		ref_id: 'rap34280',
		track_name: 'The Voice',
		album_name: 'The Voice',
		artist_name: 'Lil Durk',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273e67a56591cf8bcfcb1450980',
	},
	{
		ref_id: 'rap28412',
		track_name: 'Watching Movies',
		album_name: 'Watching Movies with the Sound Off (Deluxe Edition)',
		artist_name: 'Mac Miller',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273e89541ec125fcc0792749fdd',
	},
	{
		ref_id: 'rap28435',
		track_name: 'Aquarium',
		album_name: 'Watching Movies with the Sound Off',
		artist_name: 'Mac Miller',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27399eb561d2e98f944fcc97d72',
	},
	{
		ref_id: 'rap16520',
		track_name: 'Heat',
		album_name: "Get Rich Or Die Tryin'",
		artist_name: '50 Cent',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2734c88e268c9dc19f79ccdbb97',
	},
	{
		ref_id: 'rap16460',
		track_name: 'Come & Get You',
		album_name: 'Bullet Proof',
		artist_name: '50 Cent',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273195db6676f2a9a7b2ec7b733',
	},
	{
		ref_id: 'rap26546',
		track_name: 'U Da Realest',
		album_name: 'B.O.A.T.S. II #METIME (Deluxe)',
		artist_name: '2 Chainz',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273b4366694590f7164fad21fc7',
	},
	{
		ref_id: 'rap26556',
		track_name: 'Yuck!',
		album_name: 'Based On A T.R.U. Story (Deluxe)',
		artist_name: '2 Chainz',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2732a0e6aff34e828392e1df7d0',
	},
	{
		ref_id: 'rap26559',
		track_name: 'No Lie',
		album_name: 'Based On A T.R.U. Story (Deluxe)',
		artist_name: '2 Chainz',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2732a0e6aff34e828392e1df7d0',
	},
	{
		ref_id: 'rap26569',
		track_name: 'Countdown',
		album_name: 'Based On A T.R.U. Story (Deluxe)',
		artist_name: '2 Chainz',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2732a0e6aff34e828392e1df7d0',
	},
	{
		ref_id: 'rap26572',
		track_name: 'Riot',
		album_name: 'Based On A T.R.U. Story (Deluxe)',
		artist_name: '2 Chainz',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2732a0e6aff34e828392e1df7d0',
	},
	{
		ref_id: 'rap30609',
		track_name: 'Cherry Hill',
		album_name: "There's Really A Wolf",
		artist_name: 'Russ',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273cb045e684adce8d49ada4045',
	},
	{
		ref_id: 'rap30629',
		track_name: '90s Babies (feat. Bugus)',
		album_name: 'Silence',
		artist_name: 'Russ',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273c6f945618732fb1936e078b8',
	},
	{
		ref_id: 'rap28527',
		track_name: 'Again',
		album_name: 'By Any Means',
		artist_name: 'Kevin Gates',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2733d6b23f9f731dcaf550fc093',
	},
	{
		ref_id: 'rap28587',
		track_name: 'What Up Homie',
		album_name: 'All In',
		artist_name: 'Kevin Gates',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273e2ada3709128c4e2aecbdc0b',
	},
	{
		ref_id: 'roc16460',
		track_name: 'The Final Countdown',
		album_name: 'TOP 40 HITDOSSIER - 80s (Eighties Top 100)',
		artist_name: 'Billy Joel',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737ba47d554d89ce01f4859f8f',
	},
	{
		ref_id: 'roc21001',
		track_name: 'The Final Countdown',
		album_name: 'TOP 40 HITDOSSIER - 80s (Eighties Top 100)',
		artist_name: 'Billy Joel',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737ba47d554d89ce01f4859f8f',
	},
	{
		ref_id: 'roc2447',
		track_name: 'The Final Countdown',
		album_name: 'TOP 40 HITDOSSIER - 80s (Eighties Top 100)',
		artist_name: 'Billy Joel',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737ba47d554d89ce01f4859f8f',
	},
	{
		ref_id: 'roc25768',
		track_name: 'The Final Countdown',
		album_name: 'TOP 40 HITDOSSIER - 80s (Eighties Top 100)',
		artist_name: 'Billy Joel',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737ba47d554d89ce01f4859f8f',
	},
	{
		ref_id: 'roc28527',
		track_name: 'The Final Countdown',
		album_name: 'TOP 40 HITDOSSIER - 80s (Eighties Top 100)',
		artist_name: 'Billy Joel',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737ba47d554d89ce01f4859f8f',
	},
	{
		ref_id: 'roc30609',
		track_name: 'The Final Countdown',
		album_name: 'TOP 40 HITDOSSIER - 80s (Eighties Top 100)',
		artist_name: 'Billy Joel',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737ba47d554d89ce01f4859f8f',
	},
	{
		ref_id: 'rap28846',
		track_name: 'U Dont Got a Clue',
		album_name: 'Nip Hussle the Great: Vol. 2',
		artist_name: 'Nipsey Hussle',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273967f68c75e97becdee2214b8',
	},
	{
		ref_id: 'rap28869',
		track_name: 'Rap Music (feat. June Summers)',
		album_name: 'Nip Hussle the Great: Vol. 1',
		artist_name: 'Nipsey Hussle',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273a1a6c7eff60575ab2cbcd616',
	},
	{
		ref_id: 'rap37428',
		track_name: 'Pull Up (feat. Gucci Mane)',
		album_name: 'Black Circle',
		artist_name: 'Money Man',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2739cf6459f41bfca06d99e39d7',
	},
	{
		ref_id: 'rap33894',
		track_name: 'Dior',
		album_name: 'Best of Rap',
		artist_name: 'Pusha T',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273481f289f4adbff146f8622ab',
	},
	{
		ref_id: 'roc12332',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc16520',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc21101',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc28385',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc28587',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc30629',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc6516',
		track_name: 'The Final Countdown',
		album_name: '1980s XL',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27334dbc660b1c12c1dfa840650',
	},
	{
		ref_id: 'roc21128',
		track_name: 'The Final Countdown',
		album_name: 'Driving Anthems',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27349fa98b5becffc8394622348',
	},
	{
		ref_id: 'roc30502',
		track_name: 'The Final Countdown',
		album_name: 'Driving Anthems',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27349fa98b5becffc8394622348',
	},
	{
		ref_id: 'roc33060',
		track_name: 'The Final Countdown',
		album_name: 'Driving Anthems',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27349fa98b5becffc8394622348',
	},
	{
		ref_id: 'roc33894',
		track_name: 'The Final Countdown',
		album_name: 'Driving Anthems',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27349fa98b5becffc8394622348',
	},
	{
		ref_id: 'roc37647',
		track_name: 'The Final Countdown',
		album_name: 'Driving Anthems',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27349fa98b5becffc8394622348',
	},
	{
		ref_id: 'roc6543',
		track_name: 'The Final Countdown',
		album_name: 'Driving Anthems',
		artist_name: 'The Clash',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27349fa98b5becffc8394622348',
	},
	{
		ref_id: 'rap21001',
		track_name: 'Bulletproof',
		album_name: '2000s Throwbacks Vibes',
		artist_name: 'Ja Rule',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273e997c3eb259798c55abc1684',
	},
	{
		ref_id: 'rap37647',
		track_name: 'Pressure In My Palms (feat. slowthai, Vince Staples)',
		album_name: 'Limbo (Deluxe)',
		artist_name: 'Vince Staples',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273a19bf1be136d24f799f10c14',
	},
	{
		ref_id: 'rap21001',
		track_name: 'Bulletproof',
		album_name: '2000s Throwbacks Vibes',
		artist_name: 'Will Smith',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273e997c3eb259798c55abc1684',
	},
	{
		ref_id: 'rap6543',
		track_name: 'One of These Days',
		album_name: 'Wu-Tang Iron Flag',
		artist_name: 'Wu-Tang Clan',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273e4a01dd6397b08347f96c859',
	},
	{
		ref_id: 'rap6516',
		track_name: 'Cars on the Interstate - Instrumental',
		album_name: 'Wu-Tang Meets The Indie Culture Instrumentals',
		artist_name: 'Wu-Tang Clan',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b273324d2414d06acbbc3cd5ba9b',
	},
	{
		ref_id: 'rap30502',
		track_name: 'Amademoni',
		album_name: 'A.M.N (Any Minute Now)',
		artist_name: 'Bas',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2737d999dacc27eb5382ef3568d',
	},
	{
		ref_id: 'roc26546',
		track_name: 'The Final Countdown',
		album_name: 'The Final Countdown',
		artist_name: 'Europe',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27354dbd4c77b2a3db8fb079943',
	},
	{
		ref_id: 'roc26556',
		track_name: 'The Final Countdown - Live Version',
		album_name: 'The Final Countdown',
		artist_name: 'Europe',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b27354dbd4c77b2a3db8fb079943',
	},
	{
		ref_id: 'roc26559',
		track_name: 'The Final Countdown',
		album_name: 'The Final Countdown (Expanded Edition)',
		artist_name: 'Europe',
		album_image:
			'https://i.scdn.co/image/ab67616d0000b2732d925cec3072ed1b74e5188f',
	},
];

const SearchScreen = ({navigation}) => {
	console.log('in search');
	const renderer = ({item}) => (
		<TouchableOpacity activeOpacity={0.75} onPress={null}>
			<ListItem navigation={navigation} data={item} />
		</TouchableOpacity>
	);

	const searchHeader = () => <Type>Search</Type>;
	return (
		<ScreenBuilder>
			{/* <Header isBack heading="Search" navigation={navigation} /> */}
			<FlatList
				keyExtractor={(item) => item.ref_id}
				// ListHeaderComponent={searchHeader}
				data={sampleData}
				renderItem={renderer}
				// ItemSeparatorComponent={ItemSeparator}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenBuilder>
	);
};

export default SearchScreen;
