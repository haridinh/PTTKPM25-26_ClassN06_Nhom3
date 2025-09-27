"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginPageClientComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Giả sử bỏ phần useAuth() vì bạn chưa cần chạy thật
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo: chỉ delay 1s rồi thôi
    setTimeout(() => {
      setIsLoading(false);
      alert("Demo: form submitted");
      // router.push("/");
    }, 1000);
  };

  // Bỏ loginWithGoogle, loginWithGitHub demo
  const handleGoogleLogin = () => alert("Demo Google login");
  const handleGitHubLogin = () => alert("Demo GitHub login");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #f0f0f0, #d0d0d0)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <header style={{ marginBottom: "1rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Welcome back
          </h2>
          <p>Sign in to your account to continue</p>
        </header>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: 4 }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                style={{ width: "100%", padding: "0.5rem", paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <div style={{ margin: "1rem 0", textAlign: "center", position: "relative" }}>
          <hr />
          <span
            style={{
              position: "absolute",
              top: "-0.6rem",
              left: "50%",
              backgroundColor: "white",
              padding: "0 0.5rem",
              transform: "translateX(-50%)",
              fontSize: "0.75rem",
              color: "#666",
            }}
          >
            Or continue with
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{
              padding: "0.5rem",
              border: "1px solid #888",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            Google
          </button>
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            style={{
              padding: "0.5rem",
              border: "1px solid #888",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            GitHub
          </button>
        </div>

        <p style={{ marginTop: "1rem", fontSize: "0.875rem", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#0070f3", textDecoration: "underline" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPageClientComponent;
