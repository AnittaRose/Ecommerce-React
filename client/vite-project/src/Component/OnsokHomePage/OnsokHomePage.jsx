import React from "react"
import { Link } from 'react-router-dom';


function OnsokHomePage() {
    return (

        <>
            <div className="p-4">
                <div className="d-flex justify-content-evenly navbarrr">
                    <div className="d-flex">
                        <div className=" Onsko11 p-2 pt-1">Onsko</div>
                        <div className="home p-2">
                            <a href="./index.html" className="login11">
                                Home
                            </a>
                        </div>
                        <div className="home p-2">
                            <a href="./Bestsellers.html" className="login11">
                                Store
                            </a>
                        </div>
                        <div className="home p-2">
                            <a href="./About.html" className="login11">
                                About
                            </a>
                        </div>
                        <div className="home p-2">
                            <a href="./Contact.html" className="login11">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="p-2 home">
                        <Link to="/Login" className="login11">Login</Link>
                        </div>
                        <div className="p-2 home">
                        <Link to="/Signup" className="login11">Signup</Link>
                        </div>
                       
                        <div className="p-2 home">
                            <img
                                src="https://img.icons8.com/?size=100&id=15893&format=png&color=000000"
                                alt=""
                                className="cartcart"
                            />
                        </div>
                        <div className="p-2 home">
                            <img
                                src="https://img.icons8.com/?size=100&id=87&format=png&color=000000"
                                alt=""
                                className="whishlisttt"
                            />
                        </div>
                        <div className="p-2 home">
                            <img
                                src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                                alt=""
                                className="searchh"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="image-container">
                {/* <img src="https://static.wixstatic.com/media/84770f_a4e5aee60e58478a8781128441765935~mv2.jpg/v1/crop/x_45,y_89,w_2955,h_1767/fill/w_2522,h_1356,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/fold1_hero%20(1).jpg" className="orangegurlsimg"></img> */}
                {/* <div className="contentshine">Shine on</div> */}
                {/* /<div className="contentbeauty">beauty that reflects your spirit</div> */}
                <div className="contentbttn">
                    {/* <button className="">Shop Now</button> */}
                </div>
            </div>
            <div className="image-container">
                <img
                    src="https://static.wixstatic.com/media/c837a6_ce2611b99f714d55ac39dd982c0e2dc3~mv2.jpg/v1/crop/x_0,y_514,w_2688,h_1278/fill/w_1790,h_851,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fold3_banner.jpg"
                    alt="Background Image" className="backimgg"
                />
                <div className="content">
                    <h2 className="h2">effortless beauty, timeless charm.</h2>
                    <p className="p">new arrivals now in stock</p>
                    <div className="">
                        <button className="shop1">Shop now</button>
                    </div>
                </div>
            </div>
            <div className="pt-3 p-4 fw-bold by">Shop by category</div>
            <div className="p-4 small-box">
                <div className="text-center  subbox p-3">
                    <div className="px-5 pt-4">
                        <img
                            src="https://i.pinimg.com/736x/b5/0a/8c/b50a8cbd2e8e78207c8b94cebb4e969e.jpg"
                            alt=""
                            className="face1"
                        />
                    </div>
                    <div className="btttn pt-2">
                        <button className="facebtttn">makeup</button>
                    </div>
                </div>
                <div className="text-center  p-3 sub1">
                    <div className="px-5 pt-4">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_17aea40f0fe74fa0bd04e5052b900a9b~mv2.jpg/v1/crop/x_153,y_661,w_1752,h_2156/fill/w_489,h_601,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/fold4_body%20category.jpg"
                            alt=""
                            className="face "
                        />
                    </div>
                    <div className="btttn pt-2">
                        <button className="facebtttn">Skin</button>
                    </div>
                </div>
                <div className="text-center  p-3 sub2">
                    <div className="px-5 pt-4">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_7ed6c000f44a4e70bd6397a496c53d63~mv2.jpg/v1/crop/x_0,y_125,w_1920,h_2363/fill/w_489,h_601,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/fold4_hair%20category.jpg"
                            alt=""
                            className="face "
                        />
                    </div>
                    <div className="btttn pt-2">
                        <button className="facebtttn">Hair</button>
                    </div>
                </div>
                <div className="text-center  p-3 sub3">
                    <div className="px-5 pt-4">
                        <img
                            src="https://i.pinimg.com/736x/6e/b4/da/6eb4dacf0070de753f36757ade446485.jpg"
                            alt=""
                            className="face1"
                        />
                    </div>
                    <div className="btttn pt-2">
                        <button className="facebtttn">Body</button>
                    </div>
                </div>
                <div className="text-center  p-3 sub4">
                    <div className="px-5 pt-4">
                        <img
                            src="https://i.pinimg.com/736x/5a/82/9c/5a829c47847de4ef93dd25660fce9ac1.jpg"
                            alt=""
                            className="face1"
                        />
                    </div>
                    <div className="btttn pt-2">
                        <button className="facebtttn">Fragrance</button>
                    </div>
                </div>
                <div className="text-center  p-3 sub4">
                    <div className="px-5 pt-4">
                        <img
                            src="https://static.wixstatic.com/media/c837a6_3f664c12d6cf450fa8124bb718c24fa8~mv2.jpg/v1/crop/x_0,y_321,w_1733,h_2133/fill/w_489,h_601,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/woman%20with%20face%20cream.jpg"
                            alt=""
                            className="face1"
                        />
                    </div>
                    <div className="btttn pt-2">
                        <button className="facebtttn">Face</button>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <div className="box pt-4">
                    <div className="box12 d-flex">
                        <div className="">
                            <div className="text-center our pt-5">Our Story</div>
                            <div className="">
                                <div className="text-center pt-3 born">
                                    born from a passion for beauty rituals,
                                    <br /> we celebrate individuality and bring
                                    <br /> radiant confidence to everyone
                                </div>
                            </div>
                            <div className="text-center pt-3 for">for every body, anywhere</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <div className="green12">
                    <div className="row p-5">
                        <div className="col-2">
                            <div>
                                <div className="one px-3">Shop</div>
                                <ul className="pt-4">
                                    <li className="list">home</li>
                                    <li className="list">about</li>
                                    <li className="list">shop</li>
                                    <li className="list">Contact</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="one px-3">Policy</div>
                                <ul className="pt-4">
                                    <li className="list">terms &amp; conditions</li>
                                    <li className="list">privacy policy</li>
                                    <li className="list">refund policy</li>
                                    <li className="list">shipping policy</li>
                                    <li className="list">accessibility statement</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-2">
                            <div>
                                <div className="one px-3">contact</div>
                                <ul className="pt-4">
                                    <li className="list">500 terry francine street</li>
                                    <li className="list">san francisco, ca 94158</li>
                                    <li className="list">info@mysite.com</li>
                                    <li className="list">123-456-7890</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="subscribe">subscribe to our newsletter</div>
                            <div className="be pt-3">
                                be the first to know about our hottest discounts
                            </div>
                            <div className="pt-3">
                                <label htmlFor="pt-2" className="label">
                                    Email
                                </label>
                                <div className="pt-2">
                                    <div className="pt-1">
                                        <input type="email" className="input" />
                                    </div>
                                    <div className="pt-1">
                                        <input type="checkbox" />
                                        <span className="px-3 span">
                                            Yes, subscribe me to your newsletter.
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-3">
                                    <button className="subb">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 pt-5">
                        <div className="Onsko1 fw-bold">#Onsko</div>
                    </div>
                </div>
            </div>
        </>



    )
} export default OnsokHomePage