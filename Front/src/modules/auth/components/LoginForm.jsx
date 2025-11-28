import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import useAuth from '../hook/useAuth';
import { frontendErrorMessage } from '../helpers/backendError';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: '', password: '' } });

  const navigate = useNavigate();
  const { singin } = useAuth();

  const onValid = async (formData) => {
    try {
      const { error } = await singin(formData.username, formData.password);

      if (error) {
        setErrorMessage(error.frontendErrorMessage);

        return;
      }

      navigate('/admin/home');
    } catch (error) {
      if (error?.response?.data?.code) {
        setErrorMessage(frontendErrorMessage[error?.response?.data?.code]);
      } else {
        setErrorMessage('Llame a soporte');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="
        bg-white
        w-full
        max-w-[400px]
        rounded-xl
        shadow-sm
        border border-gray-100
        p-6 sm:p-8
        flex flex-col
        justify-between /* Distribuye mejor el espacio */
        h-auto
        gap-8 /* AUMENTADO: Más aire general entre bloques */
      "
    >

      {/* SECCIÓN INPUTS */}
      {/* AUMENTADO: gap-5 para separar más los inputs entre sí */}
      <div className="flex flex-col gap-6">
        <Input
          label='Usuario'
          // AÑADIDO: text-sm para letra más chica en el input
          className="w-full text-sm"
          {...register('username', { required: 'Usuario es obligatorio' })}
          error={errors.username?.message}
        />
        <Input
          label='Password'
          type='password'
          // AÑADIDO: text-sm para letra más chica
          className="w-full text-sm"
          {...register('password', { required: 'Contraseña es obligatorio' })}
          error={errors.password?.message}
        />
      </div>

      {/* SECCIÓN BOTONES */}
      {/* AUMENTADO: gap-4 para separar más los botones entre sí */}
      <div className="flex flex-col gap-4">

        <Button
          type='submit'
          // CAMBIOS: text-sm (letra chica) y py-3 (botón más alto para dedo táctil pero texto fino)
          className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200 border-none font-semibold text-sm py-3 rounded-lg transition-colors"
        >
          Iniciar Sesión
        </Button>

        <Button
          type="button"
          variant='secondary'
          onClick={() => navigate('/signup')}
          // CAMBIOS: text-sm (letra chica) y py-3
          className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 border-none font-semibold text-sm py-3 rounded-lg transition-colors"
        >
          Registrar Usuario
        </Button>
      </div>

      {/* ERROR */}
      {errorMessage && (
        <p className='text-center text-xs text-red-500 font-medium bg-red-50 p-2 rounded-md border border-red-100'>
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default LoginForm;