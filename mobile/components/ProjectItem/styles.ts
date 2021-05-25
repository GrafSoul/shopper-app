import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        marginRight: 5,
        paddingTop: 4,
    },
    time: {
        paddingTop: 5,
        color: 'darkgrey'
    }
});

export default styles;