import React, { useEffect } from 'react'

const OrderStatusTag = ({ status }: { status: string }) => {
    const [colorStyle, setColorStyle] = React.useState('bg-gray-200 text-gray-600')
    useEffect(() => {
        switch (status) {
            case "Not Processed":
                setColorStyle("bg-gray-200 text-gray-600")
                break;
            case "Cash on Delivery":
                setColorStyle("bg-gray-200 text-gray-600")
                break;
            case "Processing":
                setColorStyle("bg-yellow-200 text-yellow-600")
                break;
            case "Dispatched":
                setColorStyle("bg-green-200 text-green-600")
                break;
            case "Cancelled":
                setColorStyle("bg-red-200 text-red-600")
                break;
            case "Delivered":
                setColorStyle("bg-violet-200 text-violet-600")
                break;
            
        }
        
    }, [status]);
  return (
      <div className={`${colorStyle} text-sm min-w-max px-4 py-2 rounded-lg`}>
          {
              status === "Cash on Delivery" ? "Pending" : status
          }
    </div>
  )
}

export default OrderStatusTag