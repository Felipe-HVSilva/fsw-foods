import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductPage = async () => {
  // TODO: Pegar produtos com mais pedidos
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
    take: 20,
  });
  return (
    <>
      <Header />
      <div className="px-6 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductPage;
