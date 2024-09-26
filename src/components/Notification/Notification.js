import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    const notifySuccess = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };

    return (
        <>
            <ToastContainer />
        </>
    );
};

export default Notification;
