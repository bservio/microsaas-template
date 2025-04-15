import { handleGoogleAuth } from "@/app/actions/handle-auth";

const LoginPage = () => {
  return ( 
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
      action={handleGoogleAuth}
    >
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" type="submit">Signin with Google</button>
    </form>
    </div>
   );
}
 
export default LoginPage;