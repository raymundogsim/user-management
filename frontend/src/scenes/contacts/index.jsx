import { Box } from "@mui/material";
import { DataGrid,  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { getAllUsers } from "features/data/dataApi";
import { getAllContacts } from "features/data/dataApi";
import { useDispatch, useSelector } from "react-redux";

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


const Contacts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { contacts } = useSelector(({data}) => data)
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, hide:true },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      flex: 1,
      hide: true,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "suffix",
      headerName: "Suffix",
      hide: true,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "civilStatus",
      headerName: "Civil Status",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "emergencyMobile",
      headerName: "Emergency Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      hide: true,
      flex: 1,
    },
    {
      field: "brgyDesc",
      headerName: "Barangay",
      flex: 1,
    },
    {
      field: "citymunDesc",
      headerName: "City/Municipality",
      flex: 1,
    },
    {
      field: "provDesc",
      headerName: "Province",
      hide: true,
      flex: 1,
    },
    {
      field: "regDesc",
      headerName: "Region",
      hide: true,
      flex: 1,
    },
  ];


  const handleGetContacts = async () => {
    dispatch(getAllContacts())
    .then(res => {
      console.log(res, 'USERS RES')
    })

}


useEffect(() => {
handleGetContacts()
}, [])


  return (
    <Box m="20px"
    sx={{pt: 3, m: '20px', overflowY: 'hidden' }}

    >
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={contacts}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
