import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="container items-center text-center flex justify-center min-h-screen">
        <div className="flex flex-col gap-4 items-center">
          <p className="font-bold">Bienvenidx!</p>
          <p className="font-semibold">Estás entrando como:</p>
          <img
            src={session.user?.image || ""}
            alt="Profile pic"
            className="w-12 rounded-full self-center"
          />
          <p>{session.user?.name}</p>
          <p>({session.user?.email})</p>
          <p>¿Te equivocaste?</p>
          <p
            className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </p>
          <Link href="/nueva-reunion">
            <button className="font-semibold bg-blue-600 text-white text-center px-4 py-2 rounded">
              Crear nueva reunión
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container items-center flex justify-center min-h-screen">
      <button
        onClick={() => signIn("google")}
        className="flex px-4 py-2 bg-gray-200 rounded font-semibold gap-4 items-center text-neutral-700 hover:bg-gray-300 transition-all"
      >
        <img src="google_logo.png" alt="" className="w-4 h-4" />
        Inicia sesión con la cuenta de la comisión
      </button>
    </div>
  );
}
