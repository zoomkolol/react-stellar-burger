type initialState = {
  burgerFeatureElements: string[]
}

const initialState: initialState = {
  burgerFeatureElements: ['burgerIngredients', 'burgerConstructor']
}

export const dropTargetReducer = (state = initialState) => {
  return state;
};
