import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientsProvider } from "../../services/ingredients-context";
import { BurgerProvider } from "../../services/burger-context";
import { TotalPriceProvider } from "../../services/total-price-context";

function App() {
  return (
    <div id="app" className={styles.app}>
      <AppHeader />
        <main className={styles.burgerConstructor}>
            <IngredientsProvider>
              <BurgerProvider>
                <TotalPriceProvider>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </TotalPriceProvider>
              </BurgerProvider>
            </IngredientsProvider>
        </main>
    </div>
  );
}

export default App;
