import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import  styles  from './Header.module.css'

interface ChildArticle {
  child_title: string;
  child_source_link: string;
}

interface Article {
  source_Link: string;
  title: string;
  child_Article: ChildArticle[];
}
const getSlug = (url: string) => {
    if (!url) return "";
    return url.replace('https://bongdaplus.vn/', '').replace(/\/$/, ''); 
};

export default function Header () {
    const  [ menu, setMenus ] = useState<Article[]>([])

    useEffect(() =>  {
        fetch("http://localhost:3000/api/bongdaplus")
        .then(response => response.json())
        .then(data => setMenus(data.data.article))
    }, [])
    return (
        <header className={styles.header}>
    

                <Link className={styles.logo} to="/">
                    Tinbong
                </Link>
                <ul>
                    {menu.map(item => (
                        <li className={styles.link}>
                            <Link to={`/danh-muc/${getSlug(item.source_Link)}`}>
                                {item.title}
                            </Link>

                            {item.child_Article && item .child_Article.length > 0 && (
                                <ul className={styles.subMenu}> 
                                {item.child_Article.map((child, childIndex) => (

                                    <li key={childIndex}>

                                        <Link to={`/danh-muc/${getSlug(child.child_source_link)}`}>
                                            {child.child_title}
                                        </Link>
                                    </li>
                                ))}
                                </ul>
                            )} 

                        </li>

                    ))

               
                    }
                </ul>
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