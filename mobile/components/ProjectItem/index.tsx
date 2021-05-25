import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles'

const ProjectItem = () => {

    return (
        <View style={styles.root}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                    name='file-outline' 
                    size={24} 
                    color="gray" />
            </View>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.time}>2d</Text>
        </View>
    )

}



export default ProjectItem;
