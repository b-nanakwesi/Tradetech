import React from 'react'
import Select from 'react-select';


interface Props {
    placeholder: string
    name: string
    isMulti?: boolean
    value: any
    onChange: (e: any) => void
    options: any
}

const CustomSelect: React.FC<Props> = ({placeholder, name, isMulti, value, onChange, options}) => {
  return (
      <Select
          placeholder={placeholder}
          name={name}
          isMulti={isMulti || false}
          value={value}
          onChange={onChange}
          isClearable
          options={options}
          theme={(theme) => ({
            ...theme,
            borderRadius: 7,
            spacing: {
                ...theme.spacing,
                controlHeight: 55,
            }
        })}
      />
  )
}

export default CustomSelect