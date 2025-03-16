import { Outlet } from 'react-router-dom';
import BottomNavigation from './components/layout/BottomNavigation';
import './App.css';

import Header from './components/layout/Header';
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNavigation />
    </>
  );
}

export default App;
