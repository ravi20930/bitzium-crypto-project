import React from 'react';
import '../App.css'
import { MDBNavbar } from 'mdb-react-ui-kit';

export default function Header() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    var formattedStamp = today.toLocaleString("en-US", options);

    return (
        <MDBNavbar style={{ position: "fixed", backgroundColor: "white", zIndex: 2 }} >
            <div className="headerItems" >
                <a href="/">
                    <img src="https://firebasestorage.googleapis.com/v0/b/waego1.appspot.com/o/bitzium_full.svg?alt=media&token=f5228fa4-38c8-4c06-9c97-2d9ffb98e44a"
                        style={{ cursor: "pointer" }}></img>
                </a>
                {formattedStamp}
            </div>
        </MDBNavbar>
    );
}