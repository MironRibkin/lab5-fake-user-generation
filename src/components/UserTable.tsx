import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UsersTableToolbar } from "./Toolbar";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addAdditionalUsers, initializeUsers } from "../slice/userTableSlice";
import { faker } from "@faker-js/faker";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "black",
    borderTop: "1px solid rgb(224, 224, 224)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(224, 224, 224)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const UserTable: FC = () => {
  const { users, language, seed, mistakes } = useSelector(
    (state: RootState) => state.userTable
  );
  const dispatch = useDispatch();
  useEffect(() => {
    faker.locale = language;
    faker.mersenne.seed(seed);
    dispatch(initializeUsers());
  }, [language, seed, mistakes]);

  const [distanceBottom, setDistanceBottom] = useState(0);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const scrollListener = useCallback(() => {
    if (tableRef.current) {
      const bottom =
        tableRef.current.scrollHeight - tableRef.current.clientHeight;

      if (!distanceBottom) {
        setDistanceBottom(Math.round(bottom * 0.2));
      }
      if (tableRef.current.scrollTop > bottom - distanceBottom) {
        dispatch(addAdditionalUsers());
      }
    }
  }, [distanceBottom]);

  useLayoutEffect(() => {
    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", scrollListener);
    }
    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener("scroll", scrollListener);
      }
    };
  }, [scrollListener]);

  return (
    <Paper>
      <TableContainer sx={{ margin: "auto", maxHeight: 1000 }} ref={tableRef}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <UsersTableToolbar />
            </TableCell>
          </TableRow>
        </TableHead>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Index</StyledTableCell>
              <StyledTableCell align="left">Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Tel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.index}>
                <StyledTableCell align="left">{user.index}</StyledTableCell>
                <StyledTableCell align="left">{user.id}</StyledTableCell>
                <StyledTableCell align="left">{user.name}</StyledTableCell>
                <StyledTableCell align="left">{user.address}</StyledTableCell>
                <StyledTableCell align="left">{user.tel}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
