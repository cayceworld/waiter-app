import { fetchTables } from './redux/tablesReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound'
import Header from './components/views/Header/Header';
import SingleTable from './components/pages/SingleTable/SingleTable';
import Footer from './components/views/Footer/Footer';


function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/table/:id" element={<SingleTable />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
