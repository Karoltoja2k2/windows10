import React, { useEffect } from 'react'

function Gravity(action: Function) {
    useEffect(() => {
        if (action != null){
            action()
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Gravity
