import React from "react";

const TotalPriceContext = React.createContext(null);

export function TotalPriceProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
      <TotalPriceContext.Provider value={{state, dispatch}}>
        {children}
      </TotalPriceContext.Provider>
  )
};

export function useTotalPrice() {
  return React.useContext(TotalPriceContext);
}

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_BUN_PRICE': {
      return  {
        bunPrice: action.amount,
        ingredientPrice: state.ingredientPrice
      }
    }
    case 'ADD_INGREDIENT_PRICE': {
      return  {
        bunPrice: state.bunPrice,
        ingredientPrice: state.ingredientPrice + action.amount
      }
    }
    case 'RESET_PRICE': {
      return {
        totalPrice: 0,
      }
    }
    default: {
      throw Error('Неверный тип action: ' + action.type)
    }
  }
}

const initialState = {
  bunPrice: 0,
  ingredientPrice: 0,
};
