import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #666;
  height: 200px;
  padding-top: 90px;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #333;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/signup', { email });
      if (response.status === 201) {
        setStatusMessage("You've signed up for our weekly newsletter!");
      } else {
        setStatusMessage(
          'There was a problem signing up for our weekly newsletter. Please try again later, or contact us for support via email.',
        );
      }
    } catch (error) {
      setStatusMessage(
        'There was a problem signing up for our weekly newsletter. Please try again later, or contact us for support via email.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <p>Sign up for our weekly newsletter:</p>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
      {loading && <p>Loading...</p>}
      {statusMessage && <p>{statusMessage}</p>}
    </FormContainer>
  );
};

export default NewsletterForm;
