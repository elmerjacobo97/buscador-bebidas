import { Container } from 'react-bootstrap';
import Formulario from './components/Formulario';
import { CategoriesProvider } from './context/CategoriesProvider';
import { BebidasProvider } from './context/BebidasProvider';
import ListadoBebidas from './components/ListadoBebidas';
import ModalBebida from './components/ModalBebida';

function App() {
    return (
        <CategoriesProvider>
            <BebidasProvider>
                <header className='py-5'>
                    <h1>Buscador de Bebidas</h1>
                </header>
                <Container fluid='xl' className='mt-5'>
                    <Formulario />
                    <ListadoBebidas />
                    <ModalBebida />
                </Container>{' '}
            </BebidasProvider>
        </CategoriesProvider>
    );
}

export default App;
