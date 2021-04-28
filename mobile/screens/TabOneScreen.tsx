// Core
import React, {useState} from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
// Theme
import { View } from '../components/Themed';
// Components
import ShopListItem from '../components/ShopListItem';

let id = '4'

export default function TabOneScreen() {
	const [lists, setLists] = useState([{
		id: '1',
		content: 'Buy milk',
		isCompleted: true
	}, {
		id: '2',
		content: 'Buy cake',
		isCompleted: false
	}, {
		id: '3',
		content: 'Buy bread',
		isCompleted: false
	}]);

	const createNewItem = (index: number) => {
		const newList = [...lists];
		newList.splice(index, 0, {
			id:id,
			content: '',
			isCompleted: false
		});
		setLists(newList)
		// console.warn(`new item at ${index}`)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Shopping Lists</Text>

			<FlatList
				data={lists}
				renderItem={({item, index}) => 
				<ShopListItem 
					onSubmit={() => createNewItem(index + 1)} 
					shopItem={item} />
					}
				style={{ width: '100%'}}
			/>

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

});
