/* const COLLECTION_NAME = "eleitores";
import connectDB from "../database/connect";
import Eleitor from "../models/Eleitor";
export default class EleitorRepository {
  static async create(chavePublica: string, cpf: string) {
    try {
      const db = await connectDB();
      await db
        .collection(COLLECTION_NAME)
        .createIndex({ cpf: 1, chavePublica: 1 }, { unique: true });
      const eleitor = new Eleitor(chavePublica, cpf);
      const eleitorCriado = await db
        .collection(COLLECTION_NAME)
        .insertOne(eleitor);
      if (!eleitorCriado) return null;
      return eleitor;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async findByCpf(cpf: string) {
    const db = await connectDB();
    const eleitor = await db.collection(COLLECTION_NAME).findOne({ cpf });
    if (!eleitor) return null;
    return new Eleitor(eleitor.chavePublica, eleitor.cpf);
  }
  static async findByChavePublica(chavePublica: string) {
    const db = await connectDB();
    const eleitor = await db
      .collection(COLLECTION_NAME)
      .findOne({ chavePublica });
    if (!eleitor) return null;
    return new Eleitor(eleitor.chavePublica, eleitor.cpf);
  }
  static async update({
    chavePublica,
    cpf,
  }: {
    chavePublica?: string;
    cpf?: string;
  }) {
    try {
      const db = await connectDB();
      const eleitorAtualizado = await db
        .collection(COLLECTION_NAME)
        .findOneAndUpdate(
          { cpf, chavePublica },
          { $set: { chavePublica, cpf } }
        );
      if (!eleitorAtualizado) return null;
      return new Eleitor(
        eleitorAtualizado.value.chavePublica,
        eleitorAtualizado.value.cpf
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async delete(cpf: string) {
    try {
      const db = await connectDB();
      const eleitorDeletado = await db
        .collection(COLLECTION_NAME)
        .findOneAndDelete({ cpf });
      if (!eleitorDeletado) return null;
      return new Eleitor(
        eleitorDeletado.value.chavePublica,
        eleitorDeletado.value.cpf
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
 */