"use client";

import React from "react";
import Container from "./Container";
import moment from "moment";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const BlogData = ({ item, email }) => {
  const router = useRouter();
  const hanldeDelete = async (id) => {
    try {
      const result = await axios.delete(`/api/createBlog/${id}`);
      if (result.status === 200) {
        toast.success("Delete Successfull")
        router.refresh();
      }
    } catch (error) {
      toast.error("Somethinge went wrong");
    }
    router.refresh();
  };
  return (
    <Container>
      <div className="grid grid-cols-2 gap-6 mb-8 mt-10">
        <div className="">
          <img src={item.image} className="w-full rounded h-[300px]" alt="" />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold capitalize">{item.title}</h1>
          <div className="flex gap-10 py-2">
            <div className="font-medium text-gray-500">@{item.author}</div>
            <div className="text-sm font-medium text-gray-500 capitalize">
              {moment(item.createAt).fromNow()}
            </div>
          </div>
          <div className="text-sm font-medium capitalize">
            {item.decription?.slice(0, 500)}{" "}
            <Link href={`/${item.id}`} className="text-indigo-500 underline">
              Read More
            </Link>
          </div>
          {email && (
            <div className="flex gap-6 mt-6">
              <Link href={`/deshbord/${item.id}`}>
                <button className="bg-green-500 text-white px-6 py-2 rounded ">
                  EDIT
                </button>
              </Link>
              <button
                onClick={() => hanldeDelete(item.id)}
                className="bg-red-500 text-white px-6 py-2 rounded "
              >
                DELETE
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BlogData;
