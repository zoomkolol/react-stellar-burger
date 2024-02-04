import BurgerIngredients from "../../features/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../features/burger-constructor/burger-constructor";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home.module.css';

export function HomePage() {
  return(
    <DndProvider backend={HTML5Backend}>
      <main className={styles.burgerConstructor}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  )
}
