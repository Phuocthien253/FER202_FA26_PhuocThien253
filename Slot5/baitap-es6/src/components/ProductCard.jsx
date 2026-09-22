import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ product }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock = true,
    discount = 0,
  } = product;

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const rate = rating?.rate ?? 'Chưa có';
  const count = rating?.count ?? 0;

  const displayPrice = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ?? 'Liên hệ';
  const finalPrice = typeof price === 'number' ? price * (1 - discount / 100) : null;
  const displayFinalPrice = finalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <Card className={`h-100 position-relative ${inStock ? '' : 'opacity-50'}`}>
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}
      <Card.Img variant="top" src={imageSrc} height="180" style={{ objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="info" className="me-1">{categoryName}</Badge>
          {inStock ? <Badge bg="success">Còn hàng</Badge> : <Badge bg="secondary">Hết hàng</Badge>}
          {rating?.rate >= 4.5 && <Badge bg="warning" text="dark" className="ms-1">Bán chạy</Badge>}
        </div>

        <Card.Title>{name}</Card.Title>
        <Card.Text className="mb-2">
          Đánh giá: ⭐ {rate} ({count} nhận xét)
        </Card.Text>

        <div className="mt-auto mb-3">
          {discount > 0 ? (
            <div>
              <span className="text-decoration-line-through text-muted me-2">{displayPrice}</span>
              <strong className="text-danger fs-5">{displayFinalPrice}</strong>
            </div>
          ) : (
            <strong className="fs-5">{displayPrice}</strong>
          )}
        </div>

        <Button variant="primary" disabled={!inStock} className="w-100">
          {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;