"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { IconBrandGoogle } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Authentication() {
  const apiUrl =
    process.env.currentEnv === "LOCAL" ? process.env.LOCAL : process.env.PROD;
  const [login, setLogin] = useState(true);
  const router = useRouter();
  const { status, data: session } = useSession();
  const [formData, setFormaData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (status === "authenticated") {
    toast.success("You have logged In!, Redirecting..");
    router.replace("dashboard");
  }
  const onFormDataChange = (e, key) => {
    const value = e.target.value;
    setFormaData((form) => {
      return { ...form, [key]: value };
    });
  };

  const handleSubmit = async (e, provider) => {
    e.preventDefault();
    const id = toast.loading("Sit Tight! we are setting you up");

    if (provider === "google") {
      signIn("google", { callbackUrl: "/dashboard" });
      toast.update(id, {
        render: "Rerouting to Google Login",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    if (provider === "custom") {
      const { email, password, firstName, lastName, confirmPassword } =
        formData;

      if (!email || !password) {
        toast.update(id, {
          render: "Email or Password cannot be empty",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        return;
      }
      console.log({ formData, login });
      if (login) {
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (response.error) {
          toast.update(id, {
            render: "Invalid Credentials",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        } else {
          toast.update(id, {
            render: "Logging you In",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }
        router.replace("dashboard");
      } else {
        if (!firstName || !lastName || !confirmPassword) {
          toast.update(id, {
            render: "All fields are required",
            type: "error",
            autoClose: 2000,
            isLoading: false,
          });
          return;
        }
        if (password !== confirmPassword) {
          toast.update(id, {
            render: "Passwords Dont match",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        }
        // if (phoneNumber.length < 10 || phoneNumber.length > 10) {
        //   toast.update(id, {
        //     render: "The entered Phone Number is Wrong!",
        //     type: "error",
        //     isLoading: false,
        //   });
        // }

        const response = await fetch(`${apiUrl}/api/user`, {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            phoneNumber: "NULL",
            provider: "custom",
          }),
        });
        if (response.ok) {
          toast.update(id, {
            render: "Welcome to Xtrade!, Please Login",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(id, {
            render: "User already Registered!, Please Login",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
        setLogin(true);
      }
    }
    setFormaData({
      firstName: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    console.log("Form submitted");
  };

  const handleLoginToggle = (e) => {
    e.preventDefault();
    setLogin((val) => !val);
  };
  return (
    <div className="flex w-full h-full justify-center items-center">
      {status &&
        status !== "authenticated" &&
        (status === "loading" ? (
          <div className="spinner"></div>
        ) : (
          <div className="mb-8 min-w-[400px] max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome to XTRD
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              {login ? "Login" : "Register"} to start your Investement Journey
            </p>

            <form className="my-8" onSubmit={(e) => handleSubmit(e, "custom")}>
              {login ? (
                ""
              ) : (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input
                      id="firstname"
                      placeholder="Tyler"
                      type="text"
                      onChange={(e) => {
                        onFormDataChange(e, "firstName");
                      }}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input
                      id="lastname"
                      placeholder="Durden"
                      type="text"
                      onChange={(e) => {
                        onFormDataChange(e, "lastName");
                      }}
                    />
                  </LabelInputContainer>
                </div>
              )}
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  onChange={(e) => {
                    onFormDataChange(e, "email");
                  }}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  onChange={(e) => {
                    onFormDataChange(e, "password");
                  }}
                />
              </LabelInputContainer>
              {login ? (
                ""
              ) : (
                <>
                  <LabelInputContainer className="">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      placeholder="••••••••"
                      type="password"
                      onChange={(e) => {
                        onFormDataChange(e, "confirmPassword");
                      }}
                    />
                  </LabelInputContainer>
                </>
              )}

              <button
                className="mt-8 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium text-[22.5px] shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                {login ? (
                  <span>Log In &rarr;</span>
                ) : (
                  <span>Sign Up &rarr;</span>
                )}
                <BottomGradient />
              </button>
              <p
                className="text-white text-sm font-thin w-full mt-3 text-right"
                onClick={handleLoginToggle}
              >
                {login ? (
                  <span>New user? Register &rarr;</span>
                ) : (
                  <span>Already Registered? Login &rarr;</span>
                )}
              </p>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

              <div className="flex flex-col space-y-4">
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e, "google");
                  }}
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                  <BottomGradient />
                </button>
              </div>
            </form>
          </div>
        ))}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
