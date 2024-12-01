import MainPage from '@pages/Main';
import { createRoot, Container } from 'react-dom/client';

const RenderWebEditor = (el: Container, identifierPrefix = 'we') => {
  createRoot(el, { identifierPrefix }).render(<MainPage />);
};

export default RenderWebEditor;
