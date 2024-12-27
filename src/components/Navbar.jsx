import React from 'react';

import icon1 from '/images/iteration-2-images/icons/1.svg';
import icon2 from '/images/iteration-2-images/icons/2.svg';
import icon3 from '/images/iteration-2-images/icons/3.svg';
import icon4 from '/images/iteration-2-images/icons/4.svg';
import icon5 from '/images/iteration-2-images/icons/5.svg';
import icon6 from '/images/iteration-2-images/icons/6.svg';

export default function Navbar() {
    return (
        <>
            <div className="wrapper bg-white">
                <div className="container">
                    <section className="category-block">
                        <div className="block-item">
                            <img src={icon1} alt="Kore" />
                            <p>YENİ! Kore</p>
                        </div>
                        <div className="block-item">
                            <img src={icon2} alt="Pizza" />
                            <p>Pizza</p>
                        </div>
                        <div className="block-item">
                            <img src={icon3} alt="Burger" />
                            <p>Burger</p>
                        </div>
                        <div className="block-item">
                            <img src={icon4} alt="Kızartmalar" />
                            <p>Kızartmalar</p>
                        </div>
                        <div className="block-item">
                            <img src={icon5} alt="Fast food" />
                            <p>Fast food</p>
                        </div>
                        <div className="block-item">
                            <img src={icon6} alt="Gazlı İçecek" />
                            <p>Gazlı İçecek</p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
