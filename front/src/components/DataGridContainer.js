import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Close';
import {
    DATA_GRID_CREATE_MODE,
    DATA_GRID_READ_MODE,
    DATA_GRID_UPDATE_MODE,
    DATA_GRID_DELETE_MODE
} from '../data/constants/DataGridConstants'
import { createSong, readSongs, updateSong, deleteSong } from '../responses/Responses';

function Toolbar(props) {
    const [mode, setMode] = React.useState(DATA_GRID_READ_MODE);
    const [open, setOpen] = React.useState(false);
    const [editionModel, setEditionModel] = React.useState(null);
    let tempModel = {};

    useEffect(() => {
        if ((mode === DATA_GRID_UPDATE_MODE || mode === DATA_GRID_CREATE_MODE) && !editionModel) {
            let emptyModel = props.selectionModel.length > 0 && mode === DATA_GRID_UPDATE_MODE ? props.rows.find(row => row.id === props.selectionModel[0]) : props.rows[0]
            if (mode === DATA_GRID_CREATE_MODE) { for (let key in emptyModel) { emptyModel[key] = null } }
            setEditionModel(emptyModel)
        }
    }, [props.selectionModel, mode, props.rows, editionModel])

    // console.debug(props.selectionModel, editionModel)

    const handleClickOpen = (event, mode) => {
        // console.debug({ ...props.selectionModel, mode: mode });
        setMode(mode);
        console.debug(props.selectionModel)
        mode === DATA_GRID_DELETE_MODE && deleteSong(props.selectionModel.map(id => ({'id': id})));
        setOpen(true);
    };

    const handleClose = () => {
        console.debug(mode, tempModel, editionModel)
        setEditionModel(tempModel);
        console.debug(JSON.stringify(tempModel));
        mode === DATA_GRID_CREATE_MODE && createSong(tempModel);
        mode === DATA_GRID_UPDATE_MODE && updateSong(tempModel);
        setMode(DATA_GRID_READ_MODE);
        setOpen(false);
    };

    const FormDialog = () => {

        const onChangeTextField = (event, key) => {
            tempModel = { ...editionModel }
            tempModel[key] = event.target.value;
        }

        console.debug(editionModel)

        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{mode === DATA_GRID_CREATE_MODE ? 'Добавить' : mode === DATA_GRID_UPDATE_MODE ? 'Редактировать' : 'Удалить'}</DialogTitle>
                <DialogContent>
                    {mode === DATA_GRID_CREATE_MODE || mode === DATA_GRID_UPDATE_MODE ?
                        props.columns.map((column, index) =>
                            <TextField
                                autoFocus
                                margin="dense"
                                key={column.field}
                                id={column.field}
                                label={column.headerName}
                                type={column.type}
                                defaultValue={editionModel && editionModel[column.field] ? editionModel[column.field] : null}
                                onChange={(event) => onChangeTextField(event, column.field)}
                                fullWidth
                                variant="standard"
                            />) : <DialogContentText>
                            {`Подтвердить удаление ${props.selectionModel.length} объект${props.selectionModel.length === 1 ? 'а' : 'ов'}?`}
                        </DialogContentText>
                    }

                </DialogContent>
                <DialogActions>
                    {mode === DATA_GRID_CREATE_MODE || mode === DATA_GRID_UPDATE_MODE ? <Tooltip title="Save" >
                        <IconButton color="success" onClick={handleClose}>
                            <SaveIcon />
                        </IconButton>
                    </Tooltip> :
                        <>
                            <Tooltip title="Confirm deleting" >
                                <IconButton color="error" onClick={handleClose}>
                                    <DoneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel deleting" >
                                <IconButton color="success" onClick={handleClose} autoFocus>
                                    <CancelIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Box sx={{ display: 'flex', p: 1 }}>
            <IconButton color="primary" aria-label="Add" onClick={(event) => handleClickOpen(event, DATA_GRID_CREATE_MODE)}>
                <AddIcon />
            </IconButton>
            {props.selectionModel?.length && props.selectionModel.length === 1 ? <IconButton color="warning" aria-label="Edit" onClick={(event) => handleClickOpen(event, DATA_GRID_UPDATE_MODE)}>
                <EditIcon />
            </IconButton> : ''}
            {props.selectionModel?.length ? <IconButton color="error" aria-label="Add" onClick={(event) => handleClickOpen(event, DATA_GRID_DELETE_MODE)}>
                <DeleteIcon />
            </IconButton> : ''}
            <FormDialog />
        </Box>
    );
}

export default function DataGridContainer(props) {
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);

    useEffect(() => {
        if (data.length === 0) {
            readSongs(setData)
        }
    }, [data])

    useEffect(() => {
        if (rows.length === 0 && data.length > 0) {
            setRows(data.map(object => ({ ...object.fields, id: object.pk })))
        }
    }, [data, rows])

    useEffect(() => {
        if (rows.length > 0 && data.length > 0 && columns.length === 0) {
            setColumns(Object.keys(rows[0]).map(key => ({
                field: key,
                headerName: key,
                editable: false
            })))
        }
    }, [data, rows, columns])

    const options = {
        rows: rows,
        columns: columns,
        pageSize: 5,
        rowsPerPageOptions: [5],
        checkboxSelection: true,
        autoHeight: true,
        editMode: 'row',
        selectionModel: selectionModel,
        editRowsModel: {},
        onSelectionModelChange: (newSelectionModel) => {
            setSelectionModel(newSelectionModel);
        },
        components: {
            Toolbar: Toolbar,
        },
        componentsProps: {
            toolbar: {
                rows: rows,
                columns: columns,
                selectionModel: selectionModel,
            }
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid {...options} />
        </Box>
    );
}
