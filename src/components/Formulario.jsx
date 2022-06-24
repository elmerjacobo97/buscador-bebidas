import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import useCategories from '../hooks/useCategories';
import useBebidas from '../hooks/useBebidas';

const Formulario = () => {
    const [search, setSearch] = useState({
        nombre: '',
        category: '',
    });
    const [alerta, setAlerta] = useState('');

    const { categories } = useCategories();
    const { consultarBebida } = useBebidas();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(search).includes('')) {
            setAlerta('Todos los campos son obligatorios');
            return;
        }
        setAlerta('');
        consultarBebida(search);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {alerta && (
                <Alert
                    variant='danger'
                    className='text-center animate__animated animate__fadeIn'
                >
                    {alerta}
                </Alert>
            )}
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label htmlFor='nombre'>Nombre Bebida</Form.Label>
                        <Form.Control
                            id='nombre'
                            type='text'
                            placeholder='Ej: Tequila, Vodka, etc'
                            name='nombre'
                            value={search.nombre}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label htmlFor='category'>
                            Categoría Bebida
                        </Form.Label>
                        <Form.Select
                            id='category'
                            name='category'
                            value={search.category}
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <option value=''>--Selecciona Categoría--</option>
                            {categories.map((category) => (
                                <option
                                    key={category.strCategory}
                                    value={category.strCategory}
                                >
                                    {category.strCategory}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='justify-content-end'>
                <Col md={3}>
                    <Button
                        type='submit'
                        variant='danger'
                        className='text-uppercase w-100 mt-5 fw-bold'
                    >
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Formulario;
