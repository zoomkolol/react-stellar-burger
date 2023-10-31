import React, { useContext } from "react";
import { fetchIngredients } from "./api";

const BurgerContext = React.createContext(null);

export function BurgerProvider({ children }) {
  const [burgerState, dispatch] = React.useReducer(burgerReducer, initialBurger);

  React.useEffect(() => {
    async function getInitialBun() {
      try {
        const data = await fetchIngredients();
        const bunArray = data.data.filter(function (element) {
          return element.type === 'bun'
        })
        dispatch({type: 'ADD_BUN', bun: bunArray[0]})
      } catch (err) {
        console.log(err);
      }
    }
    getInitialBun();
  }, []);

  return (
    <BurgerContext.Provider value={{burgerState, dispatch}}>
      {children}
    </BurgerContext.Provider>
  )
}

export function useBurger() {
  return useContext(BurgerContext);
}

function burgerReducer(burger, action) {
  switch (action.type) {
    case 'ADD_BUN': {
      return {
        bun: action.bun,
        ingredients: [...burger.ingredients]
      }
    }
    case 'ADD_INGREDIENT': {
      return {
        bun: {...burger.bun},
        ingredients: [...burger.ingredients, action.ingredient]
      }
    }
    case 'DELETE_INGREDIENT': {
      return {

      }
    }
    default: {
      throw Error('Неверный тип action: ' + action.type);
    }
  }
}

const initialBurger = {
  bun: {},
  ingredients: []
};


