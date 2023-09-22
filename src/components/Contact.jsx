import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const notifySuccess = () => {
    toast.success('Gracias por contactarnos, nos comunicaremos pronto!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const notifyError = () => {
    toast.error('Ahh, hubo un error, intenta nuevamente!', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    <successfulModal />
    emailjs
      .send(
        // import.meta.env.VITE_SERVICE_ID,
        {
          VITE_PUBLIC_KEY: process.env.VITE_PUBLIC_KEY,
          VITE_TEMPLATE_ID: process.env.VITE_TEMPLATE_ID,
          VITE_PUBLIC_KEY: process.env.VITE_PUBLIC_KEY

        },
        // import.meta.env.VITE_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "DALSEB ENERGY",
          from_email: form.email,
          to_email: "alvaroportfoliomail.com",
          message: form.message,
        },
        // import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          notifySuccess();
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          notifyError();
        }
      );
  };

  return (
    <div>
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Ponte en contacto con nosotros</p>
          <h3 className={styles.sectionHeadText}>Contacto.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Nombre</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="Cual es tu nombre o empresa?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                required
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Correo</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="Cual es tu correo?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                required
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Mensaje</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='Escribe tu duda o comentario'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                required
              />
            </label>
            <button
              type='submit'
              className='bg-green-500 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </motion.div>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <EarthCanvas />
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");