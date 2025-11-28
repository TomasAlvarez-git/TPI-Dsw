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
    // 1. Desestructuramos para separar confirmPassword del resto
    const { confirmPassword, ...dataToSend } = data;

    // 2. SOLUCIÓN: Usamos la variable 'confirmPassword' para una validación final.
    // Esto satisface al linter (porque la estamos usando) y añade seguridad extra.
    if (confirmPassword !== dataToSend.password) {
      alert('Las contraseñas no coinciden');

      return;
    }

    // Si pasa la validación, enviamos solo dataToSend (sin el confirmPassword)
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

  // Clases compartidas
  const inputClass = 'w-full bg-white border border-gray-200 text-gray-800 text-sm sm:text-base rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all';
  const labelClass = 'text-gray-800 font-medium text-sm sm:text-base ml-1';
  const errorClass = 'text-red-500 text-xs font-medium ml-1 mt-1';

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 font-sans">
      {/* CARD PRINCIPAL */}
      <div className="bg-white w-full max-w-[450px] rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          {/* USUARIO */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Usuario</label>
            <input
              type="text"
              className={inputClass}
              {...register('username', { required: 'El usuario es obligatorio' })}
            />
            {errors.username && <span className={errorClass}>{errors.username.message}</span>}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Formato de email inválido',
                },
              })}
            />
            {errors.email && <span className={errorClass}>{errors.email.message}</span>}
          </div>

          {/* TELÉFONO */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Teléfono</label>
            <input
              type="text"
              className={inputClass}
              {...register('phoneNumber', {
                required: 'El número de teléfono es obligatorio',
              })}
            />
            {errors.phoneNumber && <span className={errorClass}>{errors.phoneNumber.message}</span>}
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Role</label>
            <div className="relative">
              <select
                className={`${inputClass} appearance-none bg-white cursor-pointer`}
                defaultValue=""
                {...register('role', { required: 'Seleccione un rol' })}
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.role && <span className={errorClass}>{errors.role.message}</span>}
          </div>

          {/* CONTRASEÑA */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Contraseña</label>
            <input
              type="password"
              className={inputClass}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
            />
            {errors.password && <span className={errorClass}>{errors.password.message}</span>}
          </div>

          {/* CONFIRMAR CONTRASEÑA */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Confirmar contraseña</label>
            <input
              type="password"
              className={inputClass}
              {...register('confirmPassword', {
                required: 'Debe confirmar la contraseña',
                validate: (value) => value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.confirmPassword && <span className={errorClass}>{errors.confirmPassword.message}</span>}
          </div>

          {/* BOTONES */}
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold text-sm sm:text-base py-3 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Usuario'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm sm:text-base py-3 rounded-lg transition-colors"
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