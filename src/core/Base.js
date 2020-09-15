import React from "react";
import NavBar from './navBar';

const Base = ({
    title = 'My Tittle',
    description = 'My Description',
    className = 'text-center',
    children
}) => {
    return (
        <div>
            <NavBar/>
            <div>
                <div className="text-center">
                    <h2 className="display-4">{ title }</h2>
                    <p className="lead">{ description }</p>
                </div>
                <div className={ className }> { children } </div>
            </div>
        </div>
    )
}

export default Base;