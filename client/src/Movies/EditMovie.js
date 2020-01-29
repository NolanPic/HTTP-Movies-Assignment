import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils';

const EditMovie = props => {

    const { id } = useParams();

    const initialState = {
        title: '',
        director: '',
        metascore: 0,
        stars: []
    };

    const [movie, setMovie] = useState(initialState);

    const handleChange = e => {
        const newValue = e.target.value;

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

        if(id === 'new') {
            // adding new movie

        }
        else {
            // editing existing movie
            axios.put(`${apiUrl}/movies/${id}`, movie)
                .then(res => {
                    console.log(res);
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
                        value={movie.stars.join(', ')}
                        onChange={handleChange}
                    />
                </label>
                <button style={{display: 'block',  marginTop: '2rem'}} type="Submit">Save</button>
            </form>
        </div>
    );
};

export default EditMovie;
