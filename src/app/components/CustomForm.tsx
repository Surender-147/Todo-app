"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
const CustomForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const formSubmit = (data: FormData) => {
    const emailExists = formDataList.some(
      (item, index) => item.email === data.email && index !== editIndex
    );
    if (emailExists) {
      setError("email", {
        type: "manual",
        message: "This email already exists.",
      });
      return;
    }
    if (editIndex !== null) {
      const updatedFormDataList = [...formDataList];
      updatedFormDataList[editIndex] = data;
      setFormDataList(updatedFormDataList);
      setEditIndex(null);
    } else {
      setFormDataList([...formDataList, data]);
    }
    clearErrors("email");
    reset();
  };
  const handleEdit = (index: number) => {
    const data = formDataList[index];
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("email", data.email);
    setValue("password", data.password);
    setValue("confirmPassword", data.password);
    setEditIndex(index);
  };
  const handleDelete = (index: number) => {
    const updatedFormDataList = formDataList.filter((_, i) => i !== index);
    setFormDataList(updatedFormDataList);
  };
  return (
    <div className="max-w-[800px] mx-auto pt-12 px-4">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-gray-100 w-full p-6 rounded-lg shadow-md"
      >
        <h1 className="text-4xl font-bold text-center mb-6">Todo Form</h1>
        <div className="form-container flex gap-4 flex-col">
          <input
            {...register("firstName", { required: true })}
            placeholder="First name"
            className="input-field"
          />
          {errors.firstName && <p className="error">First Name is required.</p>}
          <input
            {...register("lastName", { required: true, minLength: 2 })}
            placeholder="Last name"
            className="input-field"
          />
          {errors.lastName && (
            <p className="error">
              Last Name is required and must be at least 2 characters long.
            </p>
          )}
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter A valid Email!",
              },
            })}
            placeholder="Email"
            className="input-field"
          />
          {errors.email && (
            <p className="error">
              {errors.email.message
                ? errors.email.message
                : "Please enter your email"}
            </p>
          )}
          <input
            {...register("password", { required: true, minLength: 8 })}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          {errors.password && (
            <p className="error">
              Password is required and must be at least 8 characters long.
            </p>
          )}
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            type="password"
            placeholder="Confirm Password"
            className="input-field"
          />
          {errors.confirmPassword && (
            <p className="error">Passwords do not match.</p>
          )}
        </div>
        <div className="formData mt-4">
          <input
            className="btn bg-green-800 hover:bg-green-600 text-white font-bold py-3 transition-all ease-linear duration-300 px-8 rounded cursor-pointer"
            type="submit"
            value={editIndex !== null ? "Update" : "Submit"}
          />
        </div>
      </form>
      <div className="formData mt-4">
        {formDataList.length > 0 && (
          <div className="formValues">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border text-start px-4 py-2">First Name</th>
                  <th className="border text-start px-4 py-2">Last Name</th>
                  <th className="border text-start px-4 py-2">Email</th>
                  <th className="border text-start px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formDataList.map((data, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{data.firstName}</td>
                    <td className="border px-4 py-2">{data.lastName}</td>
                    <td className="border px-4 py-2">{data.email}</td>
                    <td className="border px-4 py-2">
                      <div className="flex gap-2 items-center">
                        <button
                          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                          type="button"
                          onClick={() => handleEdit(index)}
                        >
                          Update
                        </button>
                        <button
                          className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          type="button"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomForm;








