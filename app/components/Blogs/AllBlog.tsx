"use client";

import React, { use, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useGetAllBlogs } from "@/app/hooks/useGetAllBlogs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllBlog = () => {
  useEffect(() => {
    const getAccess = async () => {
      const access = await localStorage.getItem("accesstoken");
      console.log(access, "token");
    };

    getAccess();
  }, []);
  const router = useRouter();
  const { blogdata, loading } = useGetAllBlogs();

  return (
    <main>
      {loading ? (
        <div>loading ...</div>
      ) : (
        <div className="max-w-9/12 w-full mt-10">
          <h1 className=" pl-20 text-large font-bold text-primary-foreground">
            All Blogs
          </h1>

          <div className="grid grid-cols-3 p-10 rounded-md gap-10 text-foreground">
            {blogdata?.map((blog) => (
              <>
                {/* <Link href={`dashboard/${blog.id}`}> */}
                <Card
                  isPressable
                  className="p-2 bg-primary rounded-md shadow-lg  text-foreground border-[1px] border-divider"
                  key={blog.id}
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col gap-4 items-start">
                    <Skeleton className="rounded-lg" isLoaded={!loading}>
                      <div className="flex gap-4 justify-center items-center parent">
                        <Avatar
                          color="primary"
                          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                      </div>
                    </Skeleton>

                    <Skeleton className="rounded-lg" isLoaded={!loading}>
                      <h4 className="font-bold text-large p-2">{blog.title}</h4>
                    </Skeleton>
                    <Skeleton className="rounded-lg" isLoaded={!loading}>
                      <h4 className="font-bold text-medium p-2 text-left text-primary-foreground">
                        {blog.body}
                      </h4>
                    </Skeleton>
                  </CardHeader>
                  <CardBody className="overflow-visible">
                    <Skeleton className="rounded-lg" isLoaded={!loading}>
                      {/* <Image
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={post.img}
                    width={270}
                    height={300}
                  /> */}
                    </Skeleton>
                  </CardBody>
                  <CardFooter>
                    <Button
                      onPress={() => router.push(`dashboard/${blog.id}`)}
                      className="p-4 text-large text-foreground font-bold  w-full"
                      variant="shadow"
                      color="secondary"
                      radius="md"
                      size="lg"
                    >
                      Read Post
                    </Button>
                  </CardFooter>
                </Card>
                {/* </Link> */}
              </>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default AllBlog;
