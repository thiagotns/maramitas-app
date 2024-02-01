import MaraAppBar from './MaraAppBar';
import Container from "@mui/material/Container";

function Layout({ children }) {
    return (
        <div>
            <MaraAppBar />
            <Container sx={{
                mt: 2
            }}>
                {children}
            </Container>
        </div>
    );
}

export default Layout;
