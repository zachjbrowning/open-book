import React, {Component} from 'react'
import styles from "./Base.module.scss";
import { useSelector } from "react-redux";


export default function ZJBLogo() {
    const spin = useSelector(state => state.spinner)
    
    return (
            <svg className={`${styles.logo} ${spin ? styles.spin : ""}`} id="logo" x="0px" y="0px" viewBox="0 0 1565.1 1565.1">
                <polygon points="781.4,78.1 94,940.1 1087.4,1418.6 1332.7,343.5 230,343.5 475.4,1418.6 1468.9,940.1 "/>
                <line x1="781.4" y1="78.1" x2="781.4" y2="565.3"/>
                <line x1="94" y1="940.1" x2="567.4" y2="832"/>
                <line x1="230" y1="343.5" x2="610.4" y2="646.8"/>
                <line x1="1332.7" y1="343.5" x2="952.9" y2="646.4"/>
                <line x1="475.4" y1="1418.6" x2="686.2" y2="980.8"/>
                <line x1="1087.4" y1="1418.6" x2="876.8" y2="981.3"/>
                <line x1="1468.9" y1="940.1" x2="995.3" y2="832"/>
                <polygon points="1017.9,730 971.3,935.3 781.6,1026.6 591.9,935.3 545,730 676.3,565.3 886.9,565.3 "/>
            </svg>
    )
}

