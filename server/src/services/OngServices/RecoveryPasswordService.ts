import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import Ong from '../../models/Ong';

interface RecoveryPasswordData {
  ongId: string;
  newPassword: string;
}

class RecoveryPasswordService {
  public async execute({
    ongId,
    newPassword,
  }: RecoveryPasswordData): Promise<void> {
    const ongsRepository = getRepository(Ong);

    const passwordHash = await bcrypt.hash(newPassword, 8);

    await ongsRepository.update({ id: ongId }, { password: passwordHash });
  }
}

export default RecoveryPasswordService;
