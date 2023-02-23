import { TechnologyService } from './../services/technology.service';
import { TechnologyEntity } from './../entities/technology.entity';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TechnologyService', () => {
  let technologyService: TechnologyService;
  const mockTechnologyRepository = {
    getById: jest.fn(),
    getByName: jest.fn(),
    createTechnology: jest.fn(),
    createManyTechnologies: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologyService,
        {
          provide: getRepositoryToken(TechnologyEntity),
          useValue: mockTechnologyRepository,
        },
      ],
    }).compile();

    technologyService = module.get<TechnologyService>(TechnologyService);
  });

  describe('findById', () => {
    it('should find an existing technology by ID', async () => {
      const technology = new TechnologyEntity();
      technology.id = 1;
      mockTechnologyRepository.getById.mockResolvedValue(technology);

      const foundTechnology = await technologyService.findById(1);

      expect(foundTechnology).toEqual(technology);
      expect(mockTechnologyRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException for a non-existing technology ID', async () => {
      mockTechnologyRepository.getById.mockResolvedValue(null);

      expect(technologyService.findById(1)).rejects.toThrowError(
        new NotFoundException('technologyNotFound'),
      );
      expect(mockTechnologyRepository.getById).toHaveBeenCalledWith(1);
    });
  });
});
