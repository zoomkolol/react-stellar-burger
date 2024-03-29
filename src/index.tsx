import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
