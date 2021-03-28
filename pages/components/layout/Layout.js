import SideBar from "./SideBar";
import Content from './Content';

export default function Layout(props) {
    return (
        <>
            <SideBar />
            <Content {...props} />
        </>
    );
}