import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/signup';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    const { confirmPassword, ...dataToSend } = data;

    const response = await signup(dataToSend);

    if (response.error) {
      alert(response.error);

      return;
    }

    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      navigate('/admin/home');

      return;
    }

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white sm:rounded-2xl sm:shadow-lg p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Registro</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* USERNAME */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Usuario</label>
            <input
              type="text"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3"
              {...register('username', { required: 'El usuario es obligatorio' })}
            />
            {errors.username && (
              <span className="text-red-400 text-xs ml-1">{errors.username.message}</span>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Email</label>
            <input
              type="email"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3"
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Formato de email inválido',
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-xs ml-1">{errors.email.message}</span>
            )}
          </div>

          {/* PHONE NUMBER */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Teléfono</label>
            <input
              type="text"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3"
              {...register('phoneNumber', {
                required: 'El número de teléfono es obligatorio',
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-400 text-xs ml-1">{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Role</label>
            <select
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3"
              defaultValue=""
              {...register('role', { required: 'Seleccione un rol' })}
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            {errors.role && (
              <span className="text-red-400 text-xs ml-1">{errors.role.message}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Contraseña</label>
            <input
              type="password"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
            />
            {errors.password && (
              <span className="text-red-400 text-xs ml-1">{errors.password.message}</span>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium ml-1">Confirmar contraseña</label>
            <input
              type="password"
              className="w-full bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-3"
              {...register('confirmPassword', {
                required: 'Debe confirmar la contraseña',
                validate: (value) => value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-400 text-xs ml-1">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* BUTTONS */}
          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-3 rounded-xl"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Usuario'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl"
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
