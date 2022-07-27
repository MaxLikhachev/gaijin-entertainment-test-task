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
    const [selectionModel, setSelectionModel] = React.useState([])
    const [mode, setMode] = React.useState(null);
    const [modes, setModes] = React.useState([]);

    useEffect(() => {
        if (selectionModel !== props.selectionModel) {
            setModes(props.selectionModel.length > 0 ?
                props.selectionModel.length === 1 ?
                    [DATA_GRID_READ_MODE, DATA_GRID_CREATE_MODE, DATA_GRID_UPDATE_MODE, DATA_GRID_DELETE_MODE]
                    : [DATA_GRID_READ_MODE, DATA_GRID_CREATE_MODE, DATA_GRID_DELETE_MODE]
                : [DATA_GRID_READ_MODE, DATA_GRID_CREATE_MODE]);
            setMode(DATA_GRID_READ_MODE)
            setSelectionModel(props.selectionModel);
        }
    }, [props.selectionModel, selectionModel])

    const options = {
        tools: [{
            label: "Добавить",
            color: "primary",
            mode: DATA_GRID_CREATE_MODE,
            icon: <AddIcon />
        }, {
            label: "Редактировать",
            color: "warning",
            mode: DATA_GRID_UPDATE_MODE,
            icon: <EditIcon />
        }, {
            label: "Удалить",
            color: "error",
            mode: DATA_GRID_DELETE_MODE,
            icon: <DeleteIcon />
        }]
    }

    const formDialogProps = {
        mode,
        setMode,
        selectionModel,
        ...props
    }

    const onClickModeChangeHandler = (event, value) => setMode(value)

    return (
        <Box sx={{ display: 'flex', p: 1 }}>
            {modes.map((mode, index, array, option = options.tools.find(tool => tool.mode === mode)) =>
                option && <Tooltip
                    key={index}
                    title={option.label}>
                    <IconButton
                        onClick={event => onClickModeChangeHandler(event, option.mode)}
                        {...option}>
                        {option.icon}
                    </IconButton>
                </Tooltip>
            )}
            {mode && mode !== DATA_GRID_READ_MODE && <FormDialog {...formDialogProps} />}
        </Box>
    );
}

const FormDialog = (props) => {
    const [mode, setMode] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [editionModel, setEditionModel] = React.useState([]);

    useEffect(() => {
        if (mode !== props.mode) {
            setMode(props.mode);
            if (props.mode === DATA_GRID_CREATE_MODE) {
                setEditionModel(props.columns.map((column) => ''));
            }
            if (props.mode === DATA_GRID_UPDATE_MODE) {
                const tempModel = [];
                for (const [key, value] of Object.entries(props.rows.find(row => row.id = props.selectionModel[0])))
                    tempModel.push(value);
                setEditionModel(tempModel);
            }
            setOpen(true);
        }
    }, [mode, props])

    const modelToObjectConverter = () => {
        const object = {};
        if (mode !== DATA_GRID_DELETE_MODE) {
            props.columns.forEach((column, index) => object[column.field] = editionModel[index] !== '' ? editionModel[index] : null);
            return object;
        }
        else return props.selectionModel.map((id) => ({ 'id': id }));
    }

    const onClickSaveHandler = () => {
        switch (mode) {
            case DATA_GRID_CREATE_MODE: createSong(modelToObjectConverter()); break;
            case DATA_GRID_UPDATE_MODE: updateSong(modelToObjectConverter()); break;
            case DATA_GRID_DELETE_MODE: deleteSong(modelToObjectConverter()); break;
            default: break;
        }
        props.setData([]);
        onClickCloseHandler();
    };

    const onClickCloseHandler = () => {
        setOpen(false);
        props.setMode(DATA_GRID_READ_MODE);
    };

    const options = {
        title: mode === DATA_GRID_CREATE_MODE ? 'Добавить' : mode === DATA_GRID_UPDATE_MODE ? 'Редактировать' : 'Удалить',
        dialogContextText: `Подтвердить удаление ${props.selectionModel.length} объект${props.selectionModel.length === 1 ? 'а' : 'ов'}?`,
        textFields: props.columns.map((column, index) => ({
            autoFocus: true,
            margin: "dense",
            key: column.field,
            id: column.field,
            label: column.headerName,
            type: column.type,
            value: editionModel[index],
            fullWidth: true,
            variant: "standard",
        })),
        actions: [{
            label: "Сохранить",
            color: "success",
            modes: [DATA_GRID_CREATE_MODE, DATA_GRID_UPDATE_MODE],
            onClick: onClickSaveHandler,
            icon: <SaveIcon />
        }, {
            label: "Подтвердить",
            color: "error",
            modes: [DATA_GRID_DELETE_MODE],
            onClick: onClickSaveHandler,
            icon: <DoneIcon />
        }, {
            label: "Отменить",
            color: "primary",
            onClick: onClickCloseHandler,
            modes: [DATA_GRID_CREATE_MODE, DATA_GRID_UPDATE_MODE, DATA_GRID_DELETE_MODE],
            icon: <CancelIcon />
        }]
    }

    const onChangeTextFieldHandler = (event, index) => {
        const tempModel = [...editionModel]
        tempModel[index] = event.target.value
        setEditionModel(tempModel)
    }

    return (
        <Dialog open={open} onClose={onClickCloseHandler}>
            <DialogTitle>{options.title}</DialogTitle>
            <DialogContent>
                {mode === DATA_GRID_CREATE_MODE || mode === DATA_GRID_UPDATE_MODE ?
                    options.textFields.map((option, index) =>
                        <TextField
                            onChange={event => onChangeTextFieldHandler(event, index)}
                            {...option} />)
                    : <DialogContentText>
                        {options.dialogContextText}
                    </DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                {options.actions.map((action, index) => action.modes.find(visiblemode => mode === visiblemode) && (
                    <Tooltip title={action.label} key={index}>
                        <IconButton {...action}>
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </DialogActions>
        </Dialog>
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
            setRows(data.map(object => ({ id: object.pk, ...object.fields })))
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
                setData: setData,
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
