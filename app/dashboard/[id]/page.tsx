"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetByID } from "@/app/hooks/useGetByID";
import { Divider, Link, User } from "@nextui-org/react";
import axios from "axios";
import { IBlogs } from "@/app/interfaces/blog/blogs.interface";
const Page = () => {
  const { id } = useParams();
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
    console.log(blogByID, "blog");
  }, []);

  return (
    <>
      <main className="flex justify-center">
        <div className="p-6 drop-shadow-lg drop-shadow-lg max-w-9/12 w-full">
          <div className="flex gap-10 ">
            <h1>{blogByID?.title}</h1>
            <div className="">
              <User
                name="Junior Garcia"
                description={
                  <Link
                    href="https://twitter.com/jrgarciadev"
                    size="sm"
                    isExternal
                  >
                    @jrgarciadev
                  </Link>
                }
                avatarProps={{
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
              />
            </div>
          </div>
          <Divider />
          <p>{blogByID?.body}</p>
        </div>
      </main>
    </>
  );
};

export default Page;
