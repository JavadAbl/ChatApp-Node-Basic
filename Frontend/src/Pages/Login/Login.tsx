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
    <div className="min-h-screen flex items-center justify-center bg-yellow-900">
      <div className="w-full max-w-sm shadow-xl bg-bg-cream p-8 rounded-box border border-border-tan">
        <h2 className="text-2xl font-bold text-center mb-6 text-text-brown">
          Login
        </h2>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-text-label">Email</span>
            </label>

            <div className="relative">
              <span className="absolute z-2 inset-y-0 left-0 pl-3 flex items-center text-icon-tan">
                <i className="fas fa-envelope"></i>
              </span>

              <input
                type="text"
                name="username"
                defaultValue={""}
                placeholder="email@example.com"
                className="input input-bordered w-full pl-10 bg-bg-input border-border-tan text-text-main"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-text-label">Password</span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 z-2 left-0 pl-3 flex items-center text-icon-tan">
                <i className="fas fa-lock"></i>
              </span>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full pl-10 bg-bg-input border-border-tan text-text-main"
                required
              />
            </div>

            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover text-link-brown"
              >
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn w-full bg-btn-brown text-white hover:bg-btn-hover"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i> Login
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4 text-text-brown">
          Don&apos;t have an account?{" "}
          <a href="#" className="link link-hover text-link-brown">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
