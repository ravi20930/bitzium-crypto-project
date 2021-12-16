import React from 'react';
import HomeCenter from '../components/HomeCenter';
import HomeEnd from '../components/HomeEnd';

export default function Home() {
    return (
        <>
            <div className="content-item-centre">
                <HomeCenter />
            </div>
            <div className="content-item-end">
                <HomeEnd />
            <div style={{ marginTop: 100 }}></div>
            </div>
        </>
    );
}