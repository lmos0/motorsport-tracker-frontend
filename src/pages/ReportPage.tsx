import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/ReportPage.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

interface IContactForm {
    name: string;
    subject: string;
    email: string;
    message: string;
    driverId?: string;
}

interface IFormErrors {
    name?: string;
    subject?: string;
    email?: string;
    message?: string;
}

const ReportPage: React.FC = () => {
    const [formData, setFormData] = useState<IContactForm>({
        name: '',
        subject: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<IFormErrors>({});

    // Check for driver information in sessionStorage
    useEffect(() => {
        const driverName = sessionStorage.getItem('reportDriverName');
        const driverId = sessionStorage.getItem('reportDriverId');
    
        
        if (driverName && driverId) {
            setFormData(prev => ({
                ...prev,
                subject: `Issue with driver data: ${driverName}`,
                driverId: driverId,
                message: `I'd like to report an issue with ${driverName}'s data:\n\nPlease describe the issue here...`
            }));
            
            // Clear after using it
            sessionStorage.removeItem('reportDriverName');
            sessionStorage.removeItem('reportDriverId');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof IFormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: IFormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitError(null);
        setSubmitSuccess(false);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post('http://localhost:3000/api/contacts', formData);
            setSubmitSuccess(true);

            
            setFormData({
                name: '',
                subject: '',
                email: '',
                message: ''
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setSubmitError(error.response?.data?.message || 'Something went wrong. Please try again later.');
               
            } else {
                
                setSubmitError('Something went wrong. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <Header></Header>
        <div className="app">
            <div className="app-container">
                <h1 className="page-title" id="page-title">Contact Us</h1>
                
                {submitSuccess && (
                    <div className="alert success-alert">
                        Your message has been sent successfully! We'll get back to you soon.
                    </div>
                )}
                
                {submitError && (
                    <div className="alert error-alert">
                        {submitError}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'form-input error' : 'form-input'}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'form-input error' : 'form-input'}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={errors.subject ? 'form-input error' : 'form-input'}
                        />
                        {errors.subject && <p className="error-message">{errors.subject}</p>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message" className="form-label">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                        
                            value={formData.message}
                            onChange={handleChange}
                            className={errors.message ? 'form-input error' : 'form-input'}
                        />
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-button"
                    >
                        {isSubmitting ? (
                            <div className="button-loading">
                                <div className="spinner-small"></div>
                                <span>Sending...</span>
                            </div>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </form>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
};


export default ReportPage;