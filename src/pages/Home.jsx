import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getBestsellers } from "../redux/actions/productsActions";
import { Advantages } from "./Home/Advantages";
import { Bestsellers } from "./Home/Bestsellers";
import { Categories } from "./Home/Categories";
import { Delivery } from "./Home/Delivery";
import { Hero } from "./Home/Hero";
import { Order } from "./Home/Order";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Bestsellers />
        <Advantages />
        <Delivery />
        <Order />
      </main>
      <Footer />
    </>
  );
}

export { Home };
