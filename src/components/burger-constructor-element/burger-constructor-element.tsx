import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react';
import { sortIngredients, deleteIngredient } from '../../features/burger-constructor/burger-constructor-slice';
import { useAppDispatch } from '../../common/hooks/hooks';
import { TIngredient } from '../../common/types/types';

type Props = {
  ingredient: TIngredient;
  index: number;
};

function BurgerConstructorElement({ ingredient, index }: Props) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover: (item: {index: number}, monitor) => {
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
      const hoverClientY = clientOffset?.y !== undefined ? clientOffset.y - hoverBoundingRect.top : undefined;

      if (dragIndex < hoverIndex && hoverClientY !== undefined && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY !== undefined && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
      dispatch(sortIngredients({dragIndex, hoverIndex}));
    },
  });

  const handleDelete = () => {
    dispatch(deleteIngredient(ingredient));
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1
  drag(drop(ref));

  return (
    <div draggable ref={ref} style={{opacity}} className={ styles.element }>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name as string}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleDelete}
      />
    </div>
  );
}

export default BurgerConstructorElement;
