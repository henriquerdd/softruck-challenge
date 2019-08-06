import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default function Header(props) {
    
    return (
        <header className="main-header">
            <a href="#" className="logo">
                <span className="logo-mini">
                    <b>Quadros</b>
                </span>

                <span className="logo-lg">
                    <b>Q</b>uadros
                </span>
            </a>

            <nav className="navbar navbar-static-top" role="navigation">
                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only"></span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/create/boards" className="pull-right">Novo Quadro</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}