import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import NoSavedImg from "../../imgs/no-saved-rec.png";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SavedRecipes({ savedRecipes, onSetRecipes }) {
  const [modalRec, setModalRec] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef(null);

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

  const toggleModal = (recipe) => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    setModalRec(recipe);
  };

  useEffect(
    function () {
      if (!modalRec) return;
      if (isOpen) document.title = `Recipe | ${modalRec.name}`;
      console.log(modalRec.name);
      if (!isOpen) document.title = `Recipe Finder 🍔🔎`;
    },
    [modalRec, isOpen]
  );

  function handleRemoveRecipe(recipe) {
    const newSavedRecipes = savedRecipes.filter(
      (rec) => Number(rec.id) !== Number(recipe.id)
    );
    onSetRecipes(newSavedRecipes);
  }

  const renderSavedRecipes = () =>
    savedRecipes.map((recipe) => (
      <div className="slider-card" key={recipe.id}>
        <img
          className="slider-img"
          src={recipe.img}
          alt={recipe.name}
          style={{ borderRadius: displaySlider ? "0px" : "10px" }}
          onClick={() => toggleModal(recipe)}
        />

        <Button
          className="delete-btn"
          onClick={() => handleRemoveRecipe(recipe)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    ));

  const savedRecCount = savedRecipes.length;
  const displaySlider = savedRecCount > 5;

  return (
    <div className="savedRecipes">
      <h2>Saved Recipes</h2>
      {savedRecCount === 0 ? (
        <img
          src={NoSavedImg}
          alt="No Saved Recipes"
          style={{ width: "25rem", borderRadius: "30px" }}
        />
      ) : displaySlider ? (
        <div className="slider">
          <button
            className="slider-btn"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            ◀
          </button>
          <Slider ref={sliderRef} {...settings}>
            {renderSavedRecipes()}
          </Slider>
          <button
            className="slider-btn right"
            onClick={() => sliderRef.current?.slickNext()}
          >
            ▶
          </button>
        </div>
      ) : (
        <div className="slider">{renderSavedRecipes()}</div>
      )}
      {isOpen && (
        <Modal setIsOpen={setIsOpen} isOpen={isOpen} recipe={modalRec} />
      )}
    </div>
  );
}
