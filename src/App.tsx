import './App.css';
import { useAuth } from './context/useAuth';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';

function App() {
	const auth = useAuth();

	return <>{auth?.status === 'loggedIn' ? <MainPage /> : <LoginPage />}</>;
}

export default App;
