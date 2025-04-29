import axiosClient from '../axiosClient';

export interface AdminInfo {
  id: string;
  businessName: string;
  tagline?: string;
  banner?: string;
  phoneNumber: string;
  logo?: string;
  upiId: string;
  upiPhone: string;
  upiName: string;
  upiScan?: string;
}

export const getAdminInfo = async (adminId: string): Promise<AdminInfo> => {
  if (!adminId) throw new Error('Admin ID is required');

  const response = await axiosClient.get<AdminInfo>(
    `admin-user/get-info/${adminId}`
  );
  return response.data;
};
