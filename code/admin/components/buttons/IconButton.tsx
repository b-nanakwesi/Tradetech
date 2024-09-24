import React from 'react'
import { IconType } from 'react-icons/lib'

interface Props {
    icon: IconType
    action: () => void
    color?: string
}

const IconButton: React.FC<Props> = ({icon: Icon, action, color }) => {
  return (
      <button className={`${color ? color : "text-oxford-blue"} sone `} onClick={action}>
          <Icon />
    </button>
  )
}

export default IconButton