import request from "../utils/request";

const config ={
  headers: {
    "Content-Type": "application/json",
  },
}

export function fetchIngredients() {
  const settings = {
    method: 'GET',
    headers: config.headers
  }

  return request('/ingredients', settings)
};

export const getOrderDetails = async (ingredients) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'ingredients': ingredients
    })
  }

  return request('/orders', settings);
}
