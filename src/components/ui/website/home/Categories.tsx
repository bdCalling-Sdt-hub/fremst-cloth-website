/* eslint-disable @next/next/no-img-element */
"use client"
import Heading from '@/components/shared/Heading';
import React, { useState } from 'react'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import Slider, { Settings } from "react-slick";  
import { Big_Shoulders_Display } from 'next/font/google';
const bigShoulders = Big_Shoulders_Display({
    subsets: ['latin'],
    weight: ['400', '700'], 
  });  

const categories = [
    {
      title: 'Fatigues',
      image: '/cat6.svg' ,
    },
    {
      title: 'Protective Coverage',
      image: '/cat1.svg',
    },
    {
      title: 'Fall Protection',
      image: '/cat2.svg',
    },
    {
      title: 'Tools',
      image: '/cat6.svg',
    },
    {
      title: 'Personal Protection',
      image: '/cat5.svg',
    },
    {
      title: 'Work Shoes',
      image: '/cat3.svg',
    } ,
    {
        title: 'Fatigues',
        image: '/cat6.svg' ,
      },
      {
        title: 'Protective Coverage',
        image: '/cat1.svg',
      },
      {
        title: 'Fall Protection',
        image: '/cat2.svg',
      },
  ] 

const Categories = () => {  

    const [activeIndex, setActiveIndex] = useState(0); 
    const CustomNextArrow = ({ onClick  }: { onClick?: () => void }) => (
      <div
   className=" absolute lg:flex hidden  lg:-right-10 right-0 top-1/3 cursor-pointer   "
        onClick={onClick}
      > 
      <div className="w-10 h-10 bg-white/80  rounded-full flex items-center justify-center shadow-md">
  
        <FaArrowRightLong color="#292C61" size={20} />
      </div>
      </div>
    );
    
    const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
      <div
        className="absolute lg:flex hidden  lg:-left-7 left-0 top-1/3 cursor-pointer z-30"
        onClick={onClick}
      > 
      <div className=" w-10 h-10 bg-white/80  rounded-full flex items-center justify-center shadow-md">
  
        <FaArrowLeftLong color="#292C61" size={20} />
      </div>
      </div>
    ); 
  
    
    const settings: Settings = {
      infinite: false,
      speed: 500,
      initialSlide: 0,
      // arrows: true, 
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      autoplaySpeed: 2000, 
      nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
      beforeChange: (current, next) => setActiveIndex(next),
      customPaging: (i) => (
        <div
          style={{
            width: "35px",
            height: "3px",
            borderRadius: "5px",
            backgroundColor: i === activeIndex ? "#292C61" : "#D3D3D3",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginTop: "40px"
          }}
        />
      ),
      appendDots: (dots) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            gap: "10px"
          }}
        >
          {dots}
        </div>
      ),
  
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }; 
      

    return (
        <div className=' py-[120px] container'>
            <div>
                <Heading className=' underline underline-offset-[12px] underline-primary   ' > Browse Categories </Heading> 
                <p className='border-b border-gray-300  '></p>
            </div> 

                 {/* Slider */}
      <div className="w-full ">
      <div className=" lg:w-[1300px] md:w-[600px]  w-[400px] mt-[35px] ">
          <Slider {...settings}> 
            {
                categories.map((item, index) => (
              <div key={index} className='flex flex-col items-center gap-2 '> 
   <div className=' bg-[#f8fafe] w-[180px] h-[180px] flex items-center justify-center hover:border-2 hover:border-primary rounded cursor-pointer'>
    <img src={item.image} alt={item.title}  className='w-[160px] h-[160px]' /> 
   </div> 
   <p className={`${bigShoulders.className} text-[16px] text-center font-medium text-[#000000] pt-3 `}>{item.title}</p>
              </div> 
               ))
            }
          </Slider> 
          </div> 
          </div> 
        </div>
    );
};

export default Categories;