import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Form, Formik } from "formik";
import Field from "../components/form/Field";
import * as Yup from "yup";
import axios from "axios";
import { useMeetingStore } from "@/stores/meeting";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { setMeeting, setNombre, setIsSecretario } = useMeetingStore(
    (state: any) => ({
      setMeeting: state.setMeeting,
      setNombre: state.setNombre,
      setIsSecretario: state.setIsSecretario,
    })
  );

  return (
    <div className="container items-center text-center flex justify-center min-h-screen">
      <Formik
        initialValues={{
          link: "CDMX_Migala",
          nombre: "Pablo",
          esSecretario: true,
        }}
        validationSchema={Yup.object({
          link: Yup.string().required("Llena este campo."),
          nombre: Yup.string().required("Llena este campo."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setMeeting(values.link);
          setNombre(values.nombre);
          setIsSecretario(values.esSecretario);

          setSubmitting(false);

          // We redirect to /reunion using the nextjs router
          router.push("/reunion");
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-8">
            <h1 className="text-xl font-bold text-center">
              Formulario de prerregistro
            </h1>
            <p text-justify>
              Este formulario nos ayudará a llenar algunos campos del formato de
              registro de la reunión.
            </p>
            <div className="flex gap-8 w-full items-center justify-center">
              <Field
                type="text"
                name="link"
                title="ID de la reunión"
                placeholder="CDMX_Migala"
              />
              <Field
                type="text"
                name="nombre"
                title="Nombre con que entrarás"
                placeholder="Nombre Apellido (Apodo)"
              />
            </div>

            <div className="text-center items-center mx-auto">
              <Field
                type="checkbox"
                name="esSecretario"
                title="¿Eres secretario?"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer disabled:bg-gray-500"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Get serversideprops
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Obtenemos la sessión del usuario
  const session = await getServerSession(req, res, authOptions);

  // Si no hay sesión, redirigimos al usuario a la página de inicio de sesión
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
