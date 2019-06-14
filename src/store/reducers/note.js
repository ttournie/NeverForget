/* eslint-disable no-underscore-dangle */
import {
  FETCHING_NOTES,
  FETCH_NOTES_FAILED,
  FETCH_NOTES_SUCCEED,
  EDITING_NOTE,
  EDIT_NOTE_FAILED,
  EDIT_NOTE_SUCCEED,
  CREATING_NOTE,
  CREATE_NOTE_FAILED,
  CREATE_NOTE_SUCCEED,
  DELETING_NOTE,
  DELETE_NOTE_FAILED,
  DELETE_NOTE_SUCCEED,
  RESET_NOTE_ERROR,
} from '../actions/note';

const initialState = {
  notes: [],
  fetching: false,
  error: false,
};

const note = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_NOTES:
    case CREATING_NOTE:
    case EDITING_NOTE:
    case DELETING_NOTE:
      return { ...state, error: false, fetching: true };

    case CREATE_NOTE_SUCCEED:
    case FETCH_NOTES_SUCCEED:
    case EDIT_NOTE_SUCCEED:
      if (Array.isArray(action.payload)) {
        return {
          ...state, notes: action.payload, error: false, fetching: false,
        };
      }
      return {
        ...state, notes: [action.payload], error: false, fetching: false,
      };

    case FETCH_NOTES_FAILED:
    case CREATE_NOTE_FAILED:
    case EDIT_NOTE_FAILED:
    case DELETE_NOTE_FAILED:
      return { ...state, fetching: false, error: true };

    case DELETE_NOTE_SUCCEED: {
      const nodeList = state.notes.filter(noteItem => noteItem._id !== action.payload.id);
      return {
        ...state,
        notes: nodeList,
        error: false,
        fetching: false,
      };
    }

    case RESET_NOTE_ERROR:
      return { ...state, error: false };

    default:
      return state;
  }
};

export default note;
