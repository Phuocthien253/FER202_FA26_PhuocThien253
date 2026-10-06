import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';

const initialTodos = [
  {
    id: 1,
    title: 'Ôn lại ES6',
    done: true,
  },
  {
    id: 2,
    title: 'Làm bài tập useState',
    done: false,
  },
];

const FILTERS = {
  all: 'Tất cả',
  active: 'Chưa xong',
  done: 'Đã xong',
};

const TodoList = () => {
  const [todos, setTodos] =
    useState(initialTodos);

  const [title, setTitle] =
    useState('');

  const [error, setError] =
    useState('');

  const [filter, setFilter] =
    useState('all');

  const [editingId, setEditingId] =
    useState(null);

  const [editText, setEditText] =
    useState('');

  const validateTitle = (
    text,
    ignoreId = null
  ) => {
    const value = text.trim();

    if (!value) {
      return 'Nội dung không được để trống';
    }

    if (value.length > 60) {
      return 'Nội dung không được vượt quá 60 ký tự';
    }

    const duplicated = todos.some(
      (todo) =>
        todo.id !== ignoreId &&
        todo.title
          .trim()
          .toLowerCase() ===
          value.toLowerCase()
    );

    if (duplicated) {
      return 'Công việc đã tồn tại';
    }

    return '';
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newError =
      validateTitle(title);

    if (newError) {
      setError(newError);
      return;
    }

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        done: false,
      },
    ]);

    setTitle('');
    setError('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter(
        (todo) => todo.id !== id
      )
    );
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setError('');
  };

  const saveEdit = () => {
    if (editingId === null) {
      return;
    }

    const newError =
      validateTitle(
        editText,
        editingId
      );

    if (newError) {
      setError(newError);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              title: editText.trim(),
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText('');
    setError('');
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    }

    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const visibleTodos =
    todos.filter((todo) => {
      if (filter === 'active') {
        return !todo.done;
      }

      if (filter === 'done') {
        return todo.done;
      }

      return true;
    });

  const remaining =
    todos.filter(
      (todo) => !todo.done
    ).length;

  const clearCompleted = () => {
    setTodos((prev) =>
      prev.filter(
        (todo) => !todo.done
      )
    );
  };

  return (
    <Card>
      <Card.Header as="h4">
        Todo List
      </Card.Header>

      <Card.Body>
        <Form
          noValidate
          onSubmit={handleAdd}
          className="mb-4"
        >
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Nhập công việc..."
              value={title}
              onChange={(e) => {
                setTitle(
                  e.target.value
                );
                setError('');
              }}
              isInvalid={
                Boolean(error) &&
                editingId === null
              }
            />

            <Button type="submit">
              Thêm
            </Button>
          </div>

          {editingId === null && (
            <Form.Control.Feedback
              type="invalid"
              className={
                error
                  ? 'd-block'
                  : ''
              }
            >
              {error}
            </Form.Control.Feedback>
          )}
        </Form>

        <ButtonGroup className="mb-3">
          {Object.entries(
            FILTERS
          ).map(([key, label]) => (
            <Button
              key={key}
              variant={
                filter === key
                  ? 'primary'
                  : 'outline-primary'
              }
              onClick={() =>
                setFilter(key)
              }
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>

        {visibleTodos.length === 0 ? (
          <Alert variant="secondary">
            Không có công việc
          </Alert>
        ) : (
          <div className="mb-3">
            {visibleTodos.map(
              (todo) => (
                <div
                  key={todo.id}
                  className="d-flex align-items-center gap-2 border-bottom py-2"
                >
                  <Form.Check
                    type="checkbox"
                    checked={
                      todo.done
                    }
                    onChange={() =>
                      toggleTodo(
                        todo.id
                      )
                    }
                  />

                  <div
                    className="flex-grow-1"
                  >
                    {editingId ===
                    todo.id ? (
                      <>
                        <Form.Control
                          autoFocus
                          value={
                            editText
                          }
                          onChange={(
                            e
                          ) => {
                            setEditText(
                              e.target
                                .value
                            );
                            setError('');
                          }}
                          onKeyDown={
                            handleEditKeyDown
                          }
                          onBlur={
                            saveEdit
                          }
                          isInvalid={Boolean(
                            error
                          )}
                        />

                        <Form.Control.Feedback type="invalid">
                          {error}
                        </Form.Control.Feedback>
                      </>
                    ) : (
                      <span
                        onDoubleClick={() =>
                          startEdit(
                            todo
                          )
                        }
                        style={{
                          cursor:
                            'pointer',
                          textDecoration:
                            todo.done
                              ? 'line-through'
                              : 'none',
                        }}
                      >
                        {todo.title}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() =>
                      deleteTodo(
                        todo.id
                      )
                    }
                  >
                    Xóa
                  </Button>
                </div>
              )
            )}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <strong>
            Còn {remaining} việc chưa xong
          </strong>

          {todos.some(
            (todo) => todo.done
          ) && (
            <Button
              size="sm"
              variant="outline-danger"
              onClick={
                clearCompleted
              }
            >
              Xóa việc đã xong
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoList;