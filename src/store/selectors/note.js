const notesSelector = state => state.note.notes;

export const noteItemSelector = (state) => {
  const notes = notesSelector(state);
  return notes.length > 0 ? notes[0] : {};
};

export default noteItemSelector;
