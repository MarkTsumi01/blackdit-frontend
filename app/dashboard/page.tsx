"use client";

import React from "react";
import AllBlog from "../components/Blogs/AllBlog";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-background">
      <div>
        <AllBlog />
      </div>
    </main>
  );
};

export default Dashboard;
