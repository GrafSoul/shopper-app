// Core
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, TextInput } from 'react-native';
// Theme
import { View } from '../Themed';
// Components
import Checkbox from '../Checkbox';

interface ShopListItemProps {
    shopItem: {
        id: string,
        content: string,
        isCompleted: boolean
    }
    onSubmit: () => void
}

const ShopListItem = ({shopItem, onSubmit}: ShopListItemProps) => {
     const [isChecked, setIsChecked] = useState(false);
    const [content, setContent] = useState('');
    const input = useRef(null);

    useEffect(() => {
        if(!shopItem) {return}

        setIsChecked(shopItem.isCompleted);
        setContent(shopItem.content);
    }, [shopItem]);

    useEffect(() => {
        // get focus on input
        if(input.current) {
            input?.current?.focus()
        }
    }, [input]);

    const onKeyPress = ({ nativeEvent }) => {
        if(nativeEvent.key === 'Backspace' && content === '') {
            // Delete item
            console.warn('Delete item');
        }
    }

    return (
        <View style={styles.shopList}>
			{/* Checkbox */}
			<Checkbox 
                isChecked={isChecked} 
                onPress={() => { setIsChecked(!isChecked)}}
                />

			{/* Text input */}
			<TextInput 
                ref={input}
                value={content}
                onChangeText={setContent}
				multiline
				placeholder="Enter Shop List" 
				style={styles.shopInput} 
                onSubmitEditing={onSubmit}
                blurOnSubmit
                onKeyPress={onKeyPress}
                />
		</View>
    )
}
export default ShopListItem

const styles = StyleSheet.create({
	shopList: {
		flexDirection: 'row',
		alignItems: 'center',
        marginVertical: 3
	},
	shopInput: {
		flex: 1,
		marginLeft: 12,
        height: 18,
		fontSize: 18,
		color: '#333',
	}
});
