import { ConstructorElement, DragIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { ingredientPropType } from "../../common/utils/prop-types.js";
import { useDrag, useDrop } from 'react-dnd'
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sortIngredients, deleteIngredient, switchIngredients } from '../../features/burger-constructor/burger-constructor-slice';

function BurgerConstructorElement({ ingredient, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  /*const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch(sortIngredients({dragIndex, hoverIndex}));
  }, [])*/

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(sortIngredients({dragIndex, hoverIndex}));
      item.index = hoverIndex;
    },
  });

  const handleDelete = () => {
    dispatch(deleteIngredient(ingredient));
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging ? 0 : 1
  drag(drop(ref));

  return (
    <div draggable ref={ref} style={{opacity}} className={ styles.element }>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleDelete}
      />
    </div>
  );
}

BurgerConstructorElement.propTypes = {
  ingredient: ingredientPropType
}

export default BurgerConstructorElement;
