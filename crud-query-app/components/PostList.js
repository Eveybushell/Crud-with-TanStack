import { useQuery } from '@tanstack/react-query';
import { View, FlatList, Button, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import EditPost from './EditPost.js';
import PatchPost from './PatchPost.js';
import DeletePost from './DeletePost.js';

export default function PostList() {
   const [selectedPostId, setPostId] = useState(null);
   const [selectedPatchId, setPatchId] = useState(null);
   const [selectedDeleteId, setDeleteId] = useState(null);
   const [filteredId, setFilteredId] = useState(null);
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

     const visiblePosts = filteredId 
    ? data.filter(item => item.userId === Number(filteredId))
    : data;

    return (
        <View style={styles.container}>
            <Text>Want to just see posts from a specific user?</Text>
            <TextInput
                onChangeText={newFilter => setFilteredId(newFilter)}
                placeholder='Type the user ID here'
            />
            <FlatList
                data = {visiblePosts}
                renderItem={({item}) =>
                <>
                <Text>{item.title}</Text>
                <Button onPress={() => setPatchId(item.id)} title='Change post title'/>
                {selectedPatchId === item.id && <PatchPost id={item.id} title={item.title}/>}
                <Button onPress={() => setPostId(item.id)} title='Edit post'/>
                {selectedPostId === item.id && <EditPost id={item.id} title={item.title} body={item.body}/>}
                <Button onPress={() => setDeleteId(item.id)} title='Delete post'/>
                {selectedDeleteId === item.id && <DeletePost id={item.id}/>}
                </>
            }
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