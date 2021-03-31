import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({

// }));

export default function Note(props) {
    return (
        <div>
            notepad nº: {props.number}
        </div>
    );
}