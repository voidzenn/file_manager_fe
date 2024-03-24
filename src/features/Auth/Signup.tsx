import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useAuthStore } from '@/store/useAuthStore';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { TOAST_VARIANT_DESTRUCTIVE } from '@/constants/components/ui/toastConstant';
import { ERROR_RESPONSE_MESSAGE } from '@/constants/components/reponseMessage';

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
      .regex(/[^\w_ ]/, 'Password must contain at least one special character'),
    confirmPassword: string().min(1, { message: 'Required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

const Signup = () => {
  const { signup } = useAuthStore();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const validForm = Object.keys(form.formState.errors).length === 0;

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    signup.initializeErrorMessage();

    await signup.request({
      user: {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
      },
    });
  };

  useEffect(() => {
    if(signup.errorMessage) {
      toast({
        variant: TOAST_VARIANT_DESTRUCTIVE,
        title: ERROR_RESPONSE_MESSAGE,
      });
    }
  }, [signup.errorMessage])

  return (
    <React.Fragment>
      <div className="flex justify-center min-h-screen min-w-full mx-auto my-auto items-center align-middle">
        <Card className="px-12 pb-5 mb-10 w-[1000px] h-auto">
          <CardTitle className="mt-10 mb-10 text-center">
            Create Account
          </CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="mb-5">
                <div className="flex gap-12 mb-5">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="fname"
                      render={({ field }) => (
                        <FormItem>
                          <Label>First Name</Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="min-h-5">
                            <FormMessage className="first-letter:uppercase">
                              {signup.error?.fname}
                            </FormMessage>
                          </div>
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
                          <Label>Last Name</Label>
                          <FormControl>
                            <Input {...field} type="text" autoComplete="off" />
                          </FormControl>
                          <div className="min-h-5">
                            <FormMessage className="first-letter:uppercase">
                              {signup.error?.lname}
                            </FormMessage>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-12 mb-5">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Email</Label>
                          <FormControl>
                            <Input {...field} autoComplete="off" />
                          </FormControl>
                          <div className="min-h-5">
                            <FormMessage className="first-letter:uppercase">
                              {signup.error?.email}
                            </FormMessage>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2"></div>
                </div>
                <div className="flex gap-12">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Password</Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="min-h-5">
                            <FormMessage className="first-letter:uppercase">
                              {signup.error?.password}
                            </FormMessage>
                          </div>
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
                          <Label>Confirm Password</Label>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="min-h-5">
                            <FormMessage />
                          </div>
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
