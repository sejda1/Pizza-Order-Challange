import React from 'react';

import logoImage from '/images/iteration-1-images/logo.svg';

export default function Head() {
    return (
        <>
            <div className="head"
                style={{
                    height: "138px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    margin: "0",
                    width: "100%",
                    backgroundColor: "#CE2829"
                }}>
                <img
                    className="teknyemekler"
                    style={{
                        width: "20rem",
                        height: "auto",
                        margin: "3.5rem",
                    }}
                    src={logoImage}  
                    alt="Teknolojik Yemekler" />
            </div>
        </>
    );
}
