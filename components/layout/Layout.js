import Content from './Content';
import { CssBaseline } from '@material-ui/core';

export default function Layout(props) {

    return (
        <>
            <CssBaseline />
            <Content 
                {...props}
            />
        </>
    );
}