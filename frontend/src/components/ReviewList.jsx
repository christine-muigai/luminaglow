export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No reviews yet. Be the first to review!
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {reviews.map((review) => {
        const key = review.id || `${review.author}_${review.created_at}`;
        return (
          <div key={key} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
}