// Core
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
// Theme
import { View } from '../components/Themed';
// Components
import ShopListItem from '../components/ShopListItem';

let id = '4';

export default function ShopScreen() {
    const [title, setTitle] = useState('');
    const [list, setLists] = useState([
        {
            id: '1',
            content: 'Buy milk',
            isCompleted: true,
        },
        {
            id: '2',
            content: 'Buy cake',
            isCompleted: false,
        },
        {
            id: '3',
            content: 'Buy bread',
            isCompleted: false,
        },
    ]);

    const createNewItem = (index: number) => {
        const newList = [...list];
        newList.splice(index, 0, {
            id: id,
            content: '',
            isCompleted: false,
        });
        setLists(newList);
        // console.warn(`new item at ${index}`)
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.title}
                placeholder="Enter Title"
                underlineColorAndroid="transparent"
            />

            <FlatList
                data={list}
                renderItem={({ item, index }) => (
                    <ShopListItem
                        onSubmit={() => createNewItem(index + 1)}
                        shopItem={item}
                    />
                )}
                style={styles.list}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'white',
    },
    title: {
        width: '100%',
        height: 38,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomColor: 'white',
    },
    list: {
        width: '100%',
    },
});
