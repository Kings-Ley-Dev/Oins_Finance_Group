import { useEffect, useState, useCallback } from "react";

export function useAdminData(loader, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setStatus("loading");
    try {
      setData(await loader());
      setStatus("ready");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load");
      setStatus("error");
    }
  }, deps); // eslint-disable-line

  useEffect(() => { reload(); }, [reload]);
  return { data, status, error, reload };
}
