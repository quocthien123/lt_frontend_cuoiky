interface NewCardProps {

    title: string;
    category: string;
    image: string;
    time?: string;


}

export default function NewCard({title, category, image, time}: NewCardProps) {

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition">
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />

            <div className="p-3">

                <span className="text-xs text-gray-500">{category}</span>
                <h3 className="font-bold text-black mt-1 line-clamp-2">{title}</h3>
                {time && <p className="text-xs text-gray-400 mt-1">{time}</p>}
            </div>
        </div>

    );
}
