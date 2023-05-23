import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HeaderNav } from "../components/partials/HeaderNav";
import { NotificationBanner } from "../components/shared/warningNotification";
import { Footer } from "../components/partials/Footer";
import { Productsv2 } from "../components/shared/productsv2";

export default (props) => {
  const auth = JSON.parse(localStorage.getItem("profile"));
  const [view, setView] = useState("list");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("Pharmaceuticals");
  const location = useLocation();

  const selectedCategory = () => {
    const favBtn = document.getElementById("favorites-btn");
    const pharmaBtn = document.getElementById("pharmacy-btn");
    const animalBtn = document.getElementById("animal-btn");
    const medicalBtn = document.getElementById("medical-btn");
    const dealBtn = document.getElementById("deals-btn");
    // const specialsBtn = document.getElementById("specials-btn");
    const query = new URLSearchParams(props.location.search);
    const cat = query.get("category");

    if (cat && cat !== "") {
        if (
            cat === "Favorites"
            && auth
        ) {
            favBtn.click();
        }

        if (
            cat === "Pharmaceuticals"
        ) {
            pharmaBtn.click();
        }

        if (
            (cat === "Animal Health" || cat === "animalhealth")
        ) {
            animalBtn.click();
        }

        if (
            (cat === "Medical Supplies" || cat === "medicalsupplies")
        ) {
            medicalBtn.click();
        }

        if (
            (cat === "Specials" || cat === "specials")
        ) {
            dealBtn.click();
        }

      // if (
      //   (cat === "Weekly Specials" || cat === "weeklyspecials") &&
      //   specialsBtn.className.split(" ").length === 2
      // )
      //   specialsBtn.click();
    }
    else {
        pharmaBtn.click();
    }
  };

  useEffect(() => {
    selectedCategory();
    // setIsLoading(true)
  }, [location]);

  useEffect(() => {
    selectedCategory();
    setIsLoading(true);
  }, []);

  return (
    <>
        <Helmet>
            <title>Shop | Premier Pharmaceuticals</title>
        </Helmet>
        <HeaderNav />
        <div className="shop-page">
            <div className="shop-header container-fluid px-4">
                <h1>Best Available<br/>Nature-Based Products</h1>
                <div className="shop-categories container-fluid d-flex">
                    {
                        auth
                        && <button id="favorites-btn" className={"category-button" + (category === "Favorites" ? " active" : "")} onClick={() => setCategory("Favorites")}>
                            My Favorites
                        </button>
                    }
                    <button id="deals-btn" className={"category-button" + (category === "Specials" ? " active" : "")} onClick={() => setCategory("Specials")}>
                        Short Dated
                    </button>
                    <button id="pharmacy-btn" className={"category-button" + (category === "Pharmaceuticals" ? " active" : "")} onClick={() => setCategory("Pharmaceuticals")}>
                        Pharmaceuticals
                    </button>
                    <button id="animal-btn" className={"category-button" + (category === "Animal Health" ? " active" : "")} onClick={() => setCategory("Animal Health")}>
                        Animal Health
                    </button>
                    <button id="medical-btn" className={"category-button" + (category === "Medical Supplies" ? " active" : "")} onClick={() => setCategory("Medical Supplies")}>
                        Medical/Surgical
                    </button>
                </div>
            </div>

            <div className="container-fluid px-4">
                <div className="content">
                    <NotificationBanner />
                    <Productsv2
                        page="shop"
                        shopFont={true}
                        view={view}
                        setView={setView}
                        category={category}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </div>
            </div>
        </div>
      <Footer />
    </>
  );
};
