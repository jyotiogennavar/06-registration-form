import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation error message
    let errorMsg = "";
    switch (name) {
      case "name":
        errorMsg =
          value.length < 3 ? "Name must be at least 3 characters long" : "";
        break;
      case "email":
        errorMsg = !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email address" : "";
        break;
      case "mobile":
        errorMsg = value.length !== 10 ? "Mobile number must be 10 digits" : "";
        break;
      default:
        break;
    }
    setError({ ...error, [name]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = Object.values(error).filter((error) => error !== "");
    if (formErrors.length > 0) {
      setSuccess("");
      return;
    }

    if (!formData.name || !formData.email || !formData.mobile) {
      setSuccess("");
      setError({ ...error, name: "All fields are required" });
    } else {
      const successMessage = "Account created successfully 🎉";
      setError({ name: "", email: "", mobile: "" });
      setSuccess(successMessage);
      console.log(successMessage);
      setTimeout(() => setSuccess(""), 3000);
      setFormData({ name: "", email: "", mobile: "" });
    }
  };
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <h2>Create an Account</h2>

          <FormFields>
            <InputContainer>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                placeholder="Enter your name"
                required
              />
              {error.name && <Error>{error.name}</Error>}
            </InputContainer>

            <InputContainer>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                placeholder="Enter your email"
              />
              {error.email && <Error>{error.email}</Error>}
            </InputContainer>

            <InputContainer>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                id="mobile"
                placeholder="Enter your mobile number"
              />
              {error.mobile && <Error>{error.mobile}</Error>}
            </InputContainer>
            <SuccessPopOver success={success}>{success}</SuccessPopOver>
          </FormFields>

          <button type="submit">Submit</button>
        </Form>
        <Slider></Slider>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 4rem 10rem;
  font-family: "Poppins", sans-serif;

  h2 {
    font-size: clamp(1.5rem, 5vw, 2rem);
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    margin: 2rem;

    h2 {
      text-align: center;
    }
  }
`;

const FormWrapper = styled.div`
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Form = styled.form`
  flex: 1;
  padding: 2rem;

  button {
    width: 15rem;
    margin-top: 1.5rem;
    padding: 0.8rem 2rem;
    border: none;
    background: #151517;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;

    transition: all 0.3s;
    box-shadow: 3px 3px 0px #39393d;

    &:hover {
      box-shadow: none;
      transform: translate(3px, 3px);
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.2rem;
  display: block;
`;
const SuccessPopOver = styled(motion.span)`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: green;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.2rem;
  display: block;

  font-size: 1rem;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ success }) => (success ? 1 : 0)};
`;

const InputContainer = styled.div`
  max-width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    font-size: 1rem;
  }

  input,
  select {
    height: 3rem;
    border: 1px solid gray;
    border-radius: 0.4rem;
    padding: 0.5rem;
  }
`;

const Slider = styled.div`
  flex: 1;
  background: url("https://images.pexels.com/photos/9592227/pexels-photo-9592227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-size: cover;
  background-position: center;
  border-radius: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default ContactForm;
