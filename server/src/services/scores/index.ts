import { Score } from '../../entities/score';

interface ScoreRepository {
  find(): Promise<Score[]>
  findOne(query: object): Promise<Score>
  save(payload: object): Promise<Score>
  update(query: object, payload: object): Promise<any>
  delete(query: object): Promise<any>
}

export class ScoreService {
  repository: ScoreRepository;

  constructor(repository: ScoreRepository) {
    this.repository = repository;
  }

  public async readAll(): Promise<Score[]> {
    return this.repository.find();
  }

  public async readOne(id: string): Promise<Score> {
    return this.repository.findOne({ id });
  }

  public async create(payload: Score): Promise<Score> {
    return this.repository.save(payload);
  }

  public async update(id: string, payload: Score): Promise<any> {
    return this.repository.update({ id }, payload);
  }

  public async delete(id: string): Promise<any> {
    return this.repository.delete({ id });
  }
}
