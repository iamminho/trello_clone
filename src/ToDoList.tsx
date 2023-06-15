import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  checkingPassword: string;
}

const TodoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@gamil.com",
    },
  });

  const OnValid = (data: any) => {
    //console.log(data);
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
          })}
          placeholder="First Name"
        />
        <span>{errors?.lastName?.message}</span>

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
          placeholder="Re Password"
        />
        <span>{errors?.checkingPassword?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
