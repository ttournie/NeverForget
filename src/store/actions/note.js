import {get, post, put, deleteRequest} from '../../utils/api';

// Action type
export const FETCHING_NOTES = 'FETCHING_NOTE';
export const FETCH_NOTES_FAILED = 'FETCH_NOTE_FAILED';
export const FETCH_NOTES_SUCCEED = 'FETCH_NOTE_SUCCEED';
export const EDITING_NOTE = 'EDITING_NOTE';
export const EDIT_NOTE_FAILED = 'EDIT_NOTE_FAILED';
export const EDIT_NOTE_SUCCEED = 'EDIT_NOTE_SUCCEED';
export const CREATING_NOTE = 'CREATING_NOTE';
export const CREATE_NOTE_FAILED = 'CREATE_NOTE_FAILED';
export const CREATE_NOTE_SUCCEED = 'CREATE_NOTE_SUCCEED';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETE_NOTE_FAILED = 'DELETE_NOTE_FAILED';
export const DELETE_NOTE_SUCCEED = 'DELETE_NOTE_SUCCEED';

const setUserNotes = (notes) => ({
    type: FETCH_NOTES_SUCCEED,
    notes: notes,
})

const setNote = (note) => ({
    type: FETCH_NOTES_SUCCEED,
    notes: [note],
})

const setEditedNote = (note) => ({
    type: EDIT_NOTE_SUCCEED,
    note: [note],
})

const createNote = (note) => ({
    type: CREATE_NOTE_SUCCEED,
    note,
})

const deleteNoteSucess = () => ({
    type: DELETE_NOTE_SUCCEED,
})

export const getUserNotes = () => async(dispatch) => {
    dispatch({type: FETCHING_NOTES});
    try {
        const data = await get('/notes');
        dispatch(setUserNotes(data));
    } catch (err) {
        dispatch({type: FETCH_NOTES_FAILED});
    }
}

export const getNote = (id) => async(dispatch) => {
    dispatch({type: FETCHING_NOTES});
    try {
        const response = await get(`/notes/${id}`);
        const { data } = response;
        dispatch(setNote(data));
    } catch (err) {
        dispatch({type: FETCH_NOTES_FAILED});
    }
}

export const editNote = (id) => async(dispatch) => {
    dispatch({type: EDITING_NOTE});
    try {
        const data = await put(`/notes/${id}`);
        dispatch(setEditedNote(data));
    } catch (err) {
        dispatch({type: EDIT_NOTE_FAILED});
    }
}

export const deleteNote = (id) => async(dispatch) => {
    dispatch({type: DELETING_NOTE});
    try {
        await deleteRequest(`/notes/${id}`);
        dispatch(deleteNoteSucess());
    } catch (err) {
        console.log(err)
        dispatch({type: DELETE_NOTE_FAILED});
    }
}

export const addNote = ({title, body}) => async(dispatch) => {
    dispatch({type: CREATING_NOTE});
    try {
        const response = await post('/notes/', {
            title,
            text: body
        })
        const { data } = response;
        dispatch(createNote(data));
    } catch (err) {
        dispatch({type: CREATE_NOTE_FAILED});
    }
}