"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectLogo from "@/app/logo/ProjectLogo";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useGetUser } from "@/app/hooks/useGetUser";
import NavbarWallet from "../WalletForNavbar";
export default function Nav() {
  const { openAccountModal } = useAccountModal();
  const { userData, loading } = useGetUser();

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
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <div className="flex items-center gap-4">
            <NavbarWallet />
            <Dropdown
              placement="bottom-start"
              backdrop="blur"
              className="bg-background"
            >
              <DropdownTrigger>
                <Avatar src={userData?.imagePath} color="success" isBordered />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User Actions"
                variant="solid"
                color="secondary"
              >
                <DropdownItem key="profile" className="h-14 gap-2">
                  <Link href="/profile">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@{userData?.username}</p>
                  </Link>
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
