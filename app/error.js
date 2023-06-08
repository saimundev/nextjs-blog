"use client";

const error = ({ error, reset }) => {
  return (
    <div className="text-center">
      <h1 className="text-center text-red-500 font-semibold text-2xl mt-10">
        {error.message}
      </h1>
      <button
        className="bg-red-500 text-white px-6 py-2 rounded mt-6"
        onClick={() => reset()}
      >
        Reset
      </button>
    </div>
  );
};

export default error;
