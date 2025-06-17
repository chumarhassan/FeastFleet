import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div><Navbar /></div>
      <div>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: 10 }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src="https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pasta" />
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container mt-4'>
        {
          foodCat.length !== 0
            ? foodCat.map((data) => (
              <div key={data._id} className='mb-5'>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className='row'>
                  {
                    foodItem.length !== 0
                      ? foodItem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((filterItems) => (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-4 px-2'>
                              <Card foodItem={filterItems}
                                options={filterItems.options[0]}
                              ></Card>
                            </div>
                          ))
                      : <div>No such data found.</div>
                  }
                </div>
              </div>
            ))
            : <div>Loading categories...</div>
        }
      </div>

      <div><Footer /></div>
    </>
  );
}
