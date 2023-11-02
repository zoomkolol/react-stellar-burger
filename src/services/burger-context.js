import React, { useContext } from "react";

const BurgerContext = React.createContext(null);

export function BurgerProvider({ children }) {
  const [burgerState, dispatch] = React.useReducer(burgerReducer, initialBurger);

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
    case 'RESET_CONSTRUCTOR': {
      return {
        bun: {},
        ingredients: []
      }
    }
    default: {
      throw Error('Неверный тип action: ' + action.type);
    }
  }
}

export const dispatchBurgerAction = dispatch => ({
  addBun: bun => dispatch({type: 'ADD_BUN', bun}),
  addIngredient: ingredient => dispatch({type: 'ADD_INGREDIENT', ingredient}),
  resetConstructor: () => dispatch({type: 'RESET_CONSTRUCTOR'})
})

const initialBurger = {
  bun: {},
  ingredients: []
};


//TODO: СДЕЛАТЬ РЕСЕТ КОНСТРУКТОРА!
