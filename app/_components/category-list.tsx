import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categoires = await db.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-3">
      {categoires.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
