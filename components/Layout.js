import React from 'react';

const Layout = (props) => {
    return (
        <div>
            <h1>I'm a header</h1>
            {props.children}
            <h1>I'm a footer</h1>
        </div>
    )

};

export default Layout;