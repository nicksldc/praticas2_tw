import { createContext, useState, useEffect, useContext } from 'react';
import { fetchItems, createItem } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar itens. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item) => {
    try {
      const newItem = await createItem(item);
      setItems(prevItems => [...prevItems, newItem]);
      return true;
    } catch (err) {
      setError('Falha ao adicionar item.');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <AppContext.Provider value={{ 
      items, 
      loading, 
      error, 
      addItem,
      reloadItems: loadItems
    }}>
      {children}
    </AppContext.Provider>
  );
};