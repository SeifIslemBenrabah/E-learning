
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import AuthWrapper from './Auth/AuthWrapper'
function App() {
  return (
    <div>
    <BrowserRouter>
    <AuthWrapper />
    </BrowserRouter>
    </div>
  );
}

export default App;
