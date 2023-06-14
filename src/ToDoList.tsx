import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TodoList = () => {
  const { register, watch, handleSubmit, formState } = useForm();
  const OnValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(OnValid)}
      >
        <input {...register("Email", { required: true })} placeholder="Email" />
        <input
          {...register("First_Name", { required: true })}
          placeholder="First Name"
        />
        <input
          {...register("Last_Name", { required: true })}
          placeholder="Last Name"
        />
        <input
          {...register("User_Name", {
            required: true,
            minLength: { value: 5, message: "your user name is too short" },
          })}
          placeholder="User Name"
        />
        <input
          {...register("Password", { required: true, maxLength: 12 })}
          placeholder="Password"
        />
        <input
          {...register("Re_Password", { required: true })}
          placeholder="Re Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
