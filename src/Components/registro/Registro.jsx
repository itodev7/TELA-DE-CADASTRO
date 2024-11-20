import { FaUser, FaLock, FaHome, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdBadge } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { PiCityFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import api from '../../services/api';
import validarCPF from "../../utils/cpf-validador";
import compararTexto from "../../utils/string-utils";
import "./Registro.css";

const Registro = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const cep = watch("cep");
  const senha1 = watch("senha");
  const senha2 = watch("senha2");
  const handleCepBlur = async () => {
    if (!cep) {
      alert("Preencha algum CEP!");
      return;
    }
    try {
      const response = await api.get(`${cep}/json`);
      setValue("endereco", response.data.logradouro || "");
      setValue("cidade", response.data.localidade || "");
    } catch {
      alert("CEP INVÁLIDO");
    }
  };

  const validarSenha = () => senha1 === senha2 || "As senhas não correspondem";

  const onSubmit = (data) => {
    alert(
      `Cadastro concluído\n\nNome: ${data.nome}\nCPF: ${data.cpf}\nData de Nascimento: ${data.date}\nCEP: ${data.cep}\nEndereço: ${data.endereco}\nCidade: ${data.cidade}\nEmail: ${data.email}\nSenha: ${data.senha}`
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro</h1>

        <div className="input-row">
          <div className="input-field">
            <FaUser className="icon" />
            <input type="text" placeholder="Nome" autoComplete="off" {...register("nome")} />
          </div>
           <div className="input-field">
           <MdBadge className="icon"/>
        <InputMask
          placeholder="999.999.999-99"
          mask="999.999.999-99"
          {...register("cpf", {
            validate: validarCPF,
            required: "CPF é obrigatório"
          })}
        />
        {errors.cpf && <p>{errors.cpf.message || "CPF inválido"}</p>}
      </div>
          <div className="input-field">
            <FaCalendarAlt className="icon"/>
            <InputMask mask="99/99/9999" maskChar="" autoComplete="off" placeholder="Data de Nascimento" {...register("date")} />
          </div>
        </div>

        <div className="input-row">
          <div className="input-field">
            <FaLocationDot className="icon"/>
            <InputMask
          mask="99999-999"
          {...register("cep", { required: "CEP é obrigatório" })}
          onBlur={handleCepBlur}
        />
        {errors.cep && <p>{errors.cep.message}</p>}
          </div>
          <div className="input-field">
            <FaHome className="icon"/>
            <input type="text" placeholder="Endereço" autoComplete="off" {...register("endereco")} />
          </div>
          <div className="input-field">
            <PiCityFill className="icon"/>
            <input type="text" placeholder="Cidade" autoComplete="off" {...register("cidade")} />
          </div>
        </div>

        <div className="input-row">
          <div className="input-field">
            <MdEmail className="icon"/>
            <input type="email" placeholder="E-mail" autoComplete="off" {...register("email")} />
          </div>
          <div className="input-field">
            <input type="password" placeholder="Senha" {...register("senha")} />
            <FaLock className="icon" />
          </div>
          <div className="input-field">
            <input type="password" placeholder="Confirmar Senha" 
            {...register("senha2", {
              validate: validarSenha,
              required: "Senha é obrigatório"
            })}
           />
           {errors.senha2 && <p>{errors.senha2.message || "Senha inválido"}</p>}
            <FaLock className="icon" />
          </div>
        </div>

        <button>Cadastrar</button>
        <div className="signup-link">
          <p>Já tem uma conta? <a href="">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Registro;


//salvar informações em algum lugar