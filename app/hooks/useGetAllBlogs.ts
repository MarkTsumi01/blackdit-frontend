import axios from "axios";
import { useEffect, useState } from "react";
import { IBlogs } from "../interfaces/blog/blogs.interface";

export const useGetAllBlogs = () => {
  const [blogdata, setBlogdata] = useState<IBlogs[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accesstoken = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${accesstoken}` },
        };
        const res = await axios.get(
          "http://localhost:3001/api/posts/allposts",
          config
        );
        setBlogdata(res.data);
        console.log(res.data, "data");

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return { blogdata, loading };
};
