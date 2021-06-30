import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBoardForm = (props) => {

    const [formFields, setFormFields] = useState({
        title: "",
        owner: ""
    })


    const onTitleChange = (event) => {
        setFormFields({
            ...formFields,
            title: event.target.value
        })
    };

    const onOwnerChange = (event) => {
        setFormFields({
            ...formFields,
            owner: event.target.value
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.addBoardCallback({
            title: formFields.title,
            owner: formFields.owner
        });

        setFormFields({
            title: "",
            owner: ""
        })
    };



    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formFields.title}
                    onChange={onTitleChange} />
            </div>
            <div>
                <label htmlFor="owner">Owner's Name</label>
                <input
                    type="text"
                    name="owner"
                    value={formFields.owner}
                    onChange={onOwnerChange} />
            </div>
            <p>Preview: {formFields.title}</p>
            <div>
                <input type="submit" value="submit"/>
            </div>
        </form>
    )
}

NewBoardForm.propTypes = {
    addBoardCallback: PropTypes.func.isRequired
};

export default NewBoardForm;