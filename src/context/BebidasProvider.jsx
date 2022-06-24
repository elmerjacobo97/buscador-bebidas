import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaID, setBebidaID] = useState(null);
    const [receta, setReceta] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(true);
        const obtenerReceta = async () => {
            if (!bebidaID) return;

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaID}`;
                const { data } = await axios(url);
                setReceta(data.drinks[0]);
            } catch (e) {
                console.log(e);
            }
            setCargando(false);
        };
        obtenerReceta()
            .then((r) => r)
            .catch((e) => console.log(e));
    }, [bebidaID]);

    const consultarBebida = async (datos) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.category}`;
            const { data } = await axios(url);
            setBebidas(data.drinks);
        } catch (e) {
            console.log(e);
        }
    };

    const handleModalClick = () => {
        setModal(!modal);
    };

    const handleBebidaIdClick = (id) => {
        setBebidaID(id);
    };

    return (
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                modal,
                handleModalClick,
                handleBebidaIdClick,
                receta,
                cargando,
            }}
        >
            {children}
        </BebidasContext.Provider>
    );
};

export { BebidasProvider };
export default BebidasContext;
