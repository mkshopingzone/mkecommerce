"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"
import AddProduct from "../addproducts/page";
import SellerFooter from "../components/SellerFooter";
import Nav from "../components/SellerNav";

export default function SellerPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");

    console.log("Token:", token);
    console.log("User Data:", userData);

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData)); // Parse user data safely
    } catch (error) {
      console.error("Error parsing user data:", error);
      Cookies.remove("user"); // Remove corrupted cookie
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Nav/>
      <h1 className="bg-white text-black">Welcome {user?.name || "Seller"}!</h1>
      <AddProduct />
      <SellerFooter/>
    </>
  );
}