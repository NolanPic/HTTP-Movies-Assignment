import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils';

const EditMovie = props => {

    const { id } = useParams();
    const history = useHistory();

    const initialState = {
        title: '',
        director: '',
        metascore: 0,
        stars: []
    };

    const [movie, setMovie] = useState(initialState);

    useEffect(() => {
        if(id !== 'new') {
            axios.get(`${apiUrl}/movies/${id}`)
                .then(res => {
                    console.log(res);
                    setMovie(res.data);
                })
                .catch(err => console.warn(err));
        }
    }, [id]);

    const handleChange = e => {
        let newValue = e.target.value;

        if(e.target.name === 'stars') {
            newValue = e.target.value.split(',');
        }

        setMovie({
            ...movie,
            [e.target.name]: newValue
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // when editing or saving new movig is complete
        const saveSuccess = () => {
            setMovie(initialState);
            history.push('/');
        };

        if(id === 'new') {
            // adding new movie
            axios.post(`${apiUrl}/movies`, movie)
                .then(res => {
                    console.log(res);
                    saveSuccess();
                })
                .catch(err => console.warn(err));
        }
        else {
            // editing existing movie
            axios.put(`${apiUrl}/movies/${id}`, movie)
                .then(res => {
                    console.log(res);
                    saveSuccess();
                })
                .catch(err => console.warn(err));
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title</p>
                    <input
                        type="text"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <p>Director</p>
                    <input
                        type="text"
                        name="director"
                        value={movie.director}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <p>Metascore</p>
                    <input
                        type="number"
                        name="metascore"
                        value={movie.metascore}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <p>Stars</p>
                    <input
                        type="text"
                        name="stars"
                        value={movie.stars.join(',')}
                        onChange={handleChange}
                    />
                </label>
                <button style={{display: 'block',  marginTop: '2rem'}} type="Submit">Save</button>
            </form>
        </div>
    );
};

export default EditMovie;
