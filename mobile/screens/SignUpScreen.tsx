import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useMutation, gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
    mutation signUp(
        $name: String!
        $email: String!
        $password: String!
        $avatar: String
    ) {
        signUp(
            input: {
                name: $name
                email: $email
                password: $password
                avatar: $avatar
            }
        ) {
            token
            user {
                id
                name
                email
                avatar
            }
        }
    }
`;

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);

    console.log(data);
    console.log(error);

    const onSubmit = async () => {
        if (password === confirmPassword) {
            await signUp({
                variables: { name, email, password, avatar: 'aaaaaa' },
            });
        }
    };

    return (
        <View style={styles.Section}>
            <TextInput
                placeholder={'Name'}
                value={name}
                onChangeText={setName}
                style={styles.Input}
            />

            <TextInput
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
                style={styles.Input}
            />

            <TextInput
                placeholder={'Password'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.Input}
            />

            <TextInput
                placeholder={'Confirm Password'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.Input}
            />

            <Pressable
                disabled={loading}
                onPress={onSubmit}
                style={styles.Button}
            >
                {loading && <ActivityIndicator size="small" color="#19d341" />}
                <Text style={styles.ButtonText}>Sign Up</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('SignIn')}
                style={styles.ButtonSignIn}
            >
                <Text style={styles.ButtonTextSignIn}>
                    Already Have an Account? Sign In
                </Text>
            </Pressable>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    Section: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
    },
    Input: {
        width: '100%',
        marginLeft: 10,
        marginBottom: 15,
        fontSize: 18,
        color: '#333',
        borderBottomColor: 'white',
    },
    Button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 12,
        backgroundColor: '#298100',
    },
    ButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ButtonSignIn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    ButtonTextSignIn: {
        color: '#298100',
        fontSize: 18,
    },
});
