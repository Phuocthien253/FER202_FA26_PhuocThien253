import { Row, Col } from "react-bootstrap";
import { products } from "../data/products";
import MyProduct from "../components/MyProduct";

function Home() {
  return (
    <div className="container mt-4">
      <h1>Home</h1>

      <Row>
        {products.map((product) => (
          <Col md={4} className="mb-3" key={product.id}>
            <MyProduct product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;