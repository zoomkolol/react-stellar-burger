import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkUserAuth } from "../../common/services/action";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../common/hooks/hooks";

type Props = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component }: Props) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store: RootState) => store.user.isAuthChecked);
  const user = useSelector((store: RootState) => store.user.user);
  const location = useLocation();
  const dispatch = useAppDispatch();


  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    dispatch(checkUserAuth());
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: Props) => (
  <Protected onlyUnAuth={true} component={component} />
);
