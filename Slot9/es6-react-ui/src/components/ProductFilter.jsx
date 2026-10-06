import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import ProductList from './ProductList';
import { getFinalPrice } from '../utils/format';

const sorters = {
  default: () => 0,

  priceAsc: (a, b) =>
    getFinalPrice(a) - getFinalPrice(b),

  priceDesc: (a, b) =>
    getFinalPrice(b) - getFinalPrice(a),

  ratingDesc: (a, b) =>
    (b.rating?.rate ?? 0) -
    (a.rating?.rate ?? 0),
};

const ProductFilter = ({
  products,
  onAddToCart,
}) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] =
    useState('Tất cả');
  const [onlyInStock, setOnlyInStock] =
    useState(false);
  const [sortBy, setSortBy] =
    useState('default');

  const categories = [
    'Tất cả',
    ...new Set(
      products.map(
        (p) => p.category?.name ?? 'Khác'
      )
    ),
  ];

  const visibleProducts = products
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          keyword.trim().toLowerCase()
        )
    )
    .filter(
      (product) =>
        category === 'Tất cả' ||
        product.category?.name === category
    )
    .filter(
      (product) =>
        !onlyInStock || product.inStock
    )
    .sort(sorters[sortBy]);

  const clearFilters = () => {
    setKeyword('');
    setCategory('Tất cả');
    setOnlyInStock(false);
    setSortBy('default');
  };

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <Form.Label>Tìm kiếm</Form.Label>

          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm..."
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <Form.Label>Sắp xếp</Form.Label>

          <Form.Select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="default">
              Mặc định
            </option>

            <option value="priceAsc">
              Giá tăng dần
            </option>

            <option value="priceDesc">
              Giá giảm dần
            </option>

            <option value="ratingDesc">
              Đánh giá cao
            </option>
          </Form.Select>
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <Form.Check
            type="switch"
            id="stock-switch"
            label="Còn hàng"
            checked={onlyInStock}
            onChange={(e) =>
              setOnlyInStock(
                e.target.checked
              )
            }
          />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        {categories.map((name) => (
          <Button
            key={name}
            size="sm"
            variant={
              category === name
                ? 'primary'
                : 'outline-primary'
            }
            onClick={() =>
              setCategory(name)
            }
          >
            {name}
          </Button>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <strong>
          Tìm thấy {visibleProducts.length}/
          {products.length} sản phẩm
        </strong>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={clearFilters}
        >
          Xóa lọc
        </Button>
      </div>

      {visibleProducts.length === 0 ? (
        <Alert variant="warning">
          Không có sản phẩm phù hợp
        </Alert>
      ) : (
        <ProductList
          products={visibleProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
};

export default ProductFilter;