import {
  Layout,
  WelcomeCard,
  StudentCard,
  ProductList,
  CartTable,
  RegisterForm
} from './components';

import {
  products,
} from './data/products';

import studentAvatar from './assets/student-avatar.jpeg';

// =========================
// BTVN LAB4 - COMPONENTS
// =========================

import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';
import LoginForm from './components/LoginForm';

import CartDemoPage from './pages/CartDemoPage';

// =========================
// BÀI 9 - CONTEXT
// =========================

import {
  ThemeProvider,
} from './context/ThemeContext';

import {
  AuthProvider,
  useAuth,
} from './context/AuthContext';

const HomeContent = () => {
  const {
    isLoggedIn,
    user,
    login,
  } = useAuth();

  if (isLoggedIn) {
    return (
      <div className="alert alert-success">
        Bạn đang đăng nhập bằng{' '}
        <strong>
          {user.email}
        </strong>
        .

        <br />

        Thử bấm nút Tối/Sáng
        trên Header.
      </div>
    );
  }

  return (
    <LoginForm
      onLoginSuccess={login}
    />
  );
};

function AppContent() {
  return (
    <Layout title="BTVN Lab4 - React Hooks">

      {/* ============================= */}
      {/* BÀI 1 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 1:
          Quantity Picker and Mini
          Cart using useState
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

      {/* ============================= */}
      {/* BÀI 2 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 2:
          Profile Preview
        </h2>

        <ProfilePreview />
      </section>

      {/* ============================= */}
      {/* BÀI 3 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 3:
          Product Search, Filter
          and Sort
        </h2>

        <ProductFilter
          products={products}
        />
      </section>

      {/* ============================= */}
      {/* BÀI 4 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 4:
          Controlled Registration
          Form
        </h2>

        <RegisterForm />
      </section>

      {/* ============================= */}
      {/* BÀI 5 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 5:
          Registration Form
          Validation
        </h2>

        <ValidatedRegisterForm />
      </section>

      {/* ============================= */}
      {/* BÀI 6 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 6:
          Todo List using useState
        </h2>

        <TodoList />
      </section>

      {/* ============================= */}
      {/* BÀI 7 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 7:
          Shopping Cart using
          useReducer
        </h2>

        <CartDemoPage />
      </section>

      {/* ============================= */}
      {/* BÀI 8 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 8:
          Login Form using useReducer
        </h2>

        <LoginForm />
      </section>

      {/* ============================= */}
      {/* BÀI 9 */}
      {/* ============================= */}

      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2">
          BTVN Lab4 - Bài 9:
          Theme and Authentication
          using useContext
        </h2>

        <HomeContent />
      </section>

      {/* ============================= */}
      {/* CÁC BÀI ES6 CŨ */}
      {/* ============================= */}

      <section className="mb-5">
        <h3 className="text-primary border-bottom pb-2">
          Bài 1 ES6:
          WelcomeCard
        </h3>

        <WelcomeCard />
      </section>

      <section className="mb-5">
        <h3 className="text-primary border-bottom pb-2">
          Bài 2 ES6:
          StudentCard
        </h3>

        <StudentCard
          student={{
            id: 'SV180059',

            name:
              'Nguyen Phuoc Thien',

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
          Bài 4 & 5 ES6:
          ProductList
        </h3>

        <ProductList
          products={products}
        />
      </section>

      <section className="mb-5">
        <h3 className="text-primary border-bottom pb-2">
          Bài 7 ES6:
          CartTable
        </h3>

        <CartTable />
      </section>

    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;