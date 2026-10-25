
import { useState, useCallback } from "react";

export default function useAxios(requestFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await requestFunction();
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [requestFunction]);

  return { data, loading, error, refetch };
}
