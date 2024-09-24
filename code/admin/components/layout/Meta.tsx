import React from 'react'
import Head from 'next/head'

interface MetaProps {
    title: string
}

const Meta: React.FC<MetaProps> = ({ title }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title} | Admin TradeTech</title>
                {/* png favicon */}
                <link rel="shortcut icon" href="/images/favi.png" />
            </Head>
        </>
    )
}

export default Meta