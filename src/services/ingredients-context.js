import React, { useContext } from "react";
import { fetchIngredients } from "./api";

const IngredientsContext = React.createContext(null);

export function IngredientsProvider({ children }) {
  const [state, setState] = React.useState({
    ingredients: [],
    loading: true
  });

  React.useEffect(() => {
    async function getIngredients() {
      try {
        const data = await fetchIngredients();
        setState({
          ingredients: data.data,
          loading: false
        });
      } catch (err) {
        console.log(err);
        setState({
          ingredients: {},
          loading: false
        });
      }
    }

    getIngredients();
  }, []);

  return (
    !state.loading ? (
      <IngredientsContext.Provider value={state.ingredients}>
        {children}
      </IngredientsContext.Provider>
    ) : null
  )
}

export function useIngredients() {
  return useContext(IngredientsContext);
}


