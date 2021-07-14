import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import instance from "../../shared/config";

const GET_HOSPITAL = "GET_HOSPITAL";

const getHospital = createAction(GET_HOSPITAL, (hospital) => ({ hospital }));

const initialState = {
  hospital: {
    hospitalName: "",
    hospitalImageSource: "",
    hospitalContent: "",
    hospitalRate: "",
    hospitalSubject: "",
    hospitalId: "",
    hospitalLocation: "",
    subjectList: [],
  },
};

export const getHospitalDB = (id) => {
  return function (dispatch, getState, { history }) {
    instance.get(`/hospitals/${id}`).then((result) => {
      dispatch(getHospital(result.data));
    });
  };
};

export default handleActions(
  {
    [GET_HOSPITAL]: (state, action) =>
      produce(state, (draft) => {
        draft.hospital = action.payload.hospital;
      }),
  },
  initialState
);
