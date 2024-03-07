import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user/user.interface";

export const useGetUser = () => {
  const [userData, setUserdata] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accesstoken = localStorage.getItem("accessToken");
        const config = {
          headers: { Authorization: `Bearer ${accesstoken}` },
        };
        const res = await axios.get(`${baseUrl}/users/`, config);
        setUserdata(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return { userData, loading };
};
