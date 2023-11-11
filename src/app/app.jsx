import styles from "./app.module.css";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../features/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../features/burger-constructor/burger-constructor";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div id="app" className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.burgerConstructor}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
