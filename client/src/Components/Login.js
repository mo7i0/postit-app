import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { useEffect, useState } from "react";
import { loginSchemaValidation } from "../Validations/LoginValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, msg} = useSelector(state => state.users);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isLogin } = useSelector(state => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLogin, navigate]); // Include navigate in the dependency array

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login({ userData }));

  };

  return (
    <Container fluid>
      <Row>
        <Col lg="6">
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="appTitle"></div>
            <section>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password", {
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
                <p className="error">{errors.password?.message}</p>
              </div>
             
              <button type='submit' color="primary" className="button">
                Sign In
              </button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
      <Row>
        <div>
          <h3>Server Response</h3>
          <h3>{msg}</h3>
          <h3>{user?.email}</h3>
        </div>
      </Row>
    </Container>
  );
};

export default Login;