import axios from "axios";
import Header from "../components/Header";
import Container from "../components/Container";

const feachBlog = async (id) => {
  try {
    const result = await axios.get(`http://localhost:3000/api/createBlog`);
    return result.data;
  } catch (error) {
    throw new Error("seomething went wrong");
  }
};

const page = async ({ params }) => {
  const blog = await feachBlog();
  const userBlog = blog?.find((item) => item.id === params.id);

  return (
    <div>
      <Header />
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center capitalize mt-4 mb-3">
            {userBlog?.title}
          </h2>
          <h4 className="text-md font-medium text-center capitalize">
            by {userBlog?.author}
          </h4>
          <img
            src={userBlog?.image}
            alt="image"
            className="w-full h-[400px] mt-8 mb-8 object-cover"
          />
          <p className="text-sm font-medium text-gray-700">
            {userBlog?.decription}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default page;
