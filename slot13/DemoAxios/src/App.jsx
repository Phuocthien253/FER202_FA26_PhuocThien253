
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className="container mt-5">
      <h1>DemoAxios</h1>
      <hr />

      <CreatePost />

      <hr className="my-5" />

      <PostList />

      <hr className="my-5" />

      <AxiosDemo />
    </div>
  );
}

export default App;
