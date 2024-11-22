import { Spinner } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers";
import { TRegisterRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

type TregisterFormProps = {
  className?: string;
};

export function RegisterForm({ className }: TregisterFormProps) {
  // hooks
  const { register } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  // state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // handlers
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const creds: TRegisterRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
    };

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await register(creds);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn(className, "max-w-[500px] w-full")}>
      <h1 className="text-6xl text-center font-bold text-slate-800">Register</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 bg-slate-800 py-10 px-16 rounded-2xl "
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} className="text-slate-200 border-2 border-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} className="text-slate-200 border-2 border-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">Email</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} className="text-slate-200 border-2 border-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">Username</FormLabel>
                <FormControl>
                  <Input placeholder="..." {...field} className="text-slate-200 border-2 border-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="text-slate-200 border-2 border-slate-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            className="font-bold w-full py-5 focus-visible:outline-white"
          >
            {isSubmitting ? <Spinner /> : "Register"}
          </Button>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm font-bold">
              <span className="text-red-500 text-center text-sm font-bold">Error:</span> {errorMessage}
            </p>
          )}

          <p className="text-slate-500 text-md font-semibold">
            Already have an account? Proceed to{" "}
            <Link
              className="bg-slate-900 py-1 px-2 rounded-sm hover:brightness-110 focus-visible:brightness-110 transition-colors duration-150"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
