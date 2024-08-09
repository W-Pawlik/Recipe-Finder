import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import NoSavedImg from "../../imgs/no-saved-rec.png";
import Modal from "../ui/Modal/Modal";

export default function SavedRecipes({ savedRecipes }) {
  const [modalRec, setModalRec] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleRecModal(recipe) {
    setIsOpen(!isOpen);
    setModalRec(recipe);
  }

  const slider = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const savedRecCount = savedRecipes.length;
  const displaySlider = savedRecCount > 5;

  return (
    <div className="savedRecipes">
      <h2>Saved Recipes</h2>

      {savedRecCount === 0 ? (
        <img
          src={NoSavedImg}
          alt=" "
          style={{ width: "25rem", borderRadius: "30px" }}
        />
      ) : displaySlider ? (
        <div className="slider">
          <button
            className="slider-btn"
            onClick={() => slider?.current.slickPrev()}
          >
            ◀
          </button>

          <Slider ref={slider} {...settings}>
            {savedRecipes.map((recipe) => {
              return (
                <div className="slider-card" key={recipe.id}>
                  <img
                    key={recipe.id}
                    className="slider-img"
                    src={recipe.img}
                    alt={recipe.name}
                    onClick={() => handleRecModal(recipe)}
                  />
                </div>
              );
            })}
          </Slider>

          <button
            className="slider-btn right"
            onClick={() => slider?.current.slickNext()}
          >
            ▶
          </button>
        </div>
      ) : (
        <div className="slider">
          {savedRecipes.map((recipe) => {
            return (
              <>
                <div className="slider-card" key={recipe.id}>
                  <img
                    key={recipe.id}
                    className="slider-img"
                    style={{ borderRadius: "10px" }}
                    src={recipe.img}
                    alt={recipe.name}
                    onClick={() => handleRecModal(recipe)}
                  />
                  {isOpen && (
                    <Modal
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                      recipe={modalRec}
                    />
                  )}
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
