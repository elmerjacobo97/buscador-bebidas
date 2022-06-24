import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const obtenerCategories = async () => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const { data } = await axios(url);
            setCategories(data.drinks);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        obtenerCategories()
            .then((r) => r)
            .catch((e) => console.log(e));
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export { CategoriesProvider };
export default CategoriesContext;
