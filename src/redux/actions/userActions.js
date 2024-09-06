import api from "../../api/axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_LINK = "SET_LINK";

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: password,
});

export const setLink = (link) => ({
  type: SET_LINK,
  payload: link,
});

export const sendLogin =
  (email, password, navigate, setAuth) => async (dispatch, getState) => {
    api
      .post("api/Auth/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        const role = response.data.role;
        const token = response.data.token;
        setAuth({ role, token });
        role == "Admin"
          ? navigate("/admin", { replace: true })
          : role == "Chef"
          ? navigate("/chef", { replace: true })
          : alert("Невірна пошта або пароль");
      });
  };

export const changePassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    api
      .put("api/Auth", {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then(alert("Пароль успішно змінено!"));
    dispatch(setPassword(newPassword));
  };

export const getLink = () => async (dispatch, getState) => {
  api.get("api/Auth/register/chef/getToken").then((response) => {
    dispatch(setLink(response.data));
  });
};

export const resetLink = () => async (dispatch, getState) => {
  api
    .get("api/Auth/register/chef/resetToken")
    .then((response) => dispatch(setLink(response.data)));
};

export const sendRegisterToken =
  (chef, token, navigate) => async (dispatch, getState) => {
    api.post(`api/Auth/register/chef/${token}`, chef).then(navigate("/login"));
  };
