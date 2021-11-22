import React from 'react'

function DefaultLayout(props) {
    return (
        <div>
            <div className= "header bs1">
                <div className= "d-flex justify-content-between">

                    <h1> uDrive </h1>

                    <button> user </button>

                </div>
            </div>
            <div className= "content bs2">
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout
