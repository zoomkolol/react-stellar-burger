import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";

function App() {
  const [state, setState] = useState({
    ingredients: [],
    loading: false
  });
  const fetchUrl = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...state, loading: true });
      try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        setState({
          ingredients: data.data,
          loading: false
        });
      } catch (err) {
        console.log(err);
        setState({
          ingredients: null,
          loading: false
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div id="app" className={styles.app}>
      <AppHeader />
      {!state.loading && (
        <main className={styles.burgerConstructor}>
          <BurgerIngredients data={state.ingredients} />
          <BurgerConstructor data={state.ingredients} />
        </main>
      )}
    </div>
  );
}

export default App;
