import { APP_NAME } from '../../data/menu';

const Footer = () => (
  <footer className="bg-light text-center py-3 mt-5 border-top">
    <p className="mb-0">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
  </footer>
);

export default Footer;
