import { useAuth } from "@/providers";
import { useState } from "react";
import { Spinner } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TLoginRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    newPassword: z.string().min(4, {
        message: "New password must be at least 4 characters.",
      }),
    repeatNewPassword: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  }).refine(
    (data) => data.newPassword === data.repeatNewPassword,
    {
      path: ["repeatNewPassword"], // Specifies where the error should appear
      message: "New passwords must match.",
    }
  );
  
  type TLoginFormProps = {
    className?: string;
  };
  

export function ProfileView({ className }: TLoginFormProps)
{
    const { user, login } = useAuth();

    const [currentUsername, setCurrentUsername] = useState(user?.username);
    const[enableEditting, setEnableEditting] =  useState(false);
     // hooks

     const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         username: currentUsername,
         password: "",
         newPassword: "",
         repeatNewPassword: "",
       },
     });

     form.register("repeatNewPassword", {
        validate: (value) =>
          value === form.getValues("newPassword") || "Passwords do not match",
      });
   
     // state
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [errorMessage, setErrorMessage] = useState<string | null>(null);
   
     // handlers
     function onSubmit(values: z.infer<typeof formSchema>) {
       // Do something with the form values.
       // ✅ This will be type-safe and validated.
       const creds: TLoginRequest = {
         username: values.username,
         password: values.password,
       };
   
       try {
         setIsSubmitting(true);
         setErrorMessage(null);
         login(creds);

       } catch (error) {
         if (error instanceof Error) {
           setErrorMessage(error.message);
         }
       } finally {
         setIsSubmitting(false);
       }
     }
 


    return(
        <>
         <div className={cn(className, "max-w-[500px] w-full")}>
      <h1 className="text-6xl text-center font-bold text-slate-800">Profile page</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 bg-slate-800 py-10 px-16 rounded-2xl"
        >
             <Button
            type="button"
            variant="secondary"
            className="font-bold w-full py-5 focus-visible:outline-white text-white"
            onClick={()=>setEnableEditting(!enableEditting)}
          >
            Start Updating
          </Button>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">Username</FormLabel>
                <FormControl>
                  <Input disabled = {!enableEditting} placeholder={currentUsername} {...field} className="text-slate-200 border-2 border-slate-500" value={currentUsername} onChange={(e)=>setCurrentUsername(e.target.value)}/>
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
                    disabled = {!enableEditting}
                    placeholder="••••••••"
                    {...field}
                    className="text-slate-200 border-2 border-slate-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">New password</FormLabel>
                <FormControl>
                  <Input
                  disabled = {!enableEditting}
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
          <FormField
            control={form.control}
            name="repeatNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-300 text-base">Repeat new password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled = {!enableEditting}
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
            disabled = {!enableEditting}
            variant="secondary"
            className="font-bold w-full py-5 focus-visible:outline-white text-white"
          >
            {isSubmitting ? <Spinner /> : "Update"}
          </Button>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm font-bold">
              <span className="text-red-500 text-center text-sm font-bold">Error:</span> {errorMessage}
            </p>
          )}
        </form>
      </Form>
    </div>
        </>
    )
}