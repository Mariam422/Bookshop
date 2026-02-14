function StarIcon({ filled = true }) {
  return (
    <span className={filled ? "text-yellow-500" : "text-gray-300"}>★</span>
  );
}

export function Reviews({ review }) {
  return (
    <div className="bg-white rounded-lg p-4 max-w-md ">
      <div className="flex items-start gap-4 mb-3">
        <img
          src={review.userAvatar || "/default-avatar.png"}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <h5 className="font-semibold text-lg">{review.userName}</h5>
          <p className="text-sm text-emerald-500">{review.userRole}</p>
          <p className="text-sm text-gray-500 mt-1">
            Reviewed On {review.date}
          </p>

          <div className="flex gap-2 mt-2">
            <span className="font-medium">
              Excellent Book {review.rating.toFixed(1)}
            </span>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < review.rating} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}
