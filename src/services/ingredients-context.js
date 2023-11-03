import React, { useContext } from "react";
import { fetchIngredients } from "./api";

const IngredientsContext = React.createContext(null);

export function IngredientsProvider({ children }) {
  const [state, setState] = React.useState({
    ingredients: [],
    loading: true
  });

  React.useEffect(() => {
    fetchIngredients()
    .then((data) => {
      setState({
        ingredients: data.data,
        loading: false
      });
    })
    .catch(err => {
      console.log(err)
      setState({
        ingredients: {},
        loading: false
      });
    })
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


