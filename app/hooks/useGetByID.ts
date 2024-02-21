import axios from "axios";
import { useEffect, useState } from "react";
import { IBlogs } from "../interfaces/blog/blogs.interface";

export const useGetByID = (id: string) => {
  const [blogByID, setblogByID] = useState<IBlogs[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accesstoken = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${accesstoken}` },
        };
        const res = await axios.get(
          `http://localhost:3001/api/posts/${id}`,
          config
        );
        setblogByID(res.data);
        console.log(res.data, "data");

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return { blogByID, loading };
};
