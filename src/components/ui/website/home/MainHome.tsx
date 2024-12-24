import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import MyCompanyCloths from './MyCompanyCloths';
import TopProduct from './TopProduct';
import WinterCollection from './WinterCollection';
import HelpContent from './HelpContent';

const MainHome = () => {
    return (
        <div className=''>
            <Banner /> 
            <Categories />
            <MyCompanyCloths /> 
            <TopProduct /> 
            <WinterCollection /> 
            <HelpContent />
        </div>
    );
};

export default MainHome;