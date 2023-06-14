import React, { useState } from "react";
import { useForm } from "react-hook-form";

const TodoList = () => {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="Email" />
        <input {...register("First_Name")} placeholder="First Name" />
        <input {...register("Last_Name")} placeholder="Last Name" />
        <input {...register("User_Name")} placeholder="User Name" />
        <input {...register("Password")} placeholder="Password" />
        <input {...register("Re_Password")} placeholder="Re Password" />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
