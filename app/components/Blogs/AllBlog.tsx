"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Image,
  Input,
} from "@nextui-org/react";
import { useGetAllBlogs, useGetFilteredData } from "@/app/hooks/useGetAllBlogs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Log } from "ethers";
import { IBlogs } from "@/app/interfaces/blog/blogs.interface";
import Searchbar from "../Searchbar/Searchbar";

const AllBlog = () => {
  const router = useRouter();
  const { blogdata, loading } = useGetAllBlogs();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const { filteredData } = useGetFilteredData({
    search: searchTerm,
  });

  return (
    <main>
      <>
        {loading ? (
          <div>loading ...</div>
        ) : (
          <div className="max-w-9/12 w-full mt-10 min-h-screen bg-secondary-foreground ">
            <Searchbar onSearch={handleSearch} />
            <div className="grid grid-cols-3 p-10 rounded-md gap-10 text-primary">
              {filteredData?.map((blog, index) => (
                <>
                  <Link href={`dashboard/${blog.id}`}>
                    <Card
                      isPressable
                      className="p-2 bg-background rounded-large shadow-lg  text-primary border-[1px] border-divider max-h-96 h-full"
                      key={index}
                    >
                      <CardHeader className="pb-0 pt-2 px-4 flex-col gap-4 items-start">
                        <Skeleton className="rounded-lg" isLoaded={!loading}>
                          <div className="flex gap-4 justify-center items-center parent">
                            <Avatar color="primary" src={blog.user.imagePath} />
                            <div className="text-left">
                              <h2 className="text-foreground font-semibold">
                                @{blog.user.username}
                              </h2>
                              <h2>{blog.user.role}</h2>
                            </div>
                          </div>
                        </Skeleton>

                        <Skeleton className="rounded-lg" isLoaded={!loading}>
                          <h4 className="font-bold text-large p-2 text-left">
                            {blog.title}
                          </h4>
                        </Skeleton>
                      </CardHeader>
                      <CardBody className="overflow-visible">
                        <Skeleton className="rounded-lg" isLoaded={!loading}>
                          <Image
                            isZoomed
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={blog.imagePath}
                            width={270}
                            height={150}
                          />
                        </Skeleton>
                      </CardBody>
                      <CardFooter>
                        <Button
                          onPress={() => router.push(`dashboard/${blog.id}`)}
                          className="p-4 text-large text-white  font-bold  w-full"
                          variant="shadow"
                          color="secondary"
                          radius="md"
                          size="lg"
                        >
                          READ
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </>
              ))}
            </div>
          </div>
        )}
      </>
    </main>
  );
};

export default AllBlog;
