"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Divider, Input, User, Image, Avatar } from "@nextui-org/react";
import axios from "axios";
import { IBlogs } from "@/app/interfaces/blog/blogs.interface";

const Page = () => {
  const { id } = useParams();
  const [blogByID, setblogByID] = useState<IBlogs | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentDatas, setCommentData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const res = await axios.get(
          `http://localhost:3001/api/posts/${id}`,
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
        "http://localhost:3001/api/comments/createcomment",
        {
          commentText: commentDatas,
          postId: blogByID?.id,
        },
        config
      );

      console.log(response.data, "API Data");
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

  return (
    <>
      <main className="w-full h-full p-28">
        <div className="p-6 flex flex-col gap-4 border-2 border-divider rounded-large">
          <div className="flex justify-between">
            <h1 className="flex items-center text-large">{blogByID?.title}</h1>
            <User
              as="button"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
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
          className="mt-4 border-1 border-divider flex items-center p-6 rounded-large"
        >
          <Input
            name="comment"
            value={commentDatas}
            onChange={handleInputChange}
            type="text"
            placeholder="Share your thought ..."
            startContent={
              <User
                as="button"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                name
              />
            }
          />
          <Button
            type="submit"
            color="success"
            className="text-foreground font-bold"
            variant="shadow"
          >
            Comment
          </Button>
        </form>

        <div className="flex flex-col gap-4 mt-4 text-large font-bold">
          <h1 className="text-foreground">All Comments</h1>
          <Divider />
        </div>
        {blogByID?.comments.map((comment) => (
          <div
            key={comment.id}
            className="mt-4 border-1 border-divider flex items-center p-6 rounded-large"
          >
            <div className="flex flex-col gap-4">
              <Avatar showFallback src="https://images.unsplash.com/broken" />
              <h1>{comment.commentText}</h1>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Page;
