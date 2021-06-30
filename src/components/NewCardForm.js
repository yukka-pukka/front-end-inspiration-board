import { useState } from 'react';
import PropTypes from 'prop-types';


const NewCardForm = (props) => {
    const [formFields, setFormFields] = useState('');


    const onMessageChange = (event) => {
        setFormFields(event.target.value)
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.addCardCallback({ message: formFields });

        setFormFields('');
    };

    return (
        <section>
            <h1>post a note!</h1>
            <form onSubmit={onFormSubmit}>
                <div>
                    <label htmlFor="Message">message:</label>
                    <input
                        name="message"
                        value={formFields}
                        onChange={onMessageChange} />
                </div>
                <input
                    type="submit"
                    value="post note" />
            </form>
        </section>
    );
};

export default NewCardForm;