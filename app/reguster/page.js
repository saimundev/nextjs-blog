"use client";

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = yup
  .object({
    name: yup.string().required().min(3).max(30),
    email: yup.string().required().min(5).max(50).email(),
    password: yup.string().required().min(5).max(50),
  })
  .required();

const Reguster = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [show, setShow] = useState(false);
  const [loding, setLoding] = useState(false);
  const router = useRouter();

  const handleReguster = async (data) => {
    try {
      setLoding(true);
      const result = await axios.post("/api/reguster", data);
      if (result.status === 200) {
        router.push("/login");
        toast.success("Account Create Successfull", {
          className: "border border-indigo-500 font-semibold",
        });
        setLoding(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        className: "border border-red-500 text-red-500 font-semibold",
      });
    }
    setLoding(false);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="w-1/3 p-5 bg-gray-100 rounded"
        onSubmit={handleSubmit(handleReguster)}
      >
        <div className="">
          <label htmlFor="" className="text-gray-500 font-medium text-sm">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 mt-1 p-2 rounded outline-none"
            placeholder="Enter Your Name..."
            name="name"
            id=""
          />
          <p className="text-red-500 font-medium text-sm">
            {errors.name?.message}
          </p>
        </div>

        <div className="mt-3">
          <label htmlFor="" className="text-gray-500 font-medium text-sm">
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            className="w-full border border-gray-300 mt-1 p-2 rounded outline-none"
            placeholder="Enter Your Email..."
            name="email"
            id=""
          />
          <p className="text-red-500 font-medium text-sm">
            {errors.email?.message}
          </p>
        </div>

        <div className="mt-3">
          <label htmlFor="" className="text-gray-500 font-medium text-sm">
            Password
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              {...register("password")}
              className="w-full border border-gray-300 mt-1 p-2 rounded outline-none"
              placeholder="Enter Your Password..."
              name="password"
              id=""
            />
            <div
              onClick={() => setShow((prev) => !prev)}
              className="absolute top-[50%] translate-y-[-50%] right-2 text-lg text-gray-500 cursor-pointer"
            >
              {show ? <BsEyeFill /> : <BsEyeSlashFill />}
            </div>
          </div>
          <p className="text-red-500 font-medium text-sm">
            {errors.password?.message}
          </p>
        </div>

        <button
          disabled={loding}
          className={`bg-indigo-500 ${
            loding && "bg-indigo-300"
          } text-white font-sm px-6 py-2 rounded mt-5 w-full hover:bg-indigo-700 duration-300`}
        >
          {loding ? "Pending..." : "Submit"}
        </button>
        <Link
          href="/login"
          className="text-sm font-medium mt-2 text-gray-500 hover:underline inline-block mx-auto"
        >
          Alredy Havn An Account? Login Plese
        </Link>
      </form>
    </div>
  );
};

export default Reguster;
