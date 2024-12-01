import MainPage from '@pages/Main';
import { createRoot, Container } from 'react-dom/client';

const werender = (el: Container, identifierPrefix = 'we') => {
  createRoot(el, { identifierPrefix }).render(<MainPage />);
};

export default werender;
