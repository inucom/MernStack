import React from 'react';

const Footer = () => {
    return (
        <footer >
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} InuAttention. All rights reserved.
                </p>
                <p className="text-sm mt-2">
                    Contact us at inuattention@gmail.com
                </p>
            </div>
        </footer>
    );
}

export default Footer;
