"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null,
  });
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const createPost = async () => {
    try {
      // const postData = new FormData();
      // postData.append("title", formData.title);
      // postData.append("body", formData.body);
      // postData.append("image", formData.image);
      // const response = await axios.post(
      //   "http://localhost:3001/api/posts/createpost",
      //   postData,
      //   config
      // );

      const response = await axios.post(
        "http://localhost:3001/api/posts/createpost",
        {
          title: formData.title,
          body: formData.body,
          image: formData.image,
        },
        config
      );
      console.log(response.data, "API Data");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files)
      setFormData({
        ...formData,
        [e.target.name]: e.target.files && e.target.files[0],
      });
  };

  const onClearForm = () => {
    setFormData({
      title: "",
      body: "",
      image: null,
    });
  };

  return (
    <main className="w-full h-full p-16">
      <div className="p-4 flex flex-col gap-4 border-2 border-divider rounded-large bg-background">
        <h1>Create Blog</h1>
        <Divider />
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-1">
          <Input
            isClearable
            variant="bordered"
            isRequired
            size="md"
            type="text"
            labelPlacement="outside"
            placeholder="Enter your Title"
            label="Title"
            name="title"
            className="p-4"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Textarea
            isRequired
            variant="faded"
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="w-full p-4 rounded-large"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
          />
          <div className="p-4 w-full flex flex-col gap-2 text-foreground">
            <label htmlFor="file">Image</label>
            <input
              className="flex p-4 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              id="picture"
              name="image"
              type="file"
              onChange={handleFileChange}
            ></input>
          </div>
          <div className="flex justify-end gap-2 p-4">
            <Button
              type="submit"
              color="success"
              className="text-white   font-bold"
            >
              Save
            </Button>
            <Button
              onClick={() => onClearForm()}
              color="danger"
              className="text-white font-bold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
