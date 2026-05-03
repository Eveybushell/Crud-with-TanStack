import PostList from '../../components/PostList';
import CreatePost from '../../components/CreatePost';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
   <PostList />
   <CreatePost />
   </View>
  );
}

