import { TechnologyRepository } from './../repositories/technology.repository';
import { TechnologyService } from './../services/technology.service';
import { TechnologyEntity } from './../entities/technology.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestStatic } from 'src/utils/test';

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
          provide: TechnologyRepository,
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

  describe('createTechnology', () => {
    it('should create a new technology', async () => {
      const newTechnology = TestStatic.technologyDto();

      const savedTechnology = TestStatic.giveMeAValidTechnology();

      mockTechnologyRepository.getByName.mockResolvedValue(null);
      mockTechnologyRepository.createTechnology.mockResolvedValue(
        savedTechnology,
      );

      const createdTechnology = await technologyService.createTechnology(
        newTechnology,
      );

      expect(createdTechnology).toEqual(savedTechnology);
      expect(mockTechnologyRepository.getByName).toHaveBeenCalledWith('Kotlin');
      expect(mockTechnologyRepository.createTechnology).toHaveBeenCalledWith(
        newTechnology,
      );
    });

    it('should throw a BadRequestException if technology already exists', async () => {
      const newTechnology = TestStatic.technologyDto();

      const existingTechnology = TestStatic.giveMeAValidTechnology();

      mockTechnologyRepository.getByName.mockReturnValue(existingTechnology);

      await expect(
        technologyService.createTechnology(newTechnology),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(mockTechnologyRepository.getByName).toHaveBeenCalledWith('Kotlin');
    });

    it('should throw a BadRequestException if technology is not saved', async () => {
      const newTechnology = TestStatic.technologyDto();

      mockTechnologyRepository.getByName.mockResolvedValue(null);
      mockTechnologyRepository.createTechnology.mockResolvedValue(null);

      await expect(
        technologyService.createTechnology(newTechnology),
      ).rejects.toThrowError(new BadRequestException('technologyNotSave'));

      expect(mockTechnologyRepository.getByName).toHaveBeenCalledWith('Kotlin');
      expect(mockTechnologyRepository.createTechnology).toHaveBeenCalledWith(
        newTechnology,
      );
    });
  });

  describe('createManyTechnologies', () => {
    it('should create multiple technologies', async () => {
      const newTechnologies = [
        TestStatic.technologyDto(),
        TestStatic.technologyDto(),
      ];
      const savedTechnologies = [
        TestStatic.giveMeAValidTechnology(),
        TestStatic.giveMeAValidTechnology(),
      ];
      mockTechnologyRepository.createManyTechnologies.mockResolvedValue(
        savedTechnologies,
      );

      const createdTechnologies =
        await technologyService.createManyTechnologies(newTechnologies);

      expect(createdTechnologies).toEqual(savedTechnologies);
      expect(
        mockTechnologyRepository.createManyTechnologies,
      ).toHaveBeenCalledWith(newTechnologies);
    });

    it('should throw a BadRequestException if any technology already exists', async () => {
      const newTechnologies = [
        TestStatic.technologyDto(),
        TestStatic.technologyDto(),
      ];
      mockTechnologyRepository.createManyTechnologies.mockRejectedValue(
        new Error('Duplicate entry'),
      );

      await expect(
        technologyService.createManyTechnologies(newTechnologies),
      ).rejects.toThrowError(
        new BadRequestException('entityWithArgumentsExists'),
      );

      expect(
        mockTechnologyRepository.createManyTechnologies,
      ).toHaveBeenCalledWith(newTechnologies);
    });
  });
});
