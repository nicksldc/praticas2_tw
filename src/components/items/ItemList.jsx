import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import styles from './ItemList.module.css';

const ItemList = () => {
  const { items, loading, error, reloadItems } = useContext(AppContext);

  if (loading) {
    return <div className={styles.loading}>Carregando itens...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={reloadItems}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {items.length === 0 ? (
        <p className={styles.empty}>Nenhum item cadastrado</p>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <h3>{item.name}</h3>
              <p>{item.email}</p>
              <div className={styles.id}>ID: {item.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;