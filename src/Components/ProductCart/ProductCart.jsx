import React, { useState } from "react";
import { Button } from "@heroui/react";
import axios from "axios";

export default function ProductCart({
  product,
  index,
  setCartData,
  setnumOfCartItems,
  setcartId,
}) {
  const [IncrementLoading, setIncrementLoading] = useState(false);
  const [DecrementLoading, setDecrementLoading] = useState(false);
  const [productCount, setProductCount] = useState(product.count);
  const [IsLoadingCart, setIsLoadingCart] = useState(false);
  async function removeProductCart(ProductId) {
    setIsLoadingCart(true);
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + ProductId,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    setIsLoadingCart(false);
    console.log(data);
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems);
    setcartId(data.cartId);
  }

  async function updateProductCart(ProductId, currentCount, count) {
    if (count < currentCount) {
      setIncrementLoading(true);
    } else {
      setDecrementLoading(true);
    }
    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + ProductId,
      { count: currentCount },
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    console.log(data);
    setCartData(data.data);
    setnumOfCartItems(data.numOfCartItems);
    setProductCount(currentCount)
    setIncrementLoading(false);
    setDecrementLoading(false);
  }

  return (
    <>
      <div
        key={index}
        className=" justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
      >
        <img
          src={product.product.imageCover}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
              {product.product.title}
            </h2>
            <p className="mt-1 text-xs text-gray-700">${product.price}</p>
            <p className="mt-1 text-xs text-gray-700">
              <span className="font-bold">Catgory: </span>
              {product.product.category.name}
            </p>
            <p className="mt-1 text-xs text-gray-700">
              <span className="font-bold">Brand: </span>
              {product.product.brand.name}
            </p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-stretch border-gray-100">
              <Button
                isLoading={DecrementLoading}
                disabled={product.count == 1}
                onPress={() => {product.count != 1&&
                  updateProductCart(
                    product.product._id,
                    product.count - 1,
                    product.count
                  );
                }}
                className="disabled:hover:bg-gray-100 disabled:text-black disabled:cursor-not-allowed min-w-8 rounded-none bg-gray-100  duration-100 hover:bg-blue-500 hover:text-blue-50"
              >
                {" "}
                -{" "}
              </Button>
              <input
                className=" w-8 border bg-white text-center text-xs outline-none"
                type="number"
                value={productCount}
                min={1}
                onChange={(e) => {
                  setProductCount(e.target.value);
                }}
                onBlur={(e) => {(product.count!=e.target.value*1)&&(e.target.value*1!=0)&&
                  updateProductCart(product.product._id,e.target.value,product.count)
                }}
              />
              <Button
                isLoading={IncrementLoading}
                onPress={() => {
                  updateProductCart(
                    product.product._id,
                    product.count + 1,
                    product.count
                  );
                }}
                className="min-w-8 rounded-none bg-gray-100 duration-100 hover:bg-blue-500 hover:text-blue-50"
              >
                {" "}
                +{" "}
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">${product.price * product.count}</p>
              <Button
                isLoading={IsLoadingCart}
                onPress={() => removeProductCart(product.product._id)}
                className="min-w-fi bg-transparent"
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 duration-150 hover:text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
