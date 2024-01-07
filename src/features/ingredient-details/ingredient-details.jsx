import styles from './ingredient-details.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


export default function IngredientDetails({modal = false}) {
  const ingId = useParams().ingredientId;
  const getIngredient = state => state.burgerIngredients.ingredients;
  const ingredients = useSelector(getIngredient);
  const ingredient = ingredients.find(element => element._id === ingId);

  if(!ingredient) {
    return null
  }

  return (
    <div className={ styles.container }>
      <h2 className={(modal ? styles.title  : styles.title_full) + " text text_type_main-large pl-10 pt-10 pr-10`" }>
        Детали ингредиента
      </h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium pt-4">{ingredient.name}</p>
      <div className={`${ styles.valueCotainer } pt-8 pb-15`}>
        <div className={`${ styles.value } pr-5`}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={`${ styles.value } pr-5`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={`${ styles.value } pr-5`}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={`${ styles.value } pr-5`}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}
