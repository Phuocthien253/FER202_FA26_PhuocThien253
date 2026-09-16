import About from './About'
import './App.css'

function App() {
  const user = {
    name: "Quang Ngoc",
    email: "quangngoc@example.com"
  };

  return (
    <div className="App">
      <h1>Welcome to My First App</h1>
      <About user={user} />
    </div>
  );
}
export default App
