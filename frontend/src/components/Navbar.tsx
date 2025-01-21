import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserButton,
  useUser,
  useAuth,
  SignedOut,
  SignInButton,
  SignedIn,
} from "@clerk/clerk-react"; // Clerk hooks
import { RootState } from "@/redux/store/store";
import { useLoginWithGoogleMutation } from "@/redux/services/authApi";
import { setAuthenticated, setUnauthenticated } from "@/redux/slices/authSlice";
import { Button } from "./ui/button";
import { ChevronFirst } from "lucide-react";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { signOut } = useAuth(); // Clerk's signOut function
  const { user } = useUser(); // Clerk's user object

  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation();

  const handleLogin = async () => {
    console.log("complete");
    try {
      if (!user) return; // Ensure user is logged in with Clerk

      console.log(user);
      // Prepare user data
      const userData = {
        id: user.id,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      // Call the login API
      const response = await loginWithGoogle(userData).unwrap();

      // Store user info in Redux
      dispatch(setAuthenticated(response));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Clerk's sign-out function
      dispatch(setUnauthenticated()); // Clear Redux state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-black text-white p-4 flex justify-between items-center rounded-lg shadow-lg">
      {/* Left side: Spotify logo and title */}
      <div className="flex items-center space-x-3">
        <img
          src="https://marketplace.canva.com/EAF-DqY3X9Y/1/0/1600w/canva-black-and-white-simple-music-studio-logo-AdW9EZ3X4LE.jpg"
          alt="Spotify Logo"
          className="w-10 h-10 rounded-full shadow-md"
        />
        <span className="text-2xl font-bold">Spotify Clone</span>
      </div>

      {/* Right side: Login or Logout button */}
      <div>
        {isAuthenticated ? (
          <Button
            className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="bg-white text-green-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Continue with Google"}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
