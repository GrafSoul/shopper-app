// Core
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

import { useQuery, gql } from '@apollo/client';
import { useRoute } from '@react-navigation/native';

// Components
import ShopListItem from '../components/ShopListItem';

const GEt_SHOP = gql`
    query getShopList($id: ID!) {
        getShopList(id: $id) {
            id
            title
            createdAt
            users {
                id
                email
                name
            }
        }
    }
`;

let id = '4';

export default function ShopScreen() {
    const [project, setProject] = useState(null);
    const [title, setTitle] = useState('');

    const route = useRoute();

    const { data, error, loading } = useQuery(GEt_SHOP, {
        variables: { id: route.params.id },
    });

    useEffect(() => {
        if (error) {
            Alert.alert('Error fetching projects,', error.message);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setProject(data.getShopList);
            setTitle(data.getShopList.title);
        }
    }, [data]);

    const createNewItem = (index: number) => {
        // const newList = [...list];
        // newList.splice(index, 0, {
        //     id: id,
        //     content: '',
        //     isCompleted: false,
        // });
        // setLists(newList);
        // console.warn(`new item at ${index}`)
    };

    if (!project) {
        return null;
    }

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
                data={project.todos}
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
