import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface OxfordLinkProps {
    label: string
    url: string
    icon?: IconType
}

const OxfordLink: React.FC<OxfordLinkProps> = ({label, url, icon: Icon}) => {
  return (
      <Link href={url}>
          <button className='bg-oxford-blue flex h-max items-center gap-2 text-white py-3 px-8 rounded-lg hover:bg-night'>
              {Icon && <Icon />}
              <p>{label}</p>
          </button>
    </Link>
  )
}

export default OxfordLink