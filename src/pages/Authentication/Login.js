import React from "react"
import PropTypes from "prop-types"
import { Row, Col, CardBody, Card, Container } from "reactstrap"

//redux
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// actions
import { loginUser } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"
import { useForm } from "react-hook-form"
import LoginForm from "components/auth/login-form"

const Login = props => {
  //meta title
  document.title = "Boosters"

  const dispatch = useDispatch()

  // const validation = useFormik({
  //   onSubmit: values => {
  //     dispatch(loginUser(values, props.router.navigate))
  //   },
  // })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm()

  const onSubmit = data =>
    dispatch(loginUser(data, props.router.navigate, setError))

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Тавтай морил !</h5>
                        <p>Админ эрхээр нэвтрэх Boosters.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <LoginForm
                      register={register}
                      onSubmit={onSubmit}
                      handleSubmit={handleSubmit}
                      errors={errors}
                      clearErrors={clearErrors}
                    />
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} Noskr{" "}
                  <i className="mdi mdi-heart text-danger" />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
