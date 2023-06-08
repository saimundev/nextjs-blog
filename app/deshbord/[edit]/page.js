import UpdateBlog from "@/app/components/UpdateBlog";
import axios from "axios"

const feachEditData = async ()=>{
    try {
        const result = await axios.get(`http://localhost:3000/api/createBlog`);
        return result.data;
    } catch (error) {
        throw new Error("something went wrong");
    }
}

const page =async ({params}) => {
    const data = await feachEditData();
   const editData = data.find(item =>item.id === params.edit);
  return (
    <div>
        <UpdateBlog update={editData} id={params.edit}/>
    </div>
  )
}

export default page