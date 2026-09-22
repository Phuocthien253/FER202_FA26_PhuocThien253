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
import studentAvatar from './assets/student-avatar.jpg';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header từ Bài 9 */}
      <Header />

      {/* bài từ 1 đến 8 */}
      <main className="container my-4 flex-grow-1">
        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">Bài 1: Thẻ chào mừng (WelcomeCard)</h3>
          <WelcomeCard />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">Bài 2: Thẻ sinh viên (StudentCard)</h3>
          <StudentCard
            student={{
              id: 'SV180059',
              name: 'Le Manh Duh ',
              major: 'Kỹ thuật phần mềm',
              gpa: 3.5,
              avatar: studentAvatar,
              contact: {
                email: 'manhduhne@gmail.com',
                phone: '0901234567',
              },
            }}
          />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">Bài 4 & 5: Danh sách sản phẩm (ProductList)</h3>
          <ProductList products={products} />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">Bài 7: Giỏ hàng (CartTable)</h3>
          <CartTable />
        </section>

        <section className="mb-5">
          <h3 className="text-primary border-bottom pb-2">Bài 8: Form đăng ký (RegisterForm)</h3>
          <RegisterForm />
        </section>
      </main>

      {/* Footer   Bài 9 */}
      <Footer />
    </div>
  );
}

export default App;