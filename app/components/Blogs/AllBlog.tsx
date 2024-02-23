"use client";

import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Image,
} from "@nextui-org/react";
import { useGetAllBlogs } from "@/app/hooks/useGetAllBlogs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllBlog = () => {
  const router = useRouter();
  const { blogdata, loading } = useGetAllBlogs();

  return (
    <main>
      {loading ? (
        <div>loading ...</div>
      ) : (
        <div className="max-w-9/12 w-full mt-10 min-h-screen  ">
          <h1 className=" pl-20 text-large  text-primary">All Blogs</h1>

          <div className="grid grid-cols-3 p-10 rounded-md gap-10 text-primary">
            {blogdata?.map((blog, index) => (
              <>
                <Link href={`dashboard/${blog.id}`}>
                  <Card
                    isPressable
                    className="p-2 bg-background rounded-md shadow-lg  text-primary border-[1px] border-divider max-h-96 h-full"
                    key={index}
                  >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col gap-4 items-start">
                      <Skeleton className="rounded-lg" isLoaded={!loading}>
                        <div className="flex gap-4 justify-center items-center parent">
                          <Avatar color="primary" src={blog.user.imagePath} />
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
    </main>
  );
};

export default AllBlog;
