import { Game } from '../../entities/game';

interface GameRepository {
  find(): Promise<Game[]>
  findOne(query: object): Promise<Game>
  save(payload: object): Promise<Game>
  update(query: object, payload: object): Promise<any>
  delete(query: object): Promise<any>
}

export class GameService {
  repository: GameRepository;

  constructor(repository: GameRepository) {
    this.repository = repository;
  }

  public async readAll(): Promise<Game[]> {
    return this.repository.find();
  }

  public async readOne(id: string): Promise<Game> {
    return this.repository.findOne({ id });
  }

  public async create(payload: Game): Promise<Game> {
    return this.repository.save(payload);
  }

  public async update(id: string, payload: Game): Promise<any> {
    return this.repository.update({ id }, payload);
  }

  public async delete(id: string): Promise<any> {
    return this.repository.delete({ id });
  }
}
