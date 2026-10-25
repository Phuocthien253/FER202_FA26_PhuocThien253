
import CreatePost from "../CreatePost";
import UpdatePost from "../UpdatePost";
import PatchPost from "../PatchPost";
import DeletePost from "../DeletePost";
import RequestConfig from "../RequestConfig";

export default function HttpRequestsPage() {
  return (
    <>
      <h2>HTTP Requests</h2>
      <CreatePost />
      <hr />
      <UpdatePost />
      <hr />
      <PatchPost />
      <hr />
      <DeletePost />
      <hr />
      <RequestConfig />
    </>
  );
}
