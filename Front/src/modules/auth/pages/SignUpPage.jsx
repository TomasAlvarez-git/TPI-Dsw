import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/signup"; 

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  // Observamos el valor de la contraseña para compararlo con la confirmación
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Eliminamos confirmPassword antes de enviar al back si no lo requiere
      const { confirmPassword, ...dataToSend } = data;
      
      const response = await signup(dataToSend);

      // Si el registro loguea automáticamente:
      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        navigate("/admin/home");
      } else {
        // Si solo registra y pide loguear después
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      
      {/* Contenedor Principal (Card) */}
      <div className="w-full max-w-md bg-white sm:rounded-2xl sm:shadow-lg p-6 sm:p-10">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Registro</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Usuario / Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Usuario</label>
            <input
              type="text"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
              {...register("fullname", { required: "El usuario es obligatorio" })}
            />
            {errors.fullname && <span className="text-red-400 text-xs ml-1">{errors.fullname.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Email</label>
            <input
              type="email"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
              {...register("email", { 
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Formato de email inválido"
                }
              })}
            />
            {errors.email && <span className="text-red-400 text-xs ml-1">{errors.email.message}</span>}
          </div>

          {/* Role (Select) */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Role</label>
            <div className="relative">
              <select
                className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
                defaultValue=""
                {...register("role", { required: "Seleccione una opción" })}
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              {/* Icono de flecha para el select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {errors.role && <span className="text-red-400 text-xs ml-1">{errors.role.message}</span>}
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Contraseña</label>
            <input
              type="password"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
              {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
            />
            {errors.password && <span className="text-red-400 text-xs ml-1">{errors.password.message}</span>}
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Confirmar contraseña</label>
            <input
              type="password"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
              {...register("confirmPassword", { 
                required: "Debe confirmar la contraseña",
                validate: (value) => value === password || "Las contraseñas no coinciden"
              })}
            />
            {errors.confirmPassword && <span className="text-red-400 text-xs ml-1">{errors.confirmPassword.message}</span>}
          </div>

          {/* Botones de Acción */}
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-3 rounded-xl transition duration-200 shadow-sm"
            >
              {isSubmitting ? "Registrando..." : "Registrar Usuario"}
            </button>

            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition duration-200"
            >
              Inicio de Sesión
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUpPage;