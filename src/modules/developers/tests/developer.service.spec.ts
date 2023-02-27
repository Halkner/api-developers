import { TestStatic } from 'src/utils/test';
import { UpdateDeveloperDto } from './../dto/update-developer.dto';
import { UserRepository } from './../../users/user.repository';
import { TechnologyRepository } from './../repositories/technology.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperRepository } from '../repositories/developer.repository';
import { DeveloperEntity } from '../entities/developer.entity';
import { DeveloperService } from '../services/developer.service';
import { TechnologyService } from '../services/technology.service';
import { UserService } from 'src/modules/users/services/user.service';

describe('DeveloperService', () => {
  let developerService: DeveloperService;
  let userService: UserService;

  const mockDeveloperRepository = {
    getById: jest.fn(),
    createDeveloper: jest.fn(),
    getByUser: jest.fn(),
    updateDeveloper: jest.fn(),
  };

  const mockTechnologyRepository = {
    getById: jest.fn(),
    getByName: jest.fn(),
    createTechnology: jest.fn(),
    createManyTechnologies: jest.fn(),
  };

  const mockUserRepository = {
    getById: jest.fn(),
    getByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperService,
        TechnologyService,
        UserService,
        UserRepository,
        {
          provide: DeveloperRepository,
          useValue: mockDeveloperRepository,
        },
        {
          provide: TechnologyRepository,
          useValue: mockTechnologyRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    developerService = module.get<DeveloperService>(DeveloperService);
    userService = module.get<UserService>(UserService);
  });

  describe('findById', () => {
    const mockDeveloper = TestStatic.giveMeAValidDeveloper();

    it('should return a developer by id', async () => {
      mockDeveloperRepository.getById.mockResolvedValue(mockDeveloper);

      const foundDeveloper = await developerService.findById(1);

      expect(foundDeveloper).toEqual(mockDeveloper);
      expect(mockDeveloperRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when developer is not found', async () => {
      mockDeveloperRepository.getById.mockResolvedValue(null);

      expect(developerService.findById(1)).rejects.toThrow(
        new NotFoundException('developerNotFound'),
      );
      expect(mockDeveloperRepository.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('createDeveloper', () => {
    const mockUser = TestStatic.giveMeAValidUser();

    const mockDeveloper = TestStatic.developerDto();

    const mockTechnologyEntity = TestStatic.giveMeAValidTechnologies();

    it('should create a new developer', async () => {
      mockDeveloperRepository.getByUser.mockResolvedValue(null);
      userService.findById = jest.fn().mockResolvedValue(mockUser);
      mockTechnologyRepository.getById.mockResolvedValueOnce(
        mockTechnologyEntity[0],
      );
      mockTechnologyRepository.getById.mockResolvedValueOnce(
        mockTechnologyEntity[1],
      );
      mockDeveloperRepository.createDeveloper.mockResolvedValue(mockDeveloper);

      const createdDeveloper = await developerService.createDeveloper(
        mockDeveloper,
      );

      expect(createdDeveloper).toEqual(mockDeveloper);
      expect(mockDeveloperRepository.getByUser).toHaveBeenCalledWith(
        mockDeveloper.user_id,
      );
      expect(userService.findById).toHaveBeenCalledWith(mockDeveloper.user_id);
      expect(mockTechnologyRepository.getById).toHaveBeenCalledWith(
        mockDeveloper.technologies[0],
      );
      expect(mockTechnologyRepository.getById).toHaveBeenCalledWith(
        mockDeveloper.technologies[1],
      );
      expect(mockDeveloperRepository.createDeveloper).toHaveBeenCalledWith({
        ...mockDeveloper,
        technologies: mockTechnologyEntity,
      });
    });

    it('should throw BadRequestException when developer already exists', async () => {
      mockDeveloperRepository.getByUser.mockResolvedValue(mockDeveloper);
      userService.findById = jest.fn().mockResolvedValue(mockUser);

      await expect(
        developerService.createDeveloper(mockDeveloper),
      ).rejects.toThrow(new BadRequestException('entityWithArgumentsExists'));
      expect(mockDeveloperRepository.getByUser).toHaveBeenCalledWith(
        mockDeveloper.user_id,
      );
    });

    it('should throw BadRequestException when developer could not be saved', async () => {
      mockDeveloperRepository.getByUser.mockResolvedValue(null);
      userService.findById = jest.fn().mockResolvedValue(mockUser);
      mockTechnologyRepository.getById.mockResolvedValueOnce(
        mockTechnologyEntity[0],
      );
      mockTechnologyRepository.getById.mockResolvedValueOnce(
        mockTechnologyEntity[1],
      );
      mockDeveloperRepository.createDeveloper.mockResolvedValue(null);

      await expect(
        developerService.createDeveloper(mockDeveloper),
      ).rejects.toThrow(new BadRequestException('developerNotSave'));
      expect(userService.findById).toHaveBeenCalledWith(mockDeveloper.user_id);
      expect(mockDeveloperRepository.getByUser).toHaveBeenCalledWith(
        mockDeveloper.user_id,
      );
      expect(mockTechnologyRepository.getById).toHaveBeenCalledWith(
        mockDeveloper.technologies[0],
      );
      expect(mockTechnologyRepository.getById).toHaveBeenCalledWith(
        mockDeveloper.technologies[1],
      );
      expect(userService.findById).toHaveBeenCalledWith(mockDeveloper.user_id);
      expect(mockDeveloperRepository.createDeveloper).toHaveBeenCalledWith({
        ...mockDeveloper,
        technologies: mockTechnologyEntity,
      });
    });
  });

  describe('updateDeveloper', () => {
    const updateDeveloperDto: UpdateDeveloperDto = {
      acceptedRemoteWork: true,
      monthsOfExperience: 24,
      technologies: [1, 2],
    };

    const mockUser = TestStatic.giveMeAValidUser();

    const mockTechnology = TestStatic.giveMeAValidTechnologies();

    const foundDeveloper: DeveloperEntity = {
      id: 1,
      acceptedRemoteWork: false,
      monthsOfExperience: 24,
      user_id: 1,
      user: mockUser,
      technologies: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const updatedDeveloper: DeveloperEntity = {
      id: 1,
      acceptedRemoteWork: true,
      monthsOfExperience: 24,
      user_id: 1,
      user: mockUser,
      technologies: mockTechnology,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    it('should update developer successfully', async () => {
      mockDeveloperRepository.getById.mockResolvedValueOnce(foundDeveloper);
      mockTechnologyRepository.getById.mockResolvedValueOnce(mockTechnology[0]);
      mockTechnologyRepository.getById.mockResolvedValueOnce(mockTechnology[1]);
      mockDeveloperRepository.updateDeveloper.mockResolvedValueOnce(
        updatedDeveloper,
      );

      const result = await developerService.updateDeveloper(
        1,
        updateDeveloperDto,
      );

      expect(result).toEqual(updatedDeveloper);
    });

    it('should throw NotFoundException when developer is not found', async () => {
      mockDeveloperRepository.getById.mockResolvedValueOnce(undefined);

      await expect(
        developerService.updateDeveloper(1, updateDeveloperDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException when update fails', async () => {
      mockDeveloperRepository.getById.mockResolvedValueOnce(foundDeveloper);
      mockTechnologyRepository.getById.mockResolvedValueOnce(mockTechnology[0]);
      mockTechnologyRepository.getById.mockResolvedValueOnce(mockTechnology[1]);
      mockDeveloperRepository.updateDeveloper.mockResolvedValueOnce(
        Promise.reject(),
      );

      await expect(
        developerService.updateDeveloper(1, updateDeveloperDto),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
