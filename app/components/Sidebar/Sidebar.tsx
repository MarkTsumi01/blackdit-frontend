"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAccountModal } from "@rainbow-me/rainbowkit";

export default function Sidebar() {
  //create variable to use rounter function
  const router = useRouter();

  // hooks from rainbowkit
  const { openAccountModal } = useAccountModal();

  return (
    // Sidebar
    <div className=" text-primary-foreground flex flex-col justify-between pt-10 pb-24 shadow-lg border-r-[1px] border-divider">
      <div>
        {/* Accordion next-ui   */}
        <Accordion itemClasses={{ base: "w-52" }}>
          <AccordionItem
            // startContent={<IconLogo />}
            key="1"
            aria-label="property"
            title="Features"
            classNames={{
              title: "text-foreground pl-4 ",
              trigger: "text-foreground ",
              startContent: " pl-4",
            }}
          >
            {/* Listbox next-ui  */}
            <Listbox
              selectionMode="single"
              aria-label="Actions"
              variant="flat"
              color="secondary"
              className="font-normal gap-6"
            >
              <ListboxItem
                key="blog"
                onClick={() => router.push("/dashboard")}
                className="p-4 pl-12 pr-6 text-base font-normal "
              >
                Blog
              </ListboxItem>
              <ListboxItem
                key="create"
                onClick={() => router.push("/createblog")}
                className="p-4 pl-12 pr-6 text-base font-normal "
              >
                Create
              </ListboxItem>
              <ListboxItem
                key="profile"
                onClick={() => router.push("/profile")}
                className="p-4 pl-12 pr-6 text-base font-normal "
              >
                Profile
              </ListboxItem>
            </Listbox>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <div className="flex gap-2 pl-6">
          {/* <SignoutIcon /> */}
          <button
            className="text-slate-500 font-semibold text-base"
            onClick={openAccountModal}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
