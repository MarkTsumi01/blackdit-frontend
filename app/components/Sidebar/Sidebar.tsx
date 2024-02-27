"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ContentIcon } from "@/app/icons/Sidebar/Content";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="bg-background text-primary-foreground flex flex-col justify-between pt-10 pb-24 shadow-lg border-r-[1px] border-divider">
      <div>
        <Accordion itemClasses={{ base: "w-52" }}>
          <AccordionItem
            startContent={<ContentIcon />}
            key="1"
            aria-label="property"
            title="Features"
            classNames={{
              title: "text-primary pl-4 ",
              trigger: "text-primary ",
              startContent: " pl-4",
            }}
          >
            <Listbox
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
                onClick={() => router.push("/dashboard/createblog")}
                className="p-4 pl-12 pr-6 text-base font-normal"
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
        <div className="flex gap-2 pl-6"></div>
      </div>
    </div>
  );
}
