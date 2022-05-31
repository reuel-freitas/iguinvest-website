
import { useContext } from 'react'
import { AppRoutes } from './Routes';
import { Header } from './components/layout/header';
import Footer from './components/layout/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading } from './components/Loading';
import { AppContext, AppProvider } from './contexts/AppContext';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme'
import { ImoveisProvider } from './contexts/ImoveisContext';

function App() {
  const { loading } = useContext(AppContext)
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <ImoveisProvider>
          <div>
            <Header />
            <AppRoutes />
            <Footer />
            {loading && <Loading />}
          </div>
        </ImoveisProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
