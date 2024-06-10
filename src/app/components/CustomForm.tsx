"use client"
import { useForm } from "react-hook-form";

const CustomForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const formSubmit = (data:object) => {
    console.log(data);
    reset();
  };

  return (
   <div className="max-w-[600px] mx-auto flex items-center h-screen   px-4">
     <form onSubmit={handleSubmit(formSubmit)} className="bg-gray-100 w-full p-6 rounded-lg shadow-md">
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
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="Email"
          className="input-field"
        />
        {errors.email && (
          <p className="error">Please enter a valid email address.</p>
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
            validate: (value) => value === formData.password,
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
        <input className="btn bg-green-800 hover:bg-green-600 text-white font-bold py-3 transition-all ease-linear duration-300 px-8 rounded cursor-pointer" type="submit" value="Submit" />
      </div>
    </form>
   </div>
  );
};

export default CustomForm;
