import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const SignupSchema = z
  .object({
    fname: string().min(1, { message: 'Required' }),
    lname: string().min(1, { message: 'Required' }),
    email: string().email(),
    password: string()
      .min(1, { message: 'Required' })
      .min(8, { message: 'Minimum of 8 characters' })
      .min(8, 'Password must be at least 8 characters long')
      .regex(/\d/, 'Password must contain at least one digit')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[^\w_ ]/, 'Password must contain at least one special character')
      ,
    confirmPassword: string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

const Signup = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const validForm = Object.keys(form.formState.errors).length === 0;

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    console.log(values);
  }

  return (
    <React.Fragment>
      <div className="flex justify-center min-h-screen min-w-full mx-auto my-auto items-center align-middle">
        <Card className="px-12 pb-5 mb-12 w-[1000px] h-auto">
          <CardTitle className="mt-10 mb-10 text-center">
            Create Account
          </CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="mb-12">
                <div className="flex gap-8 mb-10">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="fname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="lname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-8 mb-10">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2"></div>
                </div>
                <div className="flex gap-8">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="w-full flex item-middle justify-center">
                <Button type="submit" disabled={!validForm}>
                  Signup
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Signup;
