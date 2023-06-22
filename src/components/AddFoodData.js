import React, { useState } from "react";
import "./AddFoodData.css";

import { db, storage } from "../Firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddFoodData() {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [foodCategory, setFoodCategory] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [resturantName, setResturantName] = useState("");
  const [resturantAdd, setResturantAdd] = useState("");
  const [resturantPhone, setResturantPhone] = useState("");
  const [foodImageUrl, setFoodImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (foodImage == null) {
      alert("Please select an image");
      return;
    } else {
      const imageRef = ref(storage, `FoodImage/${foodImage.name}`);
      uploadBytes(imageRef, foodImage)
        .then(() => {
          alert("Image upload successfully");
          getDownloadURL(imageRef).then((url) => {
            // console.log("url", url)
            setFoodImageUrl(url);
            const foodData = {
              foodName,
              foodCategory,
              foodDescription,
              foodImageUrl: url,
              foodPrice,
              resturantAdd,
              resturantName,
              resturantPhone,
            };
            console.log("data", foodData);
            try {
              const docRef = addDoc(collection(db, "FoodData"), foodData);
              alert("Data added successfully", docRef.id);
            } catch (error) {
              alert("Error adding document:", error);
            }
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="form-outer">
      <h1>Add Food Data</h1>
      <form className="form-inner">
        <label>Food Name</label>
        <input
          type="text"
          name="food_name"
          onChange={(e) => {
            setFoodName(e.target.value);
          }}
        />
        <br />
        <label>Food Description</label>
        <input
          type="text"
          name="food_desc"
          onChange={(e) => {
            setFoodDescription(e.target.value);
          }}
        />
        <br />
        <label>Food price</label>
        <input
          type="numbre"
          name="food_price"
          onChange={(e) => {
            setFoodPrice(e.target.value);
          }}
        />
        <br />
        <label>Food Category</label>
        <input
          type="text"
          name="food_catrgory"
          onChange={(e) => {
            setFoodCategory(e.target.value);
          }}
        />
        <br />
        <label>Food Image</label>
        <input
          type="file"
          name="food_image"
          onChange={(e) => {
            setFoodImage(e.target.files[0]);
          }}
        />
        <br />
        <label>Resturant Name</label>
        <input
          type="text"
          name="resturant_name"
          onChange={(e) => {
            setResturantName(e.target.value);
          }}
        />
        <br />
        <label>Resturant Address</label>
        <input
          type="text"
          name="resturant_address"
          onChange={(e) => {
            setResturantAdd(e.target.value);
          }}
        />
        <br />
        <label>Resturant Phone</label>
        <input
          type="number"
          name="resturant_phone"
          onChange={(e) => {
            setResturantPhone(e.target.value);
          }}
        />
        <br />
        <button onClick={handleSubmit}>Add Food</button>
      </form>
    </div>
  );
}

export default AddFoodData;
