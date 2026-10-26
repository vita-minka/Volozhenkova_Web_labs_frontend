import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { FeedPage } from './pages/FeedPage';
import { TilePage } from './pages/TilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/tile" element={<TilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;