import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input'; 
import 'react-phone-number-input/style.css';

interface FormData {
  name: string;
  title: string;
  age: string;
  email: string;
  mobile: string;
  status: string;
}

interface FormErrors {
  name?: string;
  title?: string;
  age?: string;
  email?: string;
  mobile?: string;
}

interface BookingFormProps {
  onSubmit: (task: FormData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    age: '',
    email: '',
    mobile: '',
    status: 'unclaimed',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.age || isNaN(Number(formData.age)) || formData.age.length !== 2)
      newErrors.age = 'Age must be a valid 2-digit number';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.mobile || !/^\+?[1-9]\d{1,14}$/.test(formData.mobile))
      newErrors.mobile = 'Valid mobile number is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setSubmitError(null);

      onSubmit(formData); 

      // Reset form
      setFormData({
        name: '',
        title: '',
        age: '',
        email: '',
        mobile: '',
        status: 'unclaimed',
      });
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMobileChange = (value: string | undefined) => { 
    setFormData({
      ...formData,
      mobile: value || '', 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
      {['name', 'title', 'email'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
            {field}
          </label>
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            id={field}
            value={formData[field as keyof FormData]}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors[field as keyof FormErrors] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors[field as keyof FormErrors] && (
            <p className="text-sm text-red-500 mt-1">{errors[field as keyof FormErrors]}</p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 capitalize">
          Age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={(e) => {
            if (e.target.value.length <= 2 && /^\d*$/.test(e.target.value)) {
              handleChange(e);
            }
          }}
          maxLength={2}
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 capitalize">
          Mobile
        </label>
        <PhoneInput
          international
          defaultCountry="US"
          value={formData.mobile}
          onChange={handleMobileChange}
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.mobile ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.mobile && <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>}
      </div>

      {submitError && <p className="text-sm text-red-500">{submitError}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default BookingForm;
