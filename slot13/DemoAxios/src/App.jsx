import Container from 'react-bootstrap/Container';
import AxiosDemo from './components/AxiosDemo';
import GetPosts from './components/GetPosts';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';

function App() {
  return (
    <Container className="py-4">
      <h1 className="text-primary">DemoAxios</h1>
      <p>Exercise 27: Demo about Axios</p>
      <hr />

      <AxiosDemo />
      <GetPosts />
      <CreatePost />
      <UpdatePost />
      <PatchPost />
      <DeletePost />
      <RequestConfig />
    </Container>
  );
}

export default App;