import { useState } from "react";
import { useUserStore } from "../../Store/UseUserStore";
import { useLocation, useNavigate } from "react-router";

export default function Login() {
  const loginAction = useUserStore((s) => s.action_login);
  const location = useLocation();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    setSubmitLoading(true);
    const isAuth = await loginAction(username, password);
    setSubmitLoading(false);
    if (isAuth)
      if (location.state?.from) {
        navigate(location.state.from.pathname, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
  };

  return (
    <div className="flex justify-center items-center bg-yellow-900 min-h-screen">
      <div className="bg-bg-cream shadow-xl p-8 border border-border-tan rounded-box w-full max-w-sm">
        <h2 className="mb-6 font-bold text-text-brown text-2xl text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="text-text-label label-text">Email</span>
            </label>

            <div className="relative">
              <span className="left-0 z-2 absolute inset-y-0 flex items-center pl-3 text-icon-tan">
                <i className="fas fa-envelope"></i>
              </span>

              <input
                type="text"
                name="username"
                defaultValue={""}
                placeholder="email@example.com"
                className="bg-bg-cream pl-10 input-bordered border-border-tan w-full text-text-main input"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-text-label label-text">Password</span>
            </label>

            <div className="relative">
              <span className="left-0 z-2 absolute inset-y-0 flex items-center pl-3 text-icon-tan">
                <i className="fas fa-lock"></i>
              </span>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-bg-cream pl-10 input-bordered border-border-tan w-full text-text-main input"
                required
              />
            </div>

            <label className="label">
              <a
                href="#"
                className="label-text-alt text-link-brown link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>

          <div className="mt-6 form-control">
            <button
              type="submit"
              className="bg-btn-brown hover:bg-btn-hover w-full text-white btn"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <i className="mr-2 fas fa-sign-in-alt"></i> Login
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-4 text-text-brown text-sm text-center">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-link-brown link link-hover">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
