import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import app from './feathersclient';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        // marginRight: '0px',
    },
    container: {
        maxHeight: 440,
    },
}));

const columns = [
    {
        id: 'login',
        label: 'login',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'name',
        label: 'name',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'html_url',
        label: 'html_url',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'created_at',
        label: 'created_at',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'forks',
        label: 'forks',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'open_issues',
        label: 'issues',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'stargazers_count',
        label: 'stars',
        minWidth: 100,
        align: 'right',
    },
];


// const rows = [];

function GitInfo(props: any) {
    const classes = useStyles();
    const [repo, setRepo] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    function onUpdate() {
        app.emit('get', 'fetchinfo', {repo: repo, user:props.session.email }, (err, data) =>{

            if(data){
                props.addInfo(data)
                }

        })
    }

    function onDelete() {
        if(props.repo[0].repo_id) {
            props.delInfo(props.repo[0].repo_id)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Grid container spacing={12}>
            <div className={classes.paper}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="repo"
                        label="repo"
                        onChange={e => {setRepo(e.target.value)}}
                    />
                    <Grid item xs={6}>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onUpdate()}
                    >
                        Update
                    </Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onDelete()}
                    >
                        Delete
                    </Button>
                    </Grid>
            </div>
                <Grid item xs={12} className={classes.paper}>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.repo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                row = row.repo_info;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    // onChangePage={handleChangePage}
                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            </Grid>
            </Grid>

        </Container>
    );
}
const mapStateToProps = (state: any) => ({
    repo: state.repoReducer,
    session: state.currentSession
});
const mapDispatchToProps = (dispatch: any) => ({
    addInfo: (id: any, info: any) => dispatch(actions.addRepo(id, info)),
    delInfo: (id: any, info: any) => dispatch(actions.deleteRepo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GitInfo)
