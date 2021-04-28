// Core
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native';
// Theme
import { View } from '../Themed';
// Components
import Checkbox from '../Checkbox';

const ShopListItem = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <View style={styles.shopLists}>
			{/* Checkbox */}
			<Checkbox 
                isChecked={isChecked} 
                onPress={() => { setIsChecked(!isChecked)}}
                />

			{/* Text input */}
			<TextInput 
				underlineColorAndroid="transparent"
				multiline
				placeholder="Enter Shop List" 
				style={styles.shopInput} 
                />
		</View>
    )
}
export default ShopListItem

const styles = StyleSheet.create({
	shopLists: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	shopInput: {
		flex: 1,
		marginLeft: 12,
		fontSize: 18,
		color: '#333',
	}
});
