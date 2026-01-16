import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/title")
      .then(res => res.json())
      .then(res => setMenu(res.data));
  }, []);

  const getSlug = (url: string) => url.replace('https://bongdaplus.vn/', '').replace(/\/$/, '').replace(/^\//, '');

  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top shadow-sm p-0">
    <div className="container"> 
      <Link className="navbar-brand fw-bold py-3 ps-5" to="/">TIN BONG</Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto"> 
          {menu.map((item: any, index) => (
            <li key={index} className={`nav-item ${item.child_Article?.length > 0 ? 'dropdown' : ''}`}>
                {item.child_Article?.length > 0 ? (
                  <>
                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                      {item.title}
                    </a>
                    <ul className="dropdown-menu ">
                      {item.child_Article.map((child: any, i: number) => (
                        <li key={i}>
                          <Link className="dropdown-item " to={`/danh-muc/${getSlug(child.child_source_link)}`}>
                            {child.child_title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link className="nav-link text-white " to={`/danh-muc/${getSlug(item.source_Link)}`}>
                    {item.title}
                  </Link>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
);
}
