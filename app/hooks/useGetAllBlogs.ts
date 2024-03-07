import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { IBlogs } from "../interfaces/blog/blogs.interface";

export const useGetAllBlogs = () => {
  const [blogdata, setBlogdata] = useState<IBlogs[] | null>(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accesstoken = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${accesstoken}` },
        };
        const res = await axios.get(`${baseUrl}/posts/allposts`, config);
        setBlogdata(res.data);
        // console.log(res.data, "data");

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return { blogdata, loading };
};

interface IFilterData {
  search: string;
}

export const useGetFilteredData = ({ search }: IFilterData) => {
  const { blogdata } = useGetAllBlogs();

  const filteredData = useMemo(() => {
    if (!blogdata) return [];

    return blogdata.filter((blog) => {
      const nameMatches = blog.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return nameMatches;
    });
  }, [blogdata, search]);

  return { filteredData };
};
