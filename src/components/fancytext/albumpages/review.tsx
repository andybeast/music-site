import React from 'react';

const LeaveReview: React.FC = () => {
  return (
    <div className="w-full p-6 border rounded-lg shadow-lg mt-32 mb-32">
      <h3 className="text-4xl font-bold mb-8 text-white text-center">Leave a Review</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-md">
          <label htmlFor="reviewTitle" className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            id="reviewTitle"
            className="w-full p-2 rounded-lg bg-zinc-600 text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter the title of your review"
          />
        </div>
        <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-md">
          <label htmlFor="reviewText" className="block text-lg font-semibold mb-2">Review</label>
          <textarea
            id="reviewText"
            className="w-full p-2 rounded-lg bg-zinc-600 text-white border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={4}
            placeholder="Write your review here"
          ></textarea>
        </div>
        <div className="bg-zinc-800 text-white p-6 rounded-lg shadow-md">
          <label className="block text-lg font-semibold mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((note) => (
              <svg
                key={note}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveReview;