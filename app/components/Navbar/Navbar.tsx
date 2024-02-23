"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Switch,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectLogo from "@/app/logo/ProjectLogo";
import { useTheme } from "next-themes";
import { SunIcon } from "@/app/icons/SunIcon";
import { MoonIcon } from "@/app/icons/MoonIcon";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useGetUser } from "@/app/hooks/useGetUser";

export default function Nav() {
  const rounter = useRouter();
  const { openAccountModal } = useAccountModal();
  const { userData, loading } = useGetUser();

  console.log(userData);

  return (
    <Navbar
      position="sticky"
      className=" bg-background shadow-md border-b-[1px] border-divider"
    >
      <NavbarBrand>
        <Link href={"/"} className="flex justify-center items-center">
          <ProjectLogo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {/* <Switch
          size="lg"
          color="success"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
        ></Switch> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <div className="flex items-center gap-4">
            <Dropdown
              placement="bottom-start"
              backdrop="blur"
              className="bg-background"
            >
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    src: "https://bungalower.com/wp-content/uploads/2018/08/cat.jpg",
                  }}
                  className="transition-transform"
                  description={userData?.username}
                  name={userData?.fullname}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                variant="solid"
                color="secondary"
              >
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={openAccountModal}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
