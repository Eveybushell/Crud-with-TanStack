import { useMutation } from '@tanstack/react-query';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { useState } from 'react';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost)
    })
            return response.json();
        }
    });

    return (
        <View style={styles.container}>
            {mutation.isPending && <Text>Submitting...</Text>}
            {mutation.isError && <Text>Error: {mutation.error.message}</Text>}
            {mutation.isSuccess && <Text>Post created!</Text>}
            <Text>Make a new post!</Text>
            <Text>Type your title below</Text>
            <TextInput
            placeholder='Your title here'
            onChangeText={newTitle => setTitle(newTitle)}
            defaultValue={title}
            />
            <Text>Type your post below</Text>
            <TextInput
            placeholder='Your post here'
            onChangeText={newBody => setBody(newBody)}
            defaultValue={body}
            />
            <Button
            title='Submit'
            onPress={() => {
                mutation.mutate({title, body, userId: 1})
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        color: '#000',
    }
});