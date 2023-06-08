"use client";

import React, { useState } from "react";
import Container from "./Container";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const hanldeSearch = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.get(`/api/createBlog?search=${search}`);
      console.log("data",result.data);
    } catch (error) {}
  };
  return (
    <Container>
      <div className="py-4">
        <form onSubmit={hanldeSearch}>
          <input
            type="search"
            placeholder="Search By Title"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name=""
            id=""
            className="w-full p-2 rounded border border-gray-300 outline-none"
          />
        </form>
        <button type="submit">Search</button>
      </div>
    </Container>
  );
};

export default Search;
