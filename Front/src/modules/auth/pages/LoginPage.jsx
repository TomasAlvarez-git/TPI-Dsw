import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className='
      flex
      min-h-[100dvh] // Usar min-h para evitar problemas si el contenido crece
      w-full
      items-center // Centrado vertical siempre
      justify-center // Centrado horizontal siempre
      bg-neutral-100
      p-4 // Padding para que no toque los bordes en móviles muy pequeños
    '>
      <LoginForm />
    </div>
  );
}

export default LoginPage;