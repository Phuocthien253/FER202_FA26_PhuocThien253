
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';

function App() {
  return (
    <div className="container mt-5">
      <h1>DemoAxios</h1>
      <hr />

      <DeletePost />

      <hr className="my-5" />

      <PatchPost />

      <hr className="my-5" />

      <UpdatePost />

      <hr className="my-5" />

      <CreatePost />

      <hr className="my-5" />

      <PostList />

      <hr className="my-5" />

      <AxiosDemo />
    </div>
  );
}

export default App;
