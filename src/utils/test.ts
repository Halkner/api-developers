import { CreateCountryDto } from 'src/core/dtos';
import { CountryEntity, UserEntity } from 'src/core/entities';
import { CreateDeveloperDto } from 'src/modules/developers/dto/create-developer.dto';
import { CreateTechnologyDto } from 'src/modules/developers/dto/create-technology.dto';
import { DeveloperEntity } from 'src/modules/developers/entities/developer.entity';
import { TechnologyEntity } from 'src/modules/developers/entities/technology.entity';

export class TestStatic {
  static countryData(): CountryEntity {
    const country = new CountryEntity();
    country.id = 1;
    country.language = 'Português';
    country.name = 'Brasil';
    country.createdAt = new Date();
    country.updatedAt = new Date();
    country.deletedAt = null;

    return country;
  }

  static countryDto(): CreateCountryDto {
    const countryBodyDto = new CreateCountryDto();
    countryBodyDto.language = 'Português';
    countryBodyDto.name = 'Brasil';

    return countryBodyDto;
  }

  static countriesData(): CountryEntity[] {
    const countries = ['Brasil', 'Canada', 'China'].map((name, index) => {
      const country = new CountryEntity();
      country.id = index + 1;
      country.language = 'Português';
      country.name = name;
      country.createdAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.updatedAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      country.deletedAt = null;

      return country;
    });

    return countries;
  }

  static technologyDto(): CreateTechnologyDto {
    const technologyBodyDto = new CreateTechnologyDto();
    technologyBodyDto.name = 'Kotlin';

    return technologyBodyDto;
  }

  static giveMeAValidTechnology(): TechnologyEntity {
    const technology = new TechnologyEntity();
    technology.id = 1;
    technology.name = 'Kotlin';
    technology.createdAt = new Date();
    technology.updatedAt = new Date();
    technology.deletedAt = null;

    return technology;
  }

  static giveMeAValidTechnologies(): TechnologyEntity[] {
    const technologies = ['Kotlin', 'Node.js'].map((name, index) => {
      const technology = new TechnologyEntity();
      technology.id = index + 1;
      technology.name = name;
      technology.createdAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      technology.updatedAt = new Date(`2023-02-1${index + 1} 12:06:12.090`);
      technology.deletedAt = null;

      return technology;
    });

    return technologies;
  }

  static developerDto(): CreateDeveloperDto {
    const developerBodyDto = new CreateDeveloperDto();
    developerBodyDto.user_id = 1;
    developerBodyDto.acceptedRemoteWork = false;
    developerBodyDto.monthsOfExperience = 12;
    developerBodyDto.technologies = [1, 2];

    return developerBodyDto;
  }

  static giveMeAValidDeveloper(): DeveloperEntity {
    const developer = new DeveloperEntity();
    developer.id = 1;
    developer.technologies = null;
    developer.user_id = 1;
    developer.user = null;
    developer.acceptedRemoteWork = false;
    developer.monthsOfExperience = 12;
    developer.createdAt = new Date();
    developer.updatedAt = new Date();
    developer.deletedAt = null;

    return developer;
  }

  static giveMeAValidUser(): UserEntity {
    const user = new UserEntity();
    user.id = 1;
    user.name = 'John Doe';
    user.email = 'john.doe@test.com';
    user.salt = 'test123';
    user.city_id = 1;
    user.city = null;
    user.active = true;
    user.password = 'teste123';
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.deletedAt = null;

    return user;
  }
}
