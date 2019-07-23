import React, { Component } from 'react';

export default function Display(props) {

    if (props.showMessage) {
        return (
            <div className={props.success ? "alert alert-success" : "alert alert-danger"}>{props.message}</div>
        );
    } else {
        return null;
    }
}