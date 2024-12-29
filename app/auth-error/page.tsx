// Import necessary components
'use client'




export default function Error() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600">
            We apologize for the inconvenience. It seems like an error occurred.
          </p>
        </div>
      </div>
    );
  }