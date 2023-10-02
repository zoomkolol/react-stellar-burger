import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <main className={ styles.app }>
      <AppHeader />
      <div className={ styles.burgerConstructor }>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
}

export default App;
