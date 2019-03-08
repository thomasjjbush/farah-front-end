import React from 'react';

const Notification = (props) => {
    return (
        <div>
            Your item "{props.label}" was successfully {props.action}.
        </div>
    );
}

export default Notification;