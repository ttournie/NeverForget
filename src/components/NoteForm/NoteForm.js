import React, {useState, useEffect} from 'react';
import config from '../../config/config'

const NoteForm = () => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.apiUrl}/notes`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    title,
                    body,
                  })
            });
            console.log(response.statusText);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <form
            onSubmit={handleOnSubmit}
        >
            <label htmlFor="body">Enter the note title</label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label htmlFor="body">Enter the note body</label>
            <input type="text" name="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default NoteForm;