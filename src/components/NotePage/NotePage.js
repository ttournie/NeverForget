import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNote } from '../../store/actions/note';

const NotePage = ({match, note, fetching, error}) => {
    useEffect(() => {
        getNote(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            {!fetching && !error &&
                <div>
                    <div>
                        {note[0].title}
                    </div>
                    <div>
                        {note[0].text}
                    </div>
                </div>
            }
        </>
    )
}

NotePage.propTypes = {
    fetching: PropTypes.bool,
    error: PropTypes.bool,
    note: PropTypes.arrayOf(PropTypes.object),
}

const MapStateToProps = ({ note }) => ({
    fetching: note.fetching,
    error: note.error,
    note: note.notes,
});

export default connect(MapStateToProps, {getNote})(NotePage)