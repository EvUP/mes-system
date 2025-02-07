import { createRoot } from 'react-dom/client';
import App from './app/App';
import { store } from './app/lib/store';
import { injectStore } from './shared/api/axiosInstance';
// import './styles.css';

createRoot(document.getElementById('root')!).render(<App />);
injectStore(store);
