const Avatar = ({ imageUrl, initials, name }) => {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={`Avatar for ${name}`}
                className="transform scale-110 w-10 h-10 rounded-full object-cover"
            />
        );
    }

    return (
        <div className="min-w-10 h-10 rounded-full bg-simbaris-primary flex items-center justify-center text-white font-bold text-md">
            {initials}
        </div>
    );
};

export default Avatar;