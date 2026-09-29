import ProductInfo from './ProductInfo'
import './ProductList.css'
import menu1 from '../assets/Images/menu1.jpg'
import menu2 from '../assets/Images/menu2.jpg'
import menu3 from '../assets/Images/menu3.jpg'
import menu4 from '../assets/Images/menu4.jpg'

function ProductList() {
  const products = [
    {
      image: menu1,
      name: 'Margherita Pizza',
      oldPrice: '$40.00',
      price: '$30.00',
      tag: 'SALE',
    },
    {
      image: menu2,
      name: 'Mushroom Pizza',
      oldPrice: '',
      price: '$25.00',
      tag: '',
    },
    {
      image: menu3,
      name: 'Hawaiian Pizza',
      oldPrice: '',
      price: '$30.00',
      tag: 'NEW',
    },
    {
      image: menu4,
      name: 'Pesto Pizza',
      oldPrice: '$40.00',
      price: '$30.00',
      tag: 'SALE',
    },
  ]

  return (
    <section className="menu-section">
      <div className="container">
        <h2 className="menu-title">Our Menu</h2>

        <div className="row g-3">
          {products.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-3" key={index}>
              <ProductInfo
                image={product.image}
                name={product.name}
                oldPrice={product.oldPrice}
                price={product.price}
                tag={product.tag}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList