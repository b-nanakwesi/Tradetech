import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface NeonLinkProps {
    label: string
    url: string
    icon?: IconType
}

const NeonLink: React.FC<NeonLinkProps> = ({label, url, icon: Icon}) => {
  return (
      <Link href={url}>
          <button className='bg-neon-blue h-max flex items-center gap-2 text-white py-3 px-8 rounded-lg hover:bg-night'>
              {Icon && <Icon />}
              <p>{label}</p>
          </button>
    </Link>
  )
}

export default NeonLink