import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  Box,
  TableHead,
} from '@mui/material';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import TeacherForm from '../components/userTypeSelection/TeacherForm';
import StaffForm from '../components/userTypeSelection/StaffForm';
import ProcurerForm from "../components/userTypeSelection/ProcurerForm"




const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'UserType', label: 'UserType', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' },
];

const edit = () => {
  alert('ehehehheheheh');
};

const delet = () => {
  alert('I warned you already, Bye!');
};


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) =>
      _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [userTypeSelection, setUserTypeSelection] = useState('');
  const [userTypePopover, setUserTypePopover] = useState(null);
  const [isTeacherFormOpen, setIsTeacherFormOpen] = useState(false);
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(false);
  const [isProcurerFormOpen, setIsProcurerFormOpen] = useState(false);

  const [userData, setUserData] = useState({});

  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = 'http://192.168.3.231:4000/user/get-user';
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch user data from the API using Axios
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        // Set the retrieved user data to the "users" state
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);



  const closeTeacherForm = () => {
    setIsTeacherFormOpen(false);
  };
  const closeStaffForm = () => {
    setIsStaffFormOpen(false);
  };
  const closeProcurerForm = () => {
    setIsProcurerFormOpen(false);
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleUserTypeSelectionOpen = (event) => {
    setUserTypePopover(event.currentTarget);
  };

  const handleUserTypeSelectionClose = () => {
    setUserTypePopover(null);
  };

  const handleUserTypeSelect = (event) => {
    setUserTypeSelection(event.target.value);
    handleUserTypeSelectionClose();
  };


  const handleCreateUser = () => {
    // Handle user creation logic based on userTypeSelection here
    if (userTypeSelection === 'Teacher') {
      setIsTeacherFormOpen(true);
    } else if (userTypeSelection === 'Procurement Officer') {
      setIsProcurerFormOpen(true)
    } else if (userTypeSelection === 'Staff Member') {
      setIsStaffFormOpen(true);
    }
    setUserTypeSelection(''); // Clear the user type selection after creating a user
  };

  return (
    <>
      <Helmet>
        <title>User | CodeNando</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleUserTypeSelectionOpen} // Open the user type selection popover
          >
            Add New User
          </Button>

          {/* User Type Selection Popover */}
          <Popover
            open={Boolean(userTypePopover)}
            anchorEl={userTypePopover}
            onClose={handleUserTypeSelectionClose} // Close the user type selection popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Box p={2} minWidth={200}>
              <Typography variant="subtitle1" gutterBottom>
                Select User Type
              </Typography>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={userTypeSelection}
                  onChange={handleUserTypeSelect} // Handle user type selection
                  label="User Type"
                >
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Procurement Officer">
                    Procurement Officer
                  </MenuItem>
                  <MenuItem value="Staff Member">Staff Member</MenuItem>
                </Select>
              </FormControl>
              {userTypeSelection && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateUser} // Create user based on user type
                >
                  Create User
                </Button>
              )}
            </Box>
          </Popover>
        </Stack>
        {isTeacherFormOpen && (
          <TeacherForm isOpen={isTeacherFormOpen} onClose={() => setIsTeacherFormOpen(false)} />
        )}
        {isStaffFormOpen && (
          <StaffForm isOpen={isStaffFormOpen} onClose={() => setIsStaffFormOpen(false)} />
        )}
        {isProcurerFormOpen && (
          <ProcurerForm isOpen={isProcurerFormOpen} onClose={() => setIsProcurerFormOpen(false)} />
        )}
        {/* Search User */}
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <div>
          <Typography variant="h4" gutterBottom>
            List of Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>


      </Container>
    </>
  );
}

