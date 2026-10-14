import { Card, Button, Badge } from "react-bootstrap";

function MyProduct({ product }) {
  const finalPrice =
    product.price * (1 - product.discount / 100);

  const formatMoney = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Badge bg="primary">{product.category}</Badge>

        <Card.Title className="mt-3">
          {product.name}
        </Card.Title>

        <Card.Text>{product.description}</Card.Text>

        <p>Đánh giá: {product.rating}%</p>

        {product.discount > 0 && (
          <Badge bg="danger">
            Giảm {product.discount}%
          </Badge>
        )}

        <div className="mt-3">
          {product.discount > 0 && (
            <del className="text-muted">
              {formatMoney(product.price)}
            </del>
          )}

          <h5 className="text-danger mt-2">
            {formatMoney(finalPrice)}
          </h5>
        </div>

        {product.instock ? (
          <Button variant="success">
            Thêm vào giỏ
          </Button>
        ) : (
          <Badge bg="secondary">Hết hàng</Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default MyProduct;