import './App.css'
import ProductInfo from './components/ProductInfo'

function App() {
  return (
    <div className="App">
      <h1>Bài tập Props - ReactJS</h1>
      
      <ProductInfo
        image="image/1.jpg"
        name="iPhone 15 Pro Max"
        price={34990000}
        tag="Điện thoại"
      />

      <ProductInfo
        image="image/2.jpg"     
        name="Samsung Galaxy S24 Ultra"
        price={31990000}
        tag="Điện thoại"
      />

      <ProductInfo
        name="MacBook Pro M3"
        price={49990000}
        tag="Laptop"
      />
    </div>
  )
}

export default App