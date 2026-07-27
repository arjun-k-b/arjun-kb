import certificatesData from '@/data/certificates.json';
import { Certificate } from '@/types/certificate';

export async function getCertificates(): Promise<Certificate[]> {
  return certificatesData as Certificate[];
}
