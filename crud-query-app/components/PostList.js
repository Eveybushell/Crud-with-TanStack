import { useQuery } from '@tanstack/react-query';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function PostList() {
   const {isPending, isError, data, error} = useQuery({
    queryKey: ['post'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
    });

    if (isPending) {
        return <Text>Loading...</Text>
    }
    if (isError) {
        return <Text>Error: {error.message}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data = {data}
                renderItem={({item}) => <Text>{item.title}</Text>}
                keyExtractor={(item) => item.id.toString()}
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