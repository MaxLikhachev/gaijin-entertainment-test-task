import React from 'react';
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

function Toolbar(props) {
    // console.debug(props)

    const [mode, setMode] = React.useState(DATA_GRID_READ_MODE);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (event, mode) => {
        // console.debug({ ...props.selectionModel, mode: mode });
        setMode(mode);
        setOpen(true);
    };

    const handleClose = () => {
        setMode(DATA_GRID_READ_MODE);
        setOpen(false);
    };

    function FormDialog() {
        const [editionModel, setEditionModel] = React.useState(props.selectionModel?.length ? { ...props.rows.find(row => row.id === props.selectionModel[0]) } : {})

        // console.debug(editionModel, mode)

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
                                defaultValue={mode === DATA_GRID_UPDATE_MODE ? editionModel[column.field] : ''}
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

    const options = {
        rows: props.rows,
        columns: props.columns,
        pageSize: 5,
        rowsPerPageOptions: [5],
        checkboxSelection: true,
        autoHeight: true,
        editMode: 'row',
        selectionModel: selectionModel,
        editRowsModel: {},
        onSelectionModelChange: (newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            // console.debug(newSelectionModel);
        },
        components: {
            Toolbar: Toolbar,
        },
        componentsProps: {
            toolbar: {
                rows: props.rows,
                columns: props.columns,
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
