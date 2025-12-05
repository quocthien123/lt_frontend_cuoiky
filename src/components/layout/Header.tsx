import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='bg-white shadow-sm sticky top-0 z-40'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>

            {/*Logo */}
            <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center'>
                Tinbong

            </Link>

            {/*Main Nav */}
            <nav className='hidden md:flex space-x-6'>
                <Link to="/" className='text-gray-700 hover:text-blue-600 font-medium'>Trang chủ</Link>
                <Link to="/matches" className='text-gray-700 hover:text-blue-600'>Trực tiếp</Link>
                <Link to='/standings' className='text-gray-700 hover:text-blue-600' >BXH</Link>
                <Link to='/videos' className='text-gray-700 hover:text-blue-600' >Videos</Link>
                <Link to='/transfer' className='text-gray-700 hover:text-blue-600' >Chuyển nhượng</Link>
            </nav>

            {/*Action */}
            <div className='flex items-center space-x-4'>

                <button className='hidden md:block text-sm text-gray-600 hover:text-blue-600'>
                    Đăng nhập
                </button>
                <span className='bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold'>Premium</span>
            </div>
            </div>
        </header>
    )
}