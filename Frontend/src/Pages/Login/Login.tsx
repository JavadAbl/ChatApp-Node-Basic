import { useAuthCheck } from "../../Hooks/UseCheckAuth";

export default function Login() {
  const { isCheckingAuth } = useAuthCheck();

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-900">
      <div className="w-full max-w-sm shadow-xl bg-[#fffaf0] p-8 rounded-box border border-[#a68a64]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#5d3a00]">
          Login
        </h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#5d3a00]">Email</span>
            </label>

            <div className="relative">
              <span className="absolute z-1 inset-y-0 left-0 pl-3 flex items-center text-[#a68a64] ">
                <i className="fas fa-envelope"></i>
              </span>

              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full pl-10 bg-[#fffaf0] border-[#a68a64] text-[#5d3a00]"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#5d3a00]">Password</span>
            </label>

            <div className="relative">
              <span className="absolute inset-y-0 z-1 left-0 pl-3 flex items-center text-[#a68a64]">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full pl-10 bg-[#fffaf0] border-[#a68a64] text-[#5d3a00]"
                required
              />
            </div>

            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover text-[#8b5e3c]"
              >
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn w-full bg-[#8b5e3c] text-primaryy hover:bg-[#704c2a] ">
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4 text-[#5d3a00]">
          Don&apos;t have an account?{" "}
          <a href="#" className="link link-hover text-[#8b5e3c]">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
