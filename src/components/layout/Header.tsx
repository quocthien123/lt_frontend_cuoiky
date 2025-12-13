import { Link } from 'react-router-dom'
import { useState } from 'react'
import  styles  from './Header.module.css'
export default function Header () {
    return (
        <header className={styles.header}>
    
                <Link className={styles.logo} to="/">
                    Tinbong
                </Link>
                <nav>
                    {['/', '/matches', '/standings', '/videos', '/transfer'].map((path, idx) => {
                        const labels = ['Trang chủ', 'Trực tiếp', 'BXH', 'Videos', 'Chuyển nhượng']
                    //    const key = path === '/' ? 'home' : path.slice(1)
                        return (
                            <Link className={styles.link} 
                                key={path}
                               
                                to={path}
                            >
                                {labels[idx]}
                            </Link>
                        )
                    })}
                </nav>
              <div className={styles.dropdown}>
               
                      <img src="public\user.svg" alt="User Avatar" className= {styles.avatarrounded}></img>
               
                    <div className={styles.dropdownContent}>
                        <a href="#">Đăng nhập</a>
                        <a href="#">Đăng ký</a>
                    </div>
                    </div>
              
                
       
        </header>
    )
}