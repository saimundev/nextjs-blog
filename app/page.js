import axios from "axios";
import BlogData from "./components/BlogData";
import Header from "./components/Header";

const blogDataFeaching = async () => {
  try {
    const result = await axios.get("http://localhost:3000/api/createBlog");
    return result.data;
  } catch (error) {
    throw new Error("somethieng went wrong");
  }
};

export default async function Home() {
  const data = await blogDataFeaching();
  return (
    <main>
      <Header />

      {data.map((item) => (
        <BlogData key={item.id} item={item} />
      ))}
    </main>
  );
}
