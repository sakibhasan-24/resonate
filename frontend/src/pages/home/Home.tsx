import Navbar from "@/components/Navbar";
import { useGetAllProductsQuery } from "@/redux/services/productApiSlice";

export default function Home() {
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  console.log(products);
  // if (error) return <div>Error: {error}</div>;
  if (!products) return null;
  // cons
  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // console.log(data);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="max-w-4xl mx-auto p-4 ">
        <h1 className="text-blue-700 text-4xl font-bold ">
          Try To explore redux
        </h1>
        <div>
          <h1 className="text-2xl text-slate-200  my-6">Products</h1>
        </div>
      </div>
    </div>
  );
}
