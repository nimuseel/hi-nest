import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.createMovie({
      title: 'test movie',
      year: 2021,
      genres: ['test'],
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll function', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findMovieById function', () => {
    it('should return a movie', () => {
      const movie = service.findMovieById(1);

      expect(movie).toBeDefined();
    });

    it('should throw a NotFoundException', () => {
      try {
        service.findMovieById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteMovie function', () => {
    it('deletes a movie', () => {
      const beforeDelete = service.getAll().length;
      service.deleteMovie(1);

      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie function', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'test movie',
        year: 2021,
        genres: ['test'],
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateMovie function', () => {
    it('should update a movie', () => {
      service.updateMovie(1, { title: 'updated test' });
      const movies = service.findMovieById(1);

      expect(movies.title).toEqual('updated test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
