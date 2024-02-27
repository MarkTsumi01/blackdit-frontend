"use client";

import React from "react";
import { useGetUser } from "../hooks/useGetUser";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Button,
  Link,
} from "@nextui-org/react";
import { LinkedIn } from "../icons/Socialmedia/LinkedIn";
import { Github } from "../icons/Socialmedia/Github";
import { Xtwitter } from "../icons/Socialmedia/X";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { userData, loading } = useGetUser();
  const router = useRouter();
  return (
    <main className="min-h-screen flex p-4 ">
      <div className="flex gap-4  w-full ">
        <div className="w-1/5">
          <Card className="py-4 shadow-lg min-w-full w-full">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Image
                isZoomed
                alt="Card background"
                className="object-cover rounded-xl"
                src={userData?.imagePath}
                width={270}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2 text-primary p-4">
              <h1 className="text-large mt-4">My Profile</h1>
              <Divider className="mt-4" />
              <div className="flex flex-col gap-4 mt-5">
                <h2 className="p-4 ">{userData?.fullname}</h2>
                <h2 className="p-4">@{userData?.username}</h2>
                <h2 className="p-4">{userData?.role}</h2>
              </div>

              <h1 className="text-large mt-4">Social Media</h1>
              <Divider className="mt-4" />
              <div>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/MarkTsumi01"
                  anchorIcon={<Github />}
                ></Link>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://www.linkedin.com/in/kanravee-pienpikul-437a60257/"
                  anchorIcon={<LinkedIn />}
                ></Link>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://twitter.com/TsumiMark"
                  anchorIcon={<Xtwitter />}
                ></Link>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className=" w-4/5 p-4 rounded-large shadow-lg bg-background">
          <h1 className="text-large text-foreground">My Blogs</h1>
          <Divider className="mt-4" />
          <div className="mt-4 flex flex-col gap-8">
            {userData?.posts.map((blog) => (
              <div key={blog.id} className="flex justify-between ">
                <Card
                  isFooterBlurred
                  radius="lg"
                  className="border-none max-w-fit"
                >
                  <Image
                    isZoomed
                    alt={blog.imagePath}
                    className="object-cover relative"
                    height={200}
                    src={blog.imagePath}
                    width={200}
                  />
                </Card>
                <div className="flex flex-col gap-4">
                  <Button
                    className="text-medium text-white p-4 "
                    variant="shadow"
                    color="secondary"
                    radius="md"
                    size="md"
                    onClick={() => router.push(`/dashboard/${blog.id}`)}
                  >
                    Read
                  </Button>
                  <Button
                    className="text-medium text-white p-4  "
                    variant="shadow"
                    color="warning"
                    radius="md"
                    size="md"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
