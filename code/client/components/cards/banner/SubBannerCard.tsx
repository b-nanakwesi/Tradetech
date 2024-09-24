import React from 'react'

interface BannerCardProps {
    subtitle: string
    title: string
    text: string
    img: string
}

const SubBannerCard: React.FC<BannerCardProps> = ({ subtitle, title, text, img }) => {

    return (
        <article className='col-span-1 row-span-1 min-w-[100px] h-full flex items-center w-full rounded-xl p-4 md:p-6' style={{
            backgroundImage: `url(/images/${img})`,
            backgroundSize: 'cover',
            transition: '0.4s',
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
            <div className='flex flex-col gap-2'>
                <p className='uppercase text-sm text-neon-blue'>{subtitle}</p>
                <h1 className='sm:text-xl md:text-2xl w-max font-medium tracking-tight text-oxford-blue'>
                    {title}
                </h1>
                <p className='text-night text-xs sm:text-sm max-w-[80%]'>
                    {text}
                </p>
            </div>
        </article>
    )
}

export default SubBannerCard