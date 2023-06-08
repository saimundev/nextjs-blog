"use client";

import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


const UpdateBlog = ({update,id}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [decription, setDecription] = useState("");
  const [loding,setLoding] =useState(false);


  useEffect(()=>{
    setTitle(update?.title)
    setImage(update?.image)
    setDecription(update?.decription)
  },[update])
  

  const router = useRouter();

  const hanldeBlog = async (e) => {
    e.preventDefault();

    if (!title || !image || !decription) {
      return toast.error("All Field Are Required", {
        className: "border border-red-500 text-red-500 font-medium",
      });
    }

    const blogData = {
      title: title,
      image: image,
      decription: decription,
    };

    try {
      setLoding(true)
      const result = await axios.put(`/api/createBlog/${id}`, blogData);
      if (result.status === 200) {
        router.push("/deshbord");
        toast.success("Blog Create Successfull", {
          className: "border border-green-500 font-medium",
        });
        setLoding(false)
      }
    } catch (error) {
      toast.error("Something Went Wrong, Try Again Later");
      setLoding(false)
    }
  };
  return (
    <>
      <Header />
      <Container>
        <form
          className="w-1/2 mx-auto bg-gray-100 p-5 mt-10"
          onSubmit={hanldeBlog}
        >
          <h1 className="text-center uppercase text-2xl font-medium text-gray-700">
            add blog
          </h1>
          <div className="mt-3">
            <label htmlFor="" className="text-gray-500 ">
              Title:
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name=""
              id=""
              className="w-full p-2 mt-1 border border-gray-300 rounded outline-none"
              placeholder="Enter Your Title"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="" className="text-gray-500 ">
              Image URL:
            </label>
            <input
              type="text"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              name=""
              id=""
              className="w-full p-2 mt-1 border border-gray-300 rounded outline-none"
              placeholder="Enter Your Image URL"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="" className="text-gray-500 ">
              Decription:
            </label>
            <input
              type="text"
              onChange={(e) => setDecription(e.target.value)}
              value={decription}
              name=""
              id=""
              className="w-full p-2 mt-1 border border-gray-300 rounded outline-none"
              placeholder="Enter Your Title"
            />
          </div>

          <button
            type="submit"
            className={`bg-indigo-500 text-white w-full rounded p-2 mt-5 ${loding && "bg-indigo-300"}`}
            disabled={loding}
          >
           {loding ? "Pending...":"Submit"} 
          </button>
        </form>
      </Container>
    </>
  );
};

export default UpdateBlog;
