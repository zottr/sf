import { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';

interface AdminInfo {
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

interface UseAdminInfoParams {
  adminId?: string | null;
}

const useAdminInfo = ({ adminId }: UseAdminInfoParams) => {
  const [adminData, setAdminData] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      if (!adminId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(
          `admin-user/get-info/${adminId}`
        );

        setAdminData(response.data);
      } catch (err) {
        setError('Failed to fetch admin info.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, [adminId]);

  return { adminData, loading, error };
};

export default useAdminInfo;
