import { useMutation } from '@tanstack/react-query';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function DeletePost({id}) {
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE",
    })
            return response.json();
        }
    });

    return (
        <View style={styles.container}>
            {mutation.isPending && <Text>Submitting...</Text>}
            {mutation.isError && <Text>Error: {mutation.error.message}</Text>}
            {mutation.isSuccess && <Text>Post deleted</Text>}
            <Button
            title='Delete post'
            onPress={() => {
                mutation.mutate()
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