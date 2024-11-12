import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Utiliser pour rediriger
import { notification } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Vérifiez le rôle et redirigez en fonction
        const role = data.role;
        if (role === "CLIENT") {
          navigate("/client"); // Redirige vers le component Client
        } else if (role === "EMPLOYE") {
          navigate("/clients"); // Redirige vers le component Employé
          notification.success({
            message: "Connexion réussie",
            description: "Vous êtes maintenant connecté.",
          });
        } else if (role === "EMP_SUP") {
          navigate("/employes"); // Redirige vers le component Employé Supérieur
          notification.success({
            message: "Connexion réussie",
            description: "Vous êtes maintenant connecté.",
          });
        }
      } else {
        //alert(data.message || "Email ou mot de passe incorrect");
        notification.error({
          message: "Erreur de connexion",
          description: "Échec de la connexion.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      //alert("Erreur lors de la connexion");
      notification.error({
        message: "Erreur de connexion",
        description: "Échec de la connexion.",
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://avatars.mds.yandex.net/i?id=5c35920b5235a2b7b19b8408ed1fbde3f4a176da-3985298-images-thumbs&n=13"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
