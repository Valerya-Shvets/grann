import api from "../../api/axios";

export const SET_PHOTO = "SET_PHOTO";
export const SET_PHOTO_ID = "SET_PHOTO_ID";

export const setPhoto = (photoUrl) => ({
  type: SET_PHOTO,
  payload: photoUrl,
});

export const setPhotoId = (photoId) => ({
  type: SET_PHOTO_ID,
  payload: photoId,
});

export const createPhoto = (photoName, photo) => async (dispatch, getState) => {
  api
    .post("api/Photo", photo, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
    .then((response) => dispatch(setPhotoId(response.data)));
};

// export const getPhoto = (id) => async (dispatch, getState) => {

// }
