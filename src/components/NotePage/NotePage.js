import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getNote } from '../../store/actions/note';

const NotePage = ({match, note, getNote, fetching, error}) => {
    useEffect(() => {
        getNote(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <>
            {!R.isEmpty(note) &&
                <div>
                    <div>
                        {note.title}
                        <Link to={`/note/edit/${note._id}`}>Edit</Link>
                    </div>
                    <div>
                        {note.text}
                    </div>
                </div>
            }
        </>
    )
}

NotePage.propTypes = {
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    note: PropTypes.object,
}

const MapStateToProps = ({ note }) => ({
    fetching: note.fetching,
    error: note.error,
    note: note.notes.length > 0 ? note.notes[0] : {},
});

export default connect(MapStateToProps, {getNote})(NotePage)