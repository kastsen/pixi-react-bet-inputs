import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Импортируем Provider
import { store } from './store';  // Импортируем store
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    );
} else {
    console.error('Root element not found!');
}
