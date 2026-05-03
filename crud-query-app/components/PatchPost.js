import { useMutation } from '@tanstack/react-query';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { useState } from 'react';

export default function PatchPost({id, title}) {
    const [editTitle, setTitle] = useState(title);
    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "PATCH",
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
            {mutation.isSuccess && <Text>Title edited!</Text>}
            <Text>Change your post title</Text>
            <Text>Type your title below</Text>
            <TextInput
            placeholder='Your title here'
            onChangeText={newTitle => setTitle(newTitle)}
            defaultValue={editTitle}
            />
            <Button
            title='Submit'
            onPress={() => {
                mutation.mutate({title: editTitle})
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