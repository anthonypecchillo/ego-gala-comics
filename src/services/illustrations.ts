import axios from 'axios';

import { IIllustration } from '../db/models/Illustration';

export const fetchAllIllustrations = async (): Promise<IIllustration[]> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await axios.get(`${apiUrl}/api/illustrations`);

    return response.data.illustrations;
  } catch (error) {
    console.error('Error fetching illustrations:', error);
    throw error;
  }
};

export const createIllustration = async (payload: IIllustration) => {
  try {
    const response = await axios.post('/api/illustrations/createIllustration', payload);
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, error: response.data };
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: string } }).response?.data || 'An error occurred';
    return { success: false, error: errorMessage };
  }
};

export const deleteIllustration = async (illustrationId: string) => {
  try {
    const response = await axios.delete(`/api/illustrations/deleteIllustration`, {
      data: { illustrationId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting illustration:', error);
    throw error;
  }
};
