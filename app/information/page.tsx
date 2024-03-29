"use client";
import { Input, Divider, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const InFormation = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [accessToken, setAccesstoken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccesstoken(token);
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
    "Content-Type": "multipart/form-data",
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/users/updateuser",
        formData,
        config
      );
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const updateImage = async (file: string | Blob) => {
    try {
      const imageData = new FormData();
      imageData.append("image", file);
      const response = await axios.post(
        "http://localhost:3001/api/users/upload",
        imageData,
        config
      );
      setSelectedFile(null);
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      updateImage(file);
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

  return (
    <main className="min-h-screen flex justify-center items-center ">
      <div className="bg-background shadow-lg p-16 rounded-large flex flex-col gap-6 border-[1px] border-divider">
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
            // onClear={() => handleClear()}
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
          <input
            className="flex p-4 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            id="avatar"
            name="avatar"
            type="file"
            onChange={handleFileChange}
          ></input>
          <Button
            className="text-white font-semibold text-large "
            type="submit"
            variant="shadow"
            color="secondary"
          >
            Save
          </Button>
        </form>
      </div>
    </main>
  );
};

export default InFormation;
