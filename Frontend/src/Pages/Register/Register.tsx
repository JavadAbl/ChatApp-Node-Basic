import { useAuthCheck } from "../../Hooks/UseCheckAuth";

export default function Register() {
  const isCheckingAuth = useAuthCheck();

  if (isCheckingAuth) {
    return null;
  }

  return <div>Register</div>;
}
