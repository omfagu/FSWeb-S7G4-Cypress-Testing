// components/Form.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Service")
    .required(),
});

const CustomForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      setUsers(response.data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(
        { name, email, password, terms: termsChecked },
        { abortEarly: false }
      );
      setErrors({});

      const response = await axios.post("https://reqres.in/api/users", {
        name,
        email,
        password,
        terms: termsChecked,
      });

      setUsers((prevUsers) => [...prevUsers, response.data]);

      setName("");
      setEmail("");
      setPassword("");
      setTermsChecked(false);
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label
            for="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            invalid={!!errors.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            data-cy="name"
          />
          {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label
            for="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={!!errors.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label
            for="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={!!errors.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
        </FormGroup>
        <FormGroup check>
          <Label check className="text-gray-700 text-sm font-bold mb-2">
            <Input
              type="checkbox"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              invalid={!!errors.terms}
              className="mr-2 leading-tight"
            />
            Accept the Terms of Service
          </Label>
          {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
        </FormGroup>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Submit
        </Button>
      </Form>
      <h3 className="text-gray-700 text-lg mt-4">Users:</h3>
      <ul className="list-disc ml-6">
        {users.map((user) => (
          <li key={user.id} className="text-gray-700">
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomForm;
