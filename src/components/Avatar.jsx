const Avatar = ({ imageUrl, initials, name }) => {
    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={`Avatar for ${name}`}
                className="w-12 h-12 rounded-full object-cover"
            />
        );
    }

    return (
        <div className="min-w-12 h-12 rounded-full bg-simbaris-primary flex items-center justify-center text-white font-bold text-lg">
            {initials}
        </div>
    );
};

export default Avatar;