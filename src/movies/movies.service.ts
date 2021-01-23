import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entites/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  findMovieById(id: string): Movie {
    const findMovie = this.movies.find(movie => movie.id === +id);

    if (!findMovie) {
      throw new NotFoundException(`Movie ID ${id} is Not Fount`);
    }

    return findMovie;
  }

  deleteMovie(id: string) {
    this.findMovieById(id);
    this.movies = this.movies.filter(movie => movie.id !== +id);
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: string, updateData) {
    const findMovie = this.findMovieById(id);
    this.deleteMovie(id);
    this.movies.push({
      ...findMovie,
      ...updateData,
    });
  }
}
