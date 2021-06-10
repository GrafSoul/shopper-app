import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';

import { useQuery, gql } from '@apollo/client';

import { View } from '../components/Themed';
import ProjectItem from '../components/ProjectItem';

const USER_PROJECTS = gql`
    query userShopLists {
        userShopLists {
            id
            title
            createdAt
        }
`;

const ProjectsScreen = () => {
    const [project, setProjects] = useState([]);

    const { data, error, loading } = useQuery(USER_PROJECTS);

    useEffect(() => {
        if (error) {
            Alert.alert('Error fetching projects,', error.message);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setProjects(data.userShopLists);
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <FlatList
                data={project}
                renderItem={({ item }) => <ProjectItem project={item} />}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProjectsScreen;
