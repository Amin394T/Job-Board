import { useState, useEffect } from "react";

type returnType<Type> = {
    data: Type | null,
    loading: boolean
}

function useFetch<Type>(url: string): returnType<Type> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      headers: {
        "X-API-KEY": import.meta.env.VITE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default useFetch;
