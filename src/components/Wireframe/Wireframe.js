import React from 'react';
import styles from './Wireframe.module.scss';

import Nav from '../Nav/Nav';
import Search from '../Search/Search';
import Viewer from '../Viewer/Viewer';

export default function Wireframe() {
    return <>

        <main>
            <div className={`container ${styles.canvas}`}>
                <Search />
                <Viewer />
            </div>
        </main>

        <Nav />

    </>
    
}
