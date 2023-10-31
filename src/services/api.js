export const fetchIngredients = async () => {
  const fetchUrl = 'https://norma.nomoreparties.space/api/ingredients';

  try {
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (err) {
    throw err;
  }
};

export const getOrderDetails = async (ingredients) => {
  const fetchUrl = 'https://norma.nomoreparties.space/api/orders';
  const settings = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'ingredients': ingredients
    })
  }

  try {
    const response = await fetch(fetchUrl, settings)
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
