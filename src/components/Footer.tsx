import React from 'react'

const Footer = () => {   
    return (
        <nav className="bg-black h-36 flex flex-col items-center justify-center ">
            <div className="flex justify-between items-center mx-auto">
                <div className="flex flex-col items-center" >
                    <div className="flex items-center justify-center">
                        <span className='text-[16px] text-green-500 font-semibold'>CaldasCard</span>                        
                    </div> 
                    <div className="flex items-center justify-center">
                        <span className='text-[12px] text-green-500 font-semibold'>Versão:1.10 - 04/07/2023</span>                        
                    </div>                    
                </div>                    
            </div>
        </nav> 
    )
}

export default Footer
