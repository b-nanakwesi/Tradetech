import React from 'react'

const MainBannerCard = () => {
    return (
        <article className='col-span-2 md:row-span-2 md:col-span-4 h-[480px] flex items-center lg:col-span-2 w-full rounded-xl p-6' style={{
            backgroundImage: `url(/images/main-banner.jpg)`,
            backgroundSize: 'cover',
            transition: 'background-size 0.3s',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.backgroundSize = '120%';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundSize = 'cover';
          }}
        >
            <div className='flex flex-col gap-6'>
                <p className='uppercase text-neon-blue'>Supercharged for Pros</p>
                <h1 className='text-4xl sm:text-6xl font-medium tracking-tight text-oxford-blue'>
                    JBLTune750
                </h1>
                <p className='text-night max-w-[60%]'>
                    Immerse Yourself in Exceptional Sound Quality and Comfort. Buy now at GHC450.00
                </p>
            </div>
        </article>
    )
}

export default MainBannerCard