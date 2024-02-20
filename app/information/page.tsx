"use client";
import { Input, Divider, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import axios from "axios";

const InFormation = () => {
  const router = useRouter();
  const { address } = useAccount();

  const lowercaseAddress = address?.toLowerCase();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    role: "",
    walletAddress: `${lowercaseAddress}`,
  });

  const updateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/users/updateuser",
        formData
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateUser();
    router.push("/dashboard");
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {};

  return (
    <main className="min-h-screen flex justify-center items-center ">
      <div className="bg-background drop-shadow-xl p-16 rounded-large flex flex-col gap-6">
        <h1 className="text-center text-2xl font-bold">Setup Your Profile</h1>
        <Divider />
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          <Input
            isClearable
            variant="bordered"
            isRequired
            size="md"
            type="text"
            label="Fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            onClear={() => handleClear()}
          />
          <Input
            isClearable
            variant="bordered"
            isRequired
            size="md"
            type="text"
            label="Username"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
          />
          <Input
            isClearable
            variant="bordered"
            isRequired
            size="md"
            type="text"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
          <Input type="file" variant="bordered" />
          <Button
            className="text-white font-semibold text-large bg-secondary"
            type="submit"
            variant="shadow"
          >
            Save
          </Button>
        </form>
      </div>
    </main>
  );
};

export default InFormation;
