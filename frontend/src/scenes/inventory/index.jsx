import { Box } from "@mui/material";
import { DataGrid,  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { getInventory } from "../../features/data/dataApi";
import { useDispatch, useSelector } from "react-redux";
import { inventoryRecordData } from "../../data/mockData";
import { api_url } from "../../features/config";
import axios from "axios";


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


const Inventory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { inventory } = useSelector(({data}) => data)
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "itemName",
      headerName: "Inventory Item",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "itemDesc",
      headerName: "Item Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "itemCategory",
      headerName: "Item Category",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "recSold",
      headerName: "Quantity Sold",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "recPurchased",
      headerName: "Quantity Purchased",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "recTransferred",
      headerName: "Quantity Transferred",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "recToBranch",
      headerName: "To Receipient Branch",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "recLoss",
      headerName: "Quantity Loss",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "recLossType",
      headerName: "Loss Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "businessUnitName",
      headerName: "Branch",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "isDeleted",
      headerName: "isDeleted",
      flex: 1,
      hide: true,
    }
  ];


  const handleGetInventory = async () => {
    const {inventory} = await (api_url + `/inventory/get`)
    dispatch(getInventory())
    .then(res => {
      console.log(res, 'inventory data')
    })
  }
  
  useEffect(() => {
  handleGetInventory()
  }, [])


  return (
    <Box m="20px"
    sx={{pt: 3, m: '20px', overflowY: 'hidden' }}

    >
      <Header
        title="INVENTORY"
        subtitle="Chronological List of Inventory Records"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          }

        }}
      >
        <DataGrid
          checkboxSelection
          rows={inventoryRecordData}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Inventory;
