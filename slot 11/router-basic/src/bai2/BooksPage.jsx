
import { Table } from 'react-bootstrap';

const books = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin'
  },
  {
    id: 2,
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke'
  },
  {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas'
  }
];

export default function BooksPage() {
  return (
    <>
      <h1>Danh sách sách</h1>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
