import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOption } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

const MyOrders = async () => {
  const session = await getServerSession(authOption);

  if (!session?.user) return redirect("/");

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div>
      <Header />
      <div className="px-5 py-4">
        <h2 className="pb-6 text-lg font-semibold">Meus pedidos</h2>
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
