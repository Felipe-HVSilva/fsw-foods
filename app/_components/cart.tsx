import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);
  return (
    <div className="space-y-4 py-5">
      {products.map((product) => (
        <CartItem cartProduct={product} key={product.id} />
      ))}

      <div className="mt-5">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subTotalPrice)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Descontos</span>
              <span>-{formatCurrency(totalDiscounts)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <span className=" text-muted-foreground">Entrega</span>
              <span>
                {Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className="font-medium uppercase text-primary">
                    {" "}
                    Grátis
                  </span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6 w-full">Finalizar pedido</Button>
    </div>
  );
};

export default Cart;
