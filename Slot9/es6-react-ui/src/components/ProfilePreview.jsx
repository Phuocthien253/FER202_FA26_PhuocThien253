import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const MAX_BIO = 150;

const majors = [
  'Kỹ thuật phần mềm',
  'Khoa học máy tính',
  'Hệ thống thông tin',
  'An toàn thông tin',
];

const ProfilePreview = () => {
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState(majors[0]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const remaining = MAX_BIO - bio.length;

  const handleNameKeyDown = (e) => {
    if (e.key === 'Escape') {
      setFullName('');
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value.slice(0, MAX_BIO));
  };

  return (
    <Row className="g-4">
      {/* FORM */}
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Thông tin hồ sơ</Card.Title>

            <Form onSubmit={(e) => e.preventDefault()}>
              {/* HỌ TÊN */}
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>

                <Form.Control
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  onFocus={() => setFocused('fullName')}
                  onBlur={() => setFocused('')}
                  className={
                    focused === 'fullName'
                      ? 'border-primary border-2'
                      : ''
                  }
                  placeholder="Nhập họ tên"
                />
              </Form.Group>

              {/* CHUYÊN NGÀNH */}
              <Form.Group className="mb-3">
                <Form.Label>Chuyên ngành</Form.Label>

                <Form.Select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                >
                  {majors.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* GIỚI THIỆU */}
              <Form.Group className="mb-3">
                <Form.Label>Giới thiệu</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={4}
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="Giới thiệu ngắn về bạn"
                />

                <Form.Text
                  className={
                    remaining < 20
                      ? 'text-danger'
                      : 'text-muted'
                  }
                >
                  Còn {remaining}/{MAX_BIO} ký tự
                </Form.Text>
              </Form.Group>

              {/* MẬT KHẨU */}
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>

                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Nhập mật khẩu"
                  />

                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setShowPassword((s) => !s)
                    }
                  >
                    {showPassword ? 'Ẩn' : 'Hiện'}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      {/* PREVIEW */}
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Xem trước</Card.Title>

            <h4>
              {fullName.trim() || 'Chưa nhập tên'}
            </h4>

            <p>
              <strong>Chuyên ngành:</strong> {major}
            </p>

            <p>
              <strong>Giới thiệu:</strong>{' '}
              {bio.trim() ? (
                bio
              ) : (
                <em>Chưa có giới thiệu</em>
              )}
            </p>

            <p>
              <strong>Độ dài mật khẩu:</strong>{' '}
              {password.length} ký tự
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePreview;