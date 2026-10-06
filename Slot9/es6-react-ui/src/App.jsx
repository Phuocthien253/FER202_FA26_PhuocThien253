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

// =========================
// BTVN LAB4 - REACT HOOKS
// =========================
import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container my-4 flex-grow-1">

        {/* ================================================= */}
        {/* BTVN LAB4 - BÀI 1 */}
        {/* ================================================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 1: Quantity Picker and Mini Cart using useState
          </h2>

          <div className="mb-4">
            <h5>
              Quantity Picker 1
            </h5>

            <QuantityPicker />
          </div>

          <div className="mb-4">
            <h5>
              Quantity Picker 2
            </h5>

            <QuantityPicker
              min={2}
              max={5}
            />
          </div>

          <hr className="my-4" />

          <MiniCart />
        </section>

        {/* ================================================= */}
        {/* BTVN LAB4 - BÀI 2 */}
        {/* ================================================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 2: Profile Preview
          </h2>

          <ProfilePreview />
        </section>

        {/* ================================================= */}
        {/* BTVN LAB4 - BÀI 3 */}
        {/* ================================================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 3: Product Search, Filter and Sort
          </h2>

          <ProductFilter
            products={products}
          />
        </section>

        {/* ================================================= */}
        {/* BTVN LAB4 - BÀI 4 */}
        {/* ================================================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 4: Controlled Registration Form
          </h2>

          <RegisterForm />
        </section>

        {/* ================================================= */}
        {/* BTVN LAB4 - BÀI 5 */}
        {/* ================================================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 5: Registration Form Validation
          </h2>

          <ValidatedRegisterForm />
        </section>

        {/* ================================================= */}
        {/* BTVN LAB4 - BÀI 6 */}
        {/* ================================================= */}

        <section className="mb-5">
          <h2 className="text-danger border-bottom pb-2">
            BTVN Lab4 - Bài 6: Todo List using useState
          </h2>

          <TodoList />
        </section>

        {/* ================================================= */}
        {/* CÁC BÀI ES6 CŨ */}
        {/* ================================================= */}

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
              major:
                'Kỹ thuật phần mềm',
              gpa: 3.5,
              avatar:
                studentAvatar,
              contact: {
                email:
                  'phuocthien189@gmail.com',
                phone:
                  '0779409856',
              },
            }}
          />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 4 & 5: Danh sách sản phẩm (ProductList)
          </h3>

          <ProductList
            products={products}
          />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">
            Bài 7: Giỏ hàng (CartTable)
          </h3>

          <CartTable />
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default App;