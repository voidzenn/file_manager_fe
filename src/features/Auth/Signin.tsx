import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { ToastAction } from '@radix-ui/react-toast';

import { useAuthStore } from '@/store/useAuthStore';

import toastConstant from '@/constants/components/ui/toastConstant';
import { ROUTES } from '@/constants/routes';

const Signin = () => {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const navigate = useNavigate();

  const { toast } = useToast();

  const {
    email,
    password,
    errorMessage,
    signin: { setEmail, setPassword, setErrorMessage },
    signinRequest,
    auth
  } = useAuthStore();

  useEffect(() => {
    if (email && password) {
      setEnableSubmit(true);
    } else {
      enableSubmit && setEnableSubmit(false);
    }
  }, [email, password, enableSubmit]);

  useEffect(() => {
    if(errorMessage) {
      toast({
        variant: toastConstant.VARIANT_DESTRUCTIVE,
        title: errorMessage,
        action: <ToastAction altText="close">Close</ToastAction>
      });
    }
  }, [errorMessage, toast, setErrorMessage]);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate(ROUTES.home);
    }
  }, [auth, navigate])

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setEmail(target.value);
    errorMessage && setErrorMessage(null);
  };

  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setPassword(target.value);
    errorMessage && setErrorMessage(null);
  };

  const handleSignin = async () => {
    await signinRequest();
  };

  return (
    <>
      <div className="flex justify-center min-h-screen min-w-full mx-auto my-auto items-center align-middle">
        <Card className="px-12" title="test">
          <CardTitle className="mt-10 mb-10 text-center">
            File Manager
          </CardTitle>
          <CardContent>
            <div className="mt-5">
              <Label>Email</Label>
              <Input className="mt-2" onChange={handleEmail} />
            </div>
            <div className="mt-5">
              <Label>Password</Label>
              <Input className="mt-2" onChange={handlePassword} />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button
              className="justify-center mx-auto"
              onClick={handleSignin}
              disabled={!enableSubmit}
            >
              Sign In
            </Button>
            <Label className="mt-5">
              Don't have an account?
              <Button variant="link" className="m-0 p-0 pl-1" onClick={() => {
                navigate('/signup');
              }}>
                Sign Up
              </Button>
            </Label>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Signin;
