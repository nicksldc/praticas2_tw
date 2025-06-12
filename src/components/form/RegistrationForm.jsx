import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import FormInput from './FormInput';
import { validateForm } from '../../utils/validators';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const { addItem } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpa erro quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }
    
    const success = await addItem(formData);
    
    if (success) {
      setFormData({ name: '', email: '' });
      setErrors({});
      navigate('/items');
    }
    
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormInput
        label="Nome Completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={submitting}
      >
        {submitting ? 'Enviando...' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default RegistrationForm;