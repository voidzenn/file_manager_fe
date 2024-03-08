import TextField from "@/components/TextField/TextField";
import { useSigninStore } from "@/state/useSiginStore";
import { useEffect } from "react";

const Signin = () => {
  const {
    email,
    actions: { setEmail },
  } = useSigninStore();

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <>
      <TextField
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
    </>
  );
}

export default Signin;
