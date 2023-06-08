"use client";

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BlogData from "../components/BlogData";
import Header from "../components/Header";

const Home = () => {
  const [deshbordData, setDeshbordData] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    const feachData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/createBlog/${data?.user?.email}`
        );
        setDeshbordData(result.data);
      } catch (error) {
        console.log(error);
        throw new Error("something went wrong");
      }
    };

    feachData();
  }, [data?.user?.email]);
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <h1 className="text-xl font-bold mt-10 text-indigo-500">Loding...</h1>
        }
      >
        <h1 className="text-center py-6 font-semibold text-3xl capitalize">
          Deshbord By {data?.user?.name}
        </h1>
        {deshbordData.map((item) => (
          <BlogData key={item.id} item={item} email={data?.user?.email} />
        ))}
      </Suspense>
    </div>
  );
};

export default Home;
