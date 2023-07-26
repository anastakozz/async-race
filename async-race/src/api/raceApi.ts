import { DriveParams } from '../utils/types';

const baseURl = 'http://127.0.0.1:3000';

export async function switchEngine(
  id: number,
  status: string,
): Promise<DriveParams> {
  const response = await fetch(`${baseURl}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const data: DriveParams = await response.json();
  return data;
}

export async function swithToDrive(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${baseURl}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    await response.json();
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return false;
  }
}
