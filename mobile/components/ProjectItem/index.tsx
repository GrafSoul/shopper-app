import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

interface ProjectItemProps {
    project: {
        id: string;
        title: string;
        createdAt: string;
    };
}

const ProjectItem = ({ project }: ProjectItemProps) => {
    const { id, title, createdAt } = project;
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Shop', { id: id });
        // console.warn(`Open ${title}`);
    };

    return (
        <Pressable onPress={onPress} style={styles.root}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name="file-outline"
                    size={24}
                    color="gray"
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{createdAt}</Text>
        </Pressable>
    );
};

export default ProjectItem;
