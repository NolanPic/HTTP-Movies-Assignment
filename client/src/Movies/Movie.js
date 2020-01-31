import React from "react";
import axios from "axios";
import { apiUrl } from '../utils';
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    if(window.confirm('Are you sure you want to delete this movie?')) {
      axios.delete(`${apiUrl}/movies/${this.state.movie.id}`)
        .then(res => {
          console.log(res);
          this.props.history.push('/');
        })
        .catch(err => console.warn(err));
    }
  };

  render() {

    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <button className="edit-button" onClick={() => this.props.history.push(`/edit-movie/${this.state.movie.id}`)}>Edit</button>
        <button className="delete-button" onClick={this.deleteMovie}>Delete</button>
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      </div>
    );
  }
}
