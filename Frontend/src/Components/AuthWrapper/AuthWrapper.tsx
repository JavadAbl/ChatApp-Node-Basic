import { useAuthCheck } from "../../Hooks/UseCheckAuth";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCheckingAuth } = useAuthCheck();

  if (isCheckingAuth) {
    return null;
  }

  return <>{children}</>;
}
