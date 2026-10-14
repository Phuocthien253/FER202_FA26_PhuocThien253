import { Container, Row, Col } from "react-bootstrap";
import { products } from "../data/products";
import MyProduct from "../components/MyProduct";

function ProductList() {
  return (
    <Container className="mt-4 mb-4">
      <h1 className="mb-4">Product List</h1>

      <Row>
        {products.map((product) => (
          <Col
            key={product.id}
            xs={12}
            md={6}
            lg={4}
            className="mb-4"
          >
            <MyProduct product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;