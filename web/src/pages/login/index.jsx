import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import { fetchLogin } from "../../features/loginSlice";
import { Button, Box } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoggedIn, clientId, redirectUri } = useSelector((state) => state.login);

  if (isLoggedIn) {
    navigate("/");
  }

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("?code=")) {
      const newUrl = url.split("?code=")
      window.history.pushState({}, null, newUrl[0]);
      dispatch(fetchLogin(newUrl[1]));
    }
  }, [data, dispatch]);

  return (
    <Box position="absolute" top="50%" left="50%" style={{transform: "translate(-50%, -50%)"}}>
      <Button color="inherit" href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectUri}`}>
        <GithubIcon />
        Login with GitHub
      </Button>
    </Box>
  );
}
