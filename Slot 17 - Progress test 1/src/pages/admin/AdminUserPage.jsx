import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import userApi from '../../api/userApi';
import { getErrorMessage } from '../../api/axiosClient';
import Loading from '../../components/Loading';
import ErrorAlert from '../../components/ErrorAlert';

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO-11: Tải danh sách người dùng
  useEffect(() => {
    const load = async () => {
      try {
        setUsers(await userApi.getAll());
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // TODO-11: Loading và Error
  if (loading) {
    return <Loading text="Đang tải người dùng..." />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <>
      {/* TODO-11: Tiêu đề và số lượng */}
      <h3 className="fw-bold mb-3">
        Quản lý người dùng ({users.length})
      </h3>

      <Table bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>

              <td>
                {u.role === 'admin' ? (
                  <Badge bg="danger">Admin</Badge>
                ) : (
                  <Badge bg="secondary">Khách hàng</Badge>
                )}
              </td>

              <td>
                {u.active ? (
  <Badge bg="success">Hoạt động</Badge>
) : (
  <Badge bg="dark">Đã khoá</Badge>
)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}