import React from 'react';
import BookingForm from './components/BookingForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Kanban Board Bookings</h1>
      <div className="w-full max-w-4xl">
        <BookingForm />
      </div>
    </div>
  );
};

export default App;
