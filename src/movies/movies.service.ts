import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entites/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  findMovieById(id: number): Movie {
    const findMovie = this.movies.find(movie => movie.id === id);

    if (!findMovie) {
      throw new NotFoundException(`Movie ID ${id} is Not Found`);
    }

    return findMovie;
  }

  deleteMovie(id: number) {
    this.findMovieById(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const findMovie = this.findMovieById(id);
    this.deleteMovie(id);
    this.movies.push({
      ...findMovie,
      ...updateData,
    });
  }
}
