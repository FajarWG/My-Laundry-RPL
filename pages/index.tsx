import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import toast from "react-hot-toast";

import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";

function LoginPage() {
  const route = useRouter();

  const { mode } = useContext(WindmillContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("te");
    if (name === "admin" && password === "admin") {
      toast.success("Login Sukses");
      setTimeout(() => {
        route.push("/dashboard");
      }, 2000);
    } else if (name === "" && password === "") {
      toast.error("Password atau Username Tidak Boleh Kosong");
    } else {
      toast.error("Password atau Username Salah");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src="https://www.archify.com/files/professional/projects/l/h58rexhn9k.jpg"
              alt="Office"
              layout="fill"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login My Laundry
              </h1>
              <Label>
                <span>Username</span>
                <Input
                  className="mt-1"
                  type="text"
                  placeholder="username"
                  onChange={(e) => setName(e.target.value)}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Label>

              <Button
                className="mt-4"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Log in
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
