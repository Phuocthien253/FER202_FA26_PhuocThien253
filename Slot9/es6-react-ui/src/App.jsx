import {
  Header,
  Footer,
  WelcomeCard,
  StudentCard,
  ProductList,
  CartTable,
  RegisterForm
} from './components';

import { products } from './data/products';
import studentAvatar from './assets/student-avatar.jpeg';

// BTVN Lab4 - Hooks
import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header từ Bài 9 ES6 */}
      <Header />

      <main className="container my-4 flex-grow-1">

        {/* ========================= */}
        {/* BTVN LAB4 - REACT HOOKS */}
        {/* ========================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 1: Quantity Picker and Mini Cart using useState
          </h2>

          {/* PHẦN 1 - QUANTITY PICKER */}

          <div className="mb-4">
            <h5>Quantity Picker 1</h5>
            <QuantityPicker />
          </div>

          <div className="mb-4">
            <h5>Quantity Picker 2</h5>
            <QuantityPicker min={2} max={5} />
          </div>

          <hr className="my-4" />

          {/* PHẦN 2 - MINI CART */}

          <MiniCart />
        </section>

        {/* ========================= */}
        {/* CÁC BÀI ES6 CŨ */}
        {/* ========================= */}

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 1: Thẻ chào mừng (WelcomeCard)
          </h3>

          <WelcomeCard />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 2: Thẻ sinh viên (StudentCard)
          </h3>

          <StudentCard
            student={{
              id: 'SV180059',
              name: 'Nguyen Phuoc Thien',
              major: 'Kỹ thuật phần mềm',
              gpa: 3.5,
              avatar: studentAvatar,
              contact: {
                email: 'phuocthien189@gmail.com',
                phone: '0779409856',
              },
            }}
          />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 4 & 5: Danh sách sản phẩm (ProductList)
          </h3>

          <ProductList products={products} />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 7: Giỏ hàng (CartTable)
          </h3>

          <CartTable />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 8: Form đăng ký (RegisterForm)
          </h3>

          <RegisterForm />
        </section>
      </main>

      {/* Footer từ Bài 9 ES6 */}
      <Footer />
    </div>
  );
}

export default App;