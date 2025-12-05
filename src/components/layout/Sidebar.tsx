import { Link } from "react-router-dom";

// Danh mục tin tức (mock data – sau này có thể lấy từ API)
const categories = [
  { id: 'premier-league', name: 'Ngoại hạng Anh', path: '/league/premier-league' },
  { id: 'la-liga', name: 'La Liga', path: '/league/la-liga' },
  { id: 'serie-a', name: 'Serie A', path: '/league/serie-a' },
  { id: 'bundesliga', name: 'Bundesliga', path: '/league/bundesliga' },
  { id: 'ligue-1', name: 'Ligue 1', path: '/league/ligue-1' },
  { id: 'vietnam', name: 'Đội tuyển Việt Nam', path: '/team/vietnam' },
  { id: 'u23-vietnam', name: 'U23 Việt Nam', path: '/team/u23-vietnam' },
  { id: 'transfers', name: 'Chuyển nhượng', path: '/transfers' },
  { id: 'world', name: 'Thế giới', path: '/world' },
];

export default function Sidebar() {

    return (

        <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen hidden md:block">
            <div className="p-4">

                <h2 className="text-lg font-bold text-gray-800 md-4">Danh mục</h2>

                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key = {cat.id}>
                            <Link
                                to={cat.path}
                                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition"
                            >
                                {cat.name}
                                </Link>  

                        </li>
                    ))}

                </ul>

                <div className="mt-8 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-3">Nhanh</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Link to="/results" className="text-center text-sm text-gray-600 hover:text-blue-600">KQ</Link>
                        <Link to="/standings" className="text-center text-sm text-gray-600 hover:text-blue-600">BXH</Link>
                        <Link to="/videos" className="text-center text-sm text-gray-600 hover:text-blue-600">Video</Link>
                        <Link to="/premium" className="text-center text-sm text-yellow-600 font-medium">Premium</Link>

                    </div>
                     </div>
            </div>

        </aside>
    )
}