import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
  const navigate = useNavigate();
  
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'General Queries',
    'Product Features Queries',
    'Product Pricing Queries',
    'Product Feature Implementation Requests'
  ];

  const API_BASE_URL = '/api';
  
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/feedback/user-feedbacks');
      setRequests(response.data.data || []);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch requests. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !comments) {
      setError('Please fill in all required fields.');
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      const response = await axiosInstance.post('/feedback/submit', { category, comments });

      toast.success('Request submitted successfully!');
      setRequests([...requests, response.data.data]);
      setCategory('');
      setComments('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit your request. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-gray-800/80 text-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-700 transition-all duration-300 hover:scale-[1.02] mx-4 mt-12">
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-center font-medium">{error}</p>
          </div>
        )}

        <h1 className="mb-6 text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Customer Service Request
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm md:text-base text-gray-300 mb-2 font-medium">Select Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="comments" className="block text-sm md:text-base text-gray-300 mb-2 font-medium">Additional Comments</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-3 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="5"
              placeholder="Describe your issue or feedback here..."
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : '🚀 Submit Request'}
          </button>
        </form>

        {requests.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-200 mb-4 border-b pb-2">📌 Submitted Requests</h2>
            <div className="space-y-4">
              {requests.map((request, index) => (
                <div key={index} className="bg-gray-700/80 p-4 rounded-lg shadow-lg border border-gray-600">
                  <h3 className="text-lg font-bold text-purple-400">{request.category}</h3>
                  <p className="text-gray-300">{request.comments}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FeedbackForm;
