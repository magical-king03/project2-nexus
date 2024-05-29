import React from "react";
import Nav from "./Nav";
import '../css/App.css'
import food1 from '../img/food1.jpg'
import food2 from '../img/food2.jpg'
import food3 from '../img/food3.jpg'

function Home() {
    return (
        <div>
            <div className="bg-opacity">
                <Nav />
            </div>
            <hr />
            <div className="flex items-center justify-center">
            <div className="md:flex items-center justify-center gap-[50px] mt-[70px]">
                <div className="w-[300px] h-[350px] border-1 border-black bg-white rounded-lg">
                    <img src={food1} alt="food1" className="rounded-lg" />
                    <div className="flex justify-between p-[12px]">
                        <div className="w-[200px] ">
                            <p className="text-xl font-bold">Fruit salad</p>
                            <p>Refresh your senses with our vibrant fruit salad</p>
                        </div>
                        <p>Rs. 250</p>
                    </div>
                    <div className="text-center">
                        <button className="border-1 border rounded-lg border-black cursor-pointer px-2 py-2">Order Now</button>
                    </div>
                </div>
                <div className="w-[300px] h-[350px] border-1 border-black bg-white rounded-lg mt-[30px] md:mt-0">
                    <img src={food2} alt="food2" className="rounded-lg" />
                    <div className="flex justify-between p-[12px]">
                        <div className="w-[200px]">
                            <p className="text-xl font-bold">Pizza</p>
                            <p>Indulge in the ultimate comfort food: cheesy pizza.</p>
                        </div>
                        <p>Rs. 250</p>
                    </div>
                    <div className="text-center">
                        <button className="border-1 border rounded-lg border-black cursor-pointer px-2 py-2">Order Now</button>
                    </div>
                </div>
                <div className="w-[300px] h-[350px] border-1 border-black bg-white rounded-lg mt-[30px] md:mt-0">
                    <img src={food3} alt="food3" className="rounded-lg" />
                    <div className="flex justify-between p-[12px]">
                        <div className="w-[200px]">
                            <p className="text-xl font-bold">Sandwich</p>
                            <p>Experience the perfect bite with our sandwiches</p>
                        </div>
                        <p>Rs. 350</p>
                    </div>
                    <div className="text-center">
                        <button className="border-1 border rounded-lg border-black cursor-pointer px-2 py-2">Order Now</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home