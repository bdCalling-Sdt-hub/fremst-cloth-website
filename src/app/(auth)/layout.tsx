import React from 'react'; 
import { Poppins } from 'next/font/google'; 
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div
        className="w-full flex items-center justify-center relative"
        style={{
            height: "100vh",
        }}
    >
        
        <div
            style={{
                backgroundImage: `url('/safety.png')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
            }}
        ></div>
    
     
        <div
            style={{
                background: '#ffffff',
                padding: 30,
                borderRadius: 10,
                width: 570,
                position: 'relative',
                zIndex: 2,
            }} 
            className={` ${poppins.className}  shadow-xl`}
        >
           {children}
        </div>
    </div>
    );
};

export default layout;