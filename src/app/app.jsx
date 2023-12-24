import styles from "./app.module.css";
import AppHeader from "../components/app-header/app-header";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from "../pages/home/home";
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../components/modal/modal";
import IngredientDetails from "../features/ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchIngredientsAsync } from "../features/burger-ingredients/burger-ingredients-slice";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { ForgotPassPage } from "../pages/forgot-password/forgot-password";
import { ResetPassPage } from "../pages/reset-password/reset-password";
import { ProfilePage } from "../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../components/protected-route/protected-route";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsAsync());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
    <div id="app" className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassPage/>} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassPage/>} />} />
        <Route path="*" element={<p className="text text_type_main-large">Страница не найдена</p>} />
      </Routes>
    </div>

    {background && (
        <Routes>
	        <Route
	          path='/ingredients/:ingredientId'
	          element={
	            <Modal onClose={handleModalClose} title='Детали ингридиента'>
	              <IngredientDetails modal={true} />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </>
  );
}

export default App;
