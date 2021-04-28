// Core
import React from 'react'
import { Pressable } from 'react-native'
// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CheckboxProps {
    isChecked: boolean,
    onPress: () => void
}

const Checkbox = (props: CheckboxProps) => {
    const {onPress, isChecked} = props;
    const name = isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline';
    return (
        <Pressable onPress={onPress}>
            <MaterialCommunityIcons 
				name={name} 
				size={24} 
				color="black" />
        </Pressable>
    )
}

export default Checkbox;
