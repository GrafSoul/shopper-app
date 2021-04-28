// Core
import React from 'react';
import { StyleSheet } from 'react-native';
// Theme
import { Text, View } from '../components/Themed';
// Components
import Checkbox from '../components/Checkbox';
import ShopListItem from '../components/ShopListItem';

export default function TabOneScreen() {

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Shopping Lists</Text>

			<ShopListItem/>
			<ShopListItem/>a
			<ShopListItem/>
			<ShopListItem/>
			<ShopListItem/>
			<ShopListItem/>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	shopLists: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 5
	},
	shopInput: {
		flex: 1,
		marginLeft: 12,
		fontSize: 18,
		color: '#333',
	}
});
