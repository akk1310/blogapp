import React,{useId} from 'react'

const Select = ({
    options,
    label,
    className,
    ...props
},ref) => {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label 
            htmlFor={id}
            className=''> {label}
        </label>
        }
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black w-full outline-none duration-200 border border-gray-200 focus:bg-gray-50 ${className}`}
        >
            {
                options && options.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }


        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
