import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  });
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
