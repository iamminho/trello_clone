import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  checkingPassword: string;
  extraError?: string;
}

const TodoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@gamil.com",
    },
  });

  const OnValid = (data: IForm) => {
    if (data.password !== data.checkingPassword) {
      setError(
        "password",
        { message: "Password are not the same." },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offline." });
  };

  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(OnValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please write email pattern.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>

        <input
          {...register("firstName", {
            required: "first name is required",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "nico not allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "nick not allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register("username", {
            required: "username is required",
            minLength: { value: 5, message: "your user name is too short" },
          })}
          placeholder="User Name"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register("password", {
            required: "password name is required",
            maxLength: { value: 12, message: "Password is too long." },
            minLength: { value: 6, message: "Password is too short." },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("checkingPassword", {
            required: "Checking password is required",
          })}
          placeholder="checkingPasswordd"
        />
        <span>{errors?.checkingPassword?.message}</span>

        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default TodoList;
