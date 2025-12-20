import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
    const { slug } = useParams();

    const [data, setData] = useState([])

    useEffect(() => {

        fetch(`http://localhost:3000/api/get-category?slug=${slug}`)
        .then(res => res.json())
        .then(result => {
            if (result.success) setData(result.data)
        })
    .catch(err => console.log(err));
    }, [slug]);

    return (
        <div>
            <h1>Tin tức: {slug} </h1>
            <div >
                {data.map((item: any, idx) => (
                    <div key={idx}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;