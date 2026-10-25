import UseAxiosDemo from "./UseAxiosDemo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import SearchPostsPage from "./pages/SearchPostsPage";
import AxiosDemoPage from "./pages/AxiosDemoPage";
import HttpRequestsPage from "./pages/HttpRequestsPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import BulkDeletePostsPage from "./pages/BulkDeletePostsPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="posts/bulk-delete" element={<BulkDeletePostsPage />} />
        <Route path="posts/search" element={<SearchPostsPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<AxiosDemoPage />} />
          <Route path="http-requests" element={<HttpRequestsPage />} />
          <Route path="posts" element={<PostListPage />} />
          <Route path="posts/create" element={<PostCreatePage />} />
          <Route path="posts/:id" element={<PostDetailPage />} />
          <Route path="posts/:id/edit" element={<PostEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
