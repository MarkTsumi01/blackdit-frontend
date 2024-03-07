"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Divider, Input, User, Image, Avatar } from "@nextui-org/react";
import axios from "axios";
import { IBlogs } from "@/app/interfaces/blog/blogs.interface";
import { useGetUser } from "@/app/hooks/useGetUser";
import { useAccount } from "wagmi";

const Page = () => {
  const { id } = useParams();
  const [blogByID, setblogByID] = useState<IBlogs | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentDatas, setCommentData] = useState("");
  const { userData } = useGetUser();
  const { address } = useAccount();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
    console.log(address);
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + `/api/posts/${id}`,
          config
        );
        setblogByID(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  });

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const createComment = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/comments/createcomment`,
        {
          commentText: commentDatas,
          postId: blogByID?.id,
        },
        config
      );

      // console.log(response.data, "API Data");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCommnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createComment();
    setCommentData("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentData(e.target.value);
  };

  const src = blogByID?.user.imagePath;

  return (
    <>
      <main className="w-full h-full p-16">
        <div className="p-6 flex flex-col gap-4 border-2 border-divider rounded-large bg-background">
          <div className="flex justify-between">
            <h1 className="flex items-center text-large">{blogByID?.title}</h1>
            <User
              as="button"
              avatarProps={{
                src: src,
              }}
              className="transition-transform"
              description={blogByID?.user.username}
              name={blogByID?.user.fullname}
            />
          </div>
          <Divider />
          <p>{blogByID?.body}</p>
          <Image
            isZoomed
            className="my-4 "
            src={blogByID?.imagePath}
            width={400}
            height={200}
            alt={blogByID?.imagePath}
          />
        </div>
        <form
          onSubmit={handleCommnetSubmit}
          className="mt-4 border-1 border-divider flex items-center p-6 rounded-large bg-background"
        >
          <Input
            name="comment"
            value={commentDatas}
            onChange={handleInputChange}
            type="text"
            placeholder="Share your thought ..."
            startContent={<Avatar src={userData?.imagePath} />}
          />
          <Button
            type="submit"
            color="success"
            className="text-white font-bold"
            variant="shadow"
          >
            Comment
          </Button>
        </form>

        <div className="flex flex-col gap-4 mt-4 text-large font-bold ">
          <h1 className="text-primary">All Comments</h1>
          <Divider />
        </div>
        {blogByID?.comments.map((comment) => (
          <div
            key={comment.id}
            className="mt-4 border-1 border-divider flex items-center p-6 rounded-large bg-background"
          >
            <div className="flex flex-col gap-4">
              <Avatar
                showFallback
                src="https://images.unsplash.com/broken"
                className="text-white"
              />
              <h1>{comment.commentText}</h1>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Page;
