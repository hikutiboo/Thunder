import React from 'react';
import "./validation-errors-list.sass";

function ValidationErrorsList({ errorItem, errorsList, keyPrototype }) {
    return (
        <ul key={keyPrototype} className="validation-errors-list">
            <h3 className="validation-errors-list-header">
                {errorItem}
            </h3>
            {
                errorsList.map((element, i) => {
                    return (
                        <li key={errorItem + "-validation-error-" + i} className="validation-errors-list-item">
                            {element}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ValidationErrorsList