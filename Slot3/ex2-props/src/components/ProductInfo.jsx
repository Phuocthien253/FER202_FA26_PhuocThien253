function ProductInfo({ name, price, tag, image }) {
  return (
    <div className="product-info">
      <h2>Thông tin sản phẩm</h2>
      <img src={image} alt={name} />
      <p><strong>Tên:</strong> {name}</p>
      <p><strong>Giá:</strong> {price.toLocaleString('vi-VN')} VNĐ</p>
      <p><strong>Tag:</strong> {tag}</p>
    </div>
  )
}

export default ProductInfo