export interface Repository<T, K> {
  find(): Promise<T[]>
  findOne(query: object): Promise<T>
  save(payload: object): Promise<T>
  update(query: object, payload: object): Promise<K>
  delete(query: object): Promise<K>
}
